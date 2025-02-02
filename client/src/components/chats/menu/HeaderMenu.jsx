import { MoreVert } from "@mui/icons-material";
import {Menu, MenuItem, styled} from "@mui/icons-material";
import { useState } from "react";

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4A4A4A;
`;

const HeaderMenu = ({ setOpenDrawer }) => {

  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(null);
  }
  
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  }


  return (
    <>
      <MoreVert onClick={handleClick}/>
      <Menu
        anchorEl={open}
        keepMounted
        open={open}
        getContentAnchorEl={null}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <MenuOption onClick={() => {handleClose(); setOpenDrawer(true); }}>Profile</MenuOption>
      </Menu>
    </>
  );
};

export default HeaderMenu;
