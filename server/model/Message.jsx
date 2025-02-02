import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true
  },
  recieverId: {
    type: String,
    required: true
  },
  conversationId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }}, 
  {
     timestamps: true
 }
);

const message = mongoose.model("Message", messageSchema);

export default message;