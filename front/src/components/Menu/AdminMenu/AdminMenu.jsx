import {useState} from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  ListItemButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import {Link} from "react-router-dom";
import {memo} from "react";
import {useAuth} from "../../../context/AuthContext";

function AdminMenu() {
  const {user} = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let mostrar;
  if (user) {
    if (user.role !== "admin") {
      mostrar = "none";
    } else {
      mostrar = "flex";
    }
  }
  return (
    <Box sx={{display: mostrar}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}>
        <Tooltip title="Ir a">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              borderRadius: 2,
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <MoreVertIcon
              sx={{width: 40, height: 25, color: "white"}}></MoreVertIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}>
        <MenuItem onClick={() => handleClose}>
          <ListItemButton
            sx={{
              padding: 0,
              width: "100%",
            }}
            component={Link}
            to={`/clientes`}>
            <ListItemIcon>
              <GroupIcon fontSize="small" />
            </ListItemIcon>
            Clientes
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={() => handleClose}>
          <ListItemButton
            sx={{
              padding: 0,
            }}
            component={Link}
            to={`/register`}>
            <ListItemIcon>
              <PersonAddIcon fontSize="small" />
            </ListItemIcon>
            Registrar usuarios
          </ListItemButton>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default memo(AdminMenu);
