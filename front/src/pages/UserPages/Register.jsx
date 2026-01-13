import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext";
import background from "../../assets/imagenRegistros.png";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {signup, isAuthRegistered, registerErrors} = useAuth();
  const [roles, setRoles] = useState("soloVer");
  const [loading, setLoading] = useState(true);
  const onClick = (e) => {
    if (isAuthRegistered && registerErrors.length <= 0 && !loading) {
      let boton = e.target;
      boton.disabled = true;
    }
  };
  const recargar = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const onSubmit = handleSubmit(async (data) => {
    data.role = roles;
    setLoading(false);
    signup(data);
  });
  if (isAuthRegistered) {
    recargar();
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}
      sx={{
        /* minHeight: "100vh", height: "100vh" */
        marginTop: {md: "2rem"},
      }}>
      <Card
        sx={{
          width: {xs: "100vw", md: "60rem", lg: "60rem"},
          height: {xs: "100vh", md: "70vh"},
          mx: "auto",
          minHeight: "500px",
          display: "flex",
          justifyContent: {xs: "center", md: "flex-end"},
          alignItems: "center",
          borderRadius: {xs: 0, md: 5},
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: {xs: "none", md: "center"},
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          color: "#fff",
        }}>
        <CardContent
          sx={{
            width: {xs: "100%", md: "45%"},
            zIndex: 2,
            backgroundColor: {
              xs: "transparent",
              md: "rgba(255, 255, 255, 0.1)",
            },
            backdropFilter: {xs: "none", md: "blur(10px)"},
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
          }}>
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginBottom: {xs: 2, md: 3},
              fontSize: "1.1rem",
            }}>
            Registrar
          </Typography>
          {isAuthRegistered && (
            <Typography
              variant="h5"
              component="h2"
              textAlign="center"
              fontWeight="bold"
              color="success"
              sx={{
                marginBottom: {xs: 2, md: 3},
                fontSize: "0.9rem",
              }}>
              Usuario registrado con exito
            </Typography>
          )}
          <form onSubmit={onSubmit}>
            {registerErrors.map((error, i) => {
              return (
                <Typography
                  color="error"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  key={i}>
                  {error}
                </Typography>
              );
            })}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: "1rem",
              }}>
              Nombre de usuario
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                borderBottom: "1px solid  #ffffffff",
                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  "&:before": {
                    borderBottom: "1px solid  #ffffffff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& input:-webkit-autofill": {
                  transition: "background-color 600000s 0s, color 600000s 0s",
                },
              }}
              type="text"
              {...register("username", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.username && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                El nombre de usuario es necesario
              </Typography>
            )}

            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: "1rem",
              }}>
              Email
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                borderBottom: "1px solid  #ffffffff",

                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& input:-webkit-autofill": {
                  transition: "background-color 600000s 0s, color 600000s 0s",
                },
              }}
              type="email"
              {...register("email", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.email && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                El Email es necesario
              </Typography>
            )}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              htmlFor="password"
              sx={{
                margin: 0,
                fontSize: "1rem",
              }}>
              Contraseña
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                borderBottom: "1px solid  #ffffffff",

                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& input:-webkit-autofill": {
                  transition: "background-color 600000s 0s, color 600000s 0s",
                },
              }}
              type="password"
              {...register("password", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.password && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                La contraseña es necesaria
              </Typography>
            )}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              htmlFor="confirmPassword"
              sx={{
                margin: 0,
                fontSize: "1rem",
              }}>
              Confirmar Contraseña
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                borderBottom: "1px solid  #ffffffff",

                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& input:-webkit-autofill": {
                  transition: "background-color 600000s 0s, color 600000s 0s",
                },
              }}
              type="password"
              {...register("confirmPassword", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.confirmPassword && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                Es necesario confirmar la contraseña
              </Typography>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}>
              <Typography
                variant="h6"
                component="label"
                textAlign="center"
                htmlFor="confirmPassword"
                sx={{
                  margin: 0,
                  fontSize: "1rem",
                }}>
                Rol
              </Typography>
              <Select
                labelId="filtro-label"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#90caf9",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}>
                <MenuItem value="soloVer">Solo Ver</MenuItem>
                <MenuItem value="agente">Agente</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </div>
            <Button
              variant="contained"
              size="medium"
              style={{
                marginTop: "1rem",
                width: "100%",
                backgroundColor: "#3483fa",
                color: "#ffffffff",
                borderRadius: 12,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={onClick}
              type="submit">
              Registrar Usuario
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
