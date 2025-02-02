import { useContext } from "react";

import { Box, Typography, styled } from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";

import { defaultProfilePicture } from "../../../constants/data";
import { AccountContext } from '../../../context/AccountProvider';

const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Image = styled('img')({
  width: 40,
  height: 40,
  borderRadius: '50%',
  ObjectFit: 'cover',
  src: defaultProfilePicture // Use the imported variable here
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgb(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 22px;
    color: #000;
  }
`;

const ChatHeader = ({ person}) => {

  const { activeUsers } = useContext(AccountContext);

  return (
    <Box>
      <Header>
      <Image src={person.picture} alt="dp" />
      </Header>
      <Box>
        <Name>{person.name}</Name>
        <Status>{activeUsers?.find(user => user.sub === person.sub)?.isOnline ? 'Online' : 'Offline'}</Status>
      </Box>
      <RightContainer>
        <Search />
        <MoreVert />
      </RightContainer>
    </Box>
  )
}

export default ChatHeader;