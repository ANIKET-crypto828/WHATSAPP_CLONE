import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { useEffect } from "react";
import { uploadFile } from "../../../service/api";

const Container = styled(Box)`
  height: 55px;
  width: 100%;
  background: #ededed;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #FFFFFF;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  height: 20px;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
  width: 100%;
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage, account, conversation, receiverId, socket, newMessageFlag, setNewMessageFlag, newMessages, image }) => {

useEffect(() => {
  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;

    if (code === 13) {
        let message = {};
        if (!file) {
            message = {
                senderId: account.sub,
                receiverId: receiverId,
                conversationId: conversation?._id,
                type: 'text',
                text: value
            };
        } else {
            message = {
                senderId: account.sub,
                conversationId: conversation?._id,
                receiverId: receiverId,
                type: 'file',
                text: image
            };
        }

        if (conversation?._id) {
            socket.current.emit('sendMessage', message);
            await newMessages(message);
        }

        setValue('');
        setFile();
        setImage('');
        setNewMessageFlag(prev => !prev);
    }
}
}, [value, file, account, receiverId, conversation, socket, newMessages, image, setValue, setFile, setImage, setNewMessageFlag]);
  
useEffect(() => {
    const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            const response = await uploadFile(data);
            if (response && response.status === 200) {
                setImage(response.data);
            } else {
                console.log('Error while uploading file');
            }
        }
    }
    getImage();
}, [file])

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValue(selectedFile.name);
    }
  }

  return (
    <Container>
     <EmojiEmotions/>
     <label htmlFor="fileInput">
     <ClipIcon />
     </label>
     <input 
     type="file"
      id="fileInput"
     style={{ display: "none" }}
     onChange={(e) => onFileChange(e)}
     />
     <Search>
      <InputField 
      placeholder="Type a message"
      inputProps={{ 'aria-label': 'search' }}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={(e) => sendText(e)}
      value={value}
      />
     </Search>
     <Mic />
    </Container>
  )
}

export default Footer;