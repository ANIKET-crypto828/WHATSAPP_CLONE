import { Box } from "@mui/material";

import { useContext, useEffect, useState } from "react";

import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from "../../../context/AccountProvider";
import { getConversation } from "../../../service/api";


// components
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const ChatBox = () => {
  const { person } = useContext(UserContext);
  const { account } = useContext(AccountContext);

  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({ senderId: account.sub, recieverId: person.sub });
      setConversation(data);
    }
    getConversationDetails();
  }, [person.sub, account.sub]);

  return (
    <Box style={{height: '75%'}}>
      <ChatHeader person={person}/>
      <Messages person={person} conversation={conversation}/>
    </Box>
  )
}

export default ChatBox;