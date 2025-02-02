import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:8000";

let gfs, GridFSBucket;
const conn = mongoose.connection;

conn.once('open', () => {
  GridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos"
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
})

export const uploadFile = (req, res) => {
   if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
}

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    const readStream = GridFSBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
