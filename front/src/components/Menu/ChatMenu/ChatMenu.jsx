import {useState} from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  ListItemButton,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import {useParams} from "react-router-dom";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import ModalChat from "../../modals/ModalChat/ModalChat";
import {memo} from "react";

function ChatMenu({chat}) {
  const params = useParams();
  const [openModalAsignar, setOpenModalAsignar] = useState(false);
  const [openModalEstado, setOpenModalEstado] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);

  const handleOpenModalInfo = () => setOpenModalInfo(true);
  const handleCloseModalInfo = () => setOpenModalInfo(false);

  const handleOpenModalAsignar = () => setOpenModalAsignar(true);
  const handleCloseModalAsignar = () => setOpenModalAsignar(false);

  const handleOpenModalEstado = () => setOpenModalEstado(true);
  const handleCloseModalEstado = () => setOpenModalEstado(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(chat);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginRight: "1rem",
        }}>
        <Tooltip title="Menú Tarea">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
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
        <MenuItem onClick={(() => handleClose, handleOpenModalAsignar)}>
          <ListItemButton
            sx={{
              padding: 0,
            }}>
            <ListItemIcon>
              <AssignmentIndRoundedIcon fontSize="small" />
            </ListItemIcon>
            Asignarme
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={(() => handleClose, handleOpenModalEstado)}>
          <ListItemButton
            sx={{
              padding: 0,
              width: "100%",
            }}>
            <ListItemIcon>
              <ChangeCircleOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Cambiar Estado
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={(() => handleClose, handleOpenModalInfo)}>
          <ListItemButton
            sx={{
              padding: 0,
            }}>
            <ListItemIcon>
              <FeedRoundedIcon fontSize="small" />
            </ListItemIcon>
            Informacion
          </ListItemButton>
        </MenuItem>
      </Menu>
      <Modal
        open={openModalAsignar}
        onClose={handleCloseModalAsignar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        aria-colorby="modal-modal-color">
        <ModalChat
          chat={{}}
          type={"asignar"}
          message={"¿Estás seguro de asignarte a este numero?"}
          setOpenModal={setOpenModalAsignar}
        />
      </Modal>
      <Modal
        open={openModalEstado}
        onClose={handleCloseModalEstado}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        aria-colorby="modal-modal-color">
        <ModalChat
          chat={{}}
          type={"estado"}
          message={"¿Estás seguro de cambiar el estado?"}
          setOpenModal={setOpenModalEstado}
        />
      </Modal>
      {chat && (
        <Modal
          open={openModalInfo}
          onClose={handleCloseModalInfo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          aria-colorby="modal-modal-color">
          <ModalChat
            chat={chat}
            type={"info"}
            message={"Informacion del numero"}
            setOpenModal={setOpenModalInfo}
          />
        </Modal>
      )}
    </>
  );
}

export default memo(ChatMenu);
