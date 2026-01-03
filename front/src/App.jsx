import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import HomeAuth from "./protectedRoutes/HomeAuth";
import {Button} from "@mui/material";
import Signup from "./pages/UserPages/Register";
import Signin from "./pages/UserPages/Login";
import {MessagePage} from "./pages/MessagePage/MessagePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeAuth />}>
            <Route
              path="/register"
              element={
                <>
                  <main
                    style={{
                      objectFit: "cover",
                      minHeight: "100vh",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "scroll",
                      overflowY: "hidden",
                      justifyContent: "center",
                      width: "100vw",
                    }}>
                    <Signup />
                  </main>
                </>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <>
                <main
                  style={{
                    objectFit: "cover",
                    minHeight: "100vh",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "scroll",
                    overflowY: "hidden",
                    justifyContent: "center",
                    width: "100vw",
                  }}>
                  <Signin />
                </main>
              </>
            }
          />
          <Route /* element={<HomeAuth />} */>
            <Route
              path="/"
              element={
                <>
                  <main
                    style={{
                      objectFit: "cover",
                      minHeight: "100vh",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "scroll",
                      overflowY: "hidden",
                      justifyContent: "center",
                      width: "100vw",
                    }}>
                    <MessagePage />
                  </main>
                </>
              }
            />
          </Route>
          <Route
            path="/"
            element={
              <>
                <main
                  style={{
                    objectFit: "cover",
                    minHeight: "100vh",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "scroll",
                    overflowY: "hidden",
                    justifyContent: "center",
                    width: "100vw",
                  }}>
                  <Signin />
                </main>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
