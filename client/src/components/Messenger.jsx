import { AppBar, Toolbar, styled, Box,Typography } from "@mui/material";

import { useContext } from "react";

import { AccountContext } from "../components/context/AccountProvider";


// components
import LoginDialogue from "./account/LoginDialogue";
import ChatHeader from "./chats/ChatDialog";

const Component = styled(Box)`
  height: 100vh;
  background-color: #dcdcdc;
`;

const Header = styled(AppBar)`
  height: 125px;
  background-color: #00A884;
  box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      { account ? (
      <>
      <Header>
        <Toolbar>
          {/* Use account here, e.g. display it in the UI */}
          <Typography>{account.name}</Typography>
        </Toolbar>
      </Header>
      <ChatHeader/>
      </> ):(
      <>
      <LoginHeader>
        <Toolbar>
           {/* Use account here, e.g. display it in the UI */}
           <Typography>{account.name}</Typography>
        </Toolbar>
      </LoginHeader>
      <LoginDialogue />
      </>
      )}
    </Component>
  );
};

export default Messenger;
