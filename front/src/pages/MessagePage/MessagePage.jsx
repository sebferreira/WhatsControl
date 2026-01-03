import {Box, Grid, List, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import io from "socket.io-client";

/* import {useBoard} from "../../hooks/useBoard"; */
/* import BoardList from "../../components/boardCard/boardList"; */
/* import BoardCard from "../../components/boardCard/boardCard"; */
import {Link} from "react-router-dom";
const socket = io("http://localhost:3000");

export function MessagePage() {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("nuevo_mensaje", (mensaje) => {
      console.log("Llegó mensaje nuevo:", mensaje);

      // Agregamos el mensaje nuevo a la lista existente
      setMensajes((prev) => [...prev, mensaje]);
      console.log(mensaje);

      console.log(mensajes);
    });
  });

  return (
    <>
      <Box
        sx={{
          display: {sx: "flex", md: "none"},
          backgroundColor: "#fff",
        }}>
        <Typography
          component="p"
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "black",
          }}>
          hola
        </Typography>
        {/*  <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          {boards.message && (
            <Box
              sx={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                padding: "2rem",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}>
              <Typography
                component="p"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "red",
                }}>
                {boards.message}
              </Typography>
            </Box>
          )}
        </Box>

        {!boards.message && (
          <>
            <Typography
              component="p"
              variant="h6"
              sx={{
                marginTop: "1rem",
                fontWeight: "bold",
                marginLeft: "3rem",
                marginBottom: "0.5rem",
                color: "#1e1e1e",
              }}>
              Tus tableros
            </Typography>

            <List>
              {boards &&
                boards.map((board) => (
                  <BoardList board={board} key={board.id_board} />
                ))}
            </List>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: {xs: "none", md: "flex"},
          flexDirection: "column",
        }}>
        <Typography
          component="p"
          variant="h4"
          sx={{
            marginTop: "3rem",
            marginBottom: "3rem",
            fontWeight: "bold",
            color: "#ffff",
            textAlign: "center",
          }}>
          Elige su tablero o cree uno nuevo
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          {boards.message && (
            <Box
              sx={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
                padding: "2rem",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}>
              <Typography
                component="p"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "red",
                }}>
                {boards.message}
              </Typography>
            </Box>
          )}
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            marginLeft: {xl: "1.5rem"},

            gap: {md: "4rem", xl: "6rem"},

            display: "flex",
            justifyContent: "center",
            width: "calc(100% - 32px)",
            padding: "1rem",
          }}>
          {!boards.message &&
            boards.map((board) => (
              <Grid
                item
                key={board.id_board}
                sm={2}
                style={{
                  padding: 0,
                }}>
                <Link
                  to={`/boards/${board.id_board}`}
                  onClick={() => {
                    sessionStorage.setItem("previousPath", "/tables");
                    sessionStorage.setItem(
                      "actualPath",
                      `/boards/${board.id_board}`
                    );
                  }}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}>
                  <BoardCard board={board} />
                </Link>
              </Grid>
            ))}
        </Grid> */}
      </Box>
    </>
  );
}
