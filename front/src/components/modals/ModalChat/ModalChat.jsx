import {Box, Button, Typography} from "@mui/material";

import {useNavigate, useParams} from "react-router-dom";
import {asignarChat} from "../../../queryFn/query";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  color: "black",
};

export default function ModalChat({chat, type, message, setOpenModal}) {
  let handleOption;
  let msj, msjOk;
  const navigate = useNavigate();
  const params = useParams();
  let usuario;

  switch (type) {
    case "asignar":
      handleOption = async () => {
        await asignarChat(params.chatId);
        setOpenModal(false);
      };
      msjOk = "Confirmar";
      msj = "Cancelar";
      break;
    case "estado":
      handleOption = async () => {
        setOpenModal(false);
      };
      msjOk = "Confirmar";
      msj = "Cancelar";
      break;
    case "info":
      handleOption = async () => {
        setOpenModal(false);
      };
      msjOk = "";
      msj = "Cerrar";
      usuario = JSON.parse(chat.usuario);
      console.log(usuario);
      break;
    case "users":
      handleOption = async () => {
        navigate(0);
      };
      break;
    case "Salir":
      handleOption = async () => {
        navigate(0);
      };
      break;
  }

  return (
    <Box sx={[style, {width: {xs: 250, lg: 500}}]}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem",
        }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            marginLeft: "1rem",
          }}>
          {message}
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "4rem",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
          {msjOk ? (
            <>
              <Button
                onClick={handleOption}
                variant="contained"
                type="submit"
                style={{
                  transition: "all 0.3s ease",
                  marginRight: "2rem",
                  height: "100%",
                  backgroundColor: "#3B82F6",
                  borderColor: "#9ecaed",
                  boxShadow: "0 0 10px #2297f7ff",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}>
                {msjOk}
              </Button>
              <Button
                onClick={() => {
                  setOpenModal(false);
                }}
                variant="contained"
                color="error"
                style={{
                  backgroundColor: "#D32F2F",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.4)",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                }}>
                {msj}
              </Button>
            </>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Box>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                    textAlign: "center",
                    color: "black",
                  }}>
                  <b>Id:</b> {chat.id_chat}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                    color: "black",
                  }}>
                  <b>Nombre:</b> {usuario.nombre}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                    color: "black",
                  }}>
                  {" "}
                  <b>Apellido:</b> {usuario.apellido}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                    color: "black",
                  }}>
                  <b>DNI:</b> {usuario.dni}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                    color: "black",
                  }}>
                  <b>Estado:</b> {chat.estado}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                    color: "black",
                  }}>
                  <b>Usuario Asignado:</b> {chat.usuario_asignado}
                </Typography>
              </Box>
              <Button
                onClick={() => {
                  setOpenModal(false);
                }}
                variant="contained"
                color="error"
                style={{
                  marginTop: "2rem",
                  backgroundColor: "#D32F2F",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.4)",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                }}>
                {msj}
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </Box>
  );
}
