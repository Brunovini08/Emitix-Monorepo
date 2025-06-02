import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { green500 } from "../../utils/colors";

interface IButtonAuthorization {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  openAvatar: boolean;
  anchorEl: null | HTMLElement;
  user: any;
  Signout: () => void;
}

export function ButtonAuthorization({
  Signout,
  anchorEl,
  handleClick,
  handleClose,
  openAvatar,
  user,
}: IButtonAuthorization) {
  return (
    <>
      <Avatar>
        <Button
          onClick={handleClick}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: green500,
          }}
        >
          <Typography color="white">{user?.name?.charAt(0)}</Typography>
        </Button>
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openAvatar}
        onClose={handleClose}
      >
        <MenuItem>
          <Button variant="contained" color="error" onClick={Signout}>
            Sair
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}
