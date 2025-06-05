'use client';

import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  user,
}: IButtonAuthorization) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Avatar
        sx={{
          width: isMobile ? 36 : 40,
          height: isMobile ? 36 : 40,
          bgcolor: green500,
        }}
      >
        <Button
          onClick={handleClick}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            minWidth: 0,
            padding: 0,
            backgroundColor: green500,
            "&:hover": {
              backgroundColor: "#0f9c6e",
            },
          }}
        >
          <Typography color="white" fontSize={isMobile ? 14 : 16}>
            {user?.name?.charAt(0)}
          </Typography>
        </Button>
      </Avatar>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem>
          <Button
            variant="contained"
            color="error"
            onClick={Signout}
            fullWidth
          >
            Sair
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}
