import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import HomeAuth from "./protectedRoutes/HomeAuth";
import {Button} from "@mui/material";
import Signup from "./pages/UserPages/Register";
import Signin from "./pages/UserPages/Login";
import {ChatPage} from "./pages/ChatsPage/ChatPage";
import Navbar from "./components/navbar/Navbar";

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
                    justifyContent: "center",
                    width: "100vw",
                  }}>
                  <Signin />
                </main>
              </>
            }
          />

          <Route
            path="/chats"
            element={
              <>
                <main
                  style={{
                    objectFit: "cover",
                    height: "100vh",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "scroll",
                    overflow: "hidden",
                    justifyContent: "center",
                    width: "100vw",
                  }}>
                  {" "}
                  <Navbar />
                  <ChatPage />
                </main>
              </>
            }
          />
          <Route
            path="/chats/:chatId"
            element={
              <>
                <main
                  style={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}>
                  <Navbar />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      minHeight: 0,
                    }}>
                    <ChatPage />
                  </div>
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
