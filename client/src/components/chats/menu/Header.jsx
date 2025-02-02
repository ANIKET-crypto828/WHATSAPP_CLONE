import { useContext , useState} from "react";

import { Box, styled,  toggleDrawer } from "@mui/material";
import {Chat as MessageIcon} from '@mui/icons-material';

import {AccountContext} from '../../context/AccountProvider'; 


// Components
import HeaderMenu from "../../HeaderMenu";
import InfoDrawer from "../../Drawer/InfoDrawer";

const Component = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    padding: 8px;
    margin-left: 2px;
    color: #000;
  }
    & :first-child {
      font-size: 22px;
      margin-right: 8px;
      margin-top: 3px;
    }
`;

const Image = styled('img')({
  height: 40, 
  width: 40,
  borderRadius: '50%'
})


const Header = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

 const { account } = useContext(AccountContext);

  return (
   <>
   <Component>
    <Image src={account.picture} alt="dp" onClick={() => toggleDrawer()}/>
    <Wrapper>
      <MessageIcon/>
      <HeaderMenu setOpenDrawer={setOpenDrawer}/>
    </Wrapper>
   </Component>
   <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
   </>
  )
}

export default Header;