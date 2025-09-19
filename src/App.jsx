
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./Body";
import Profile from "./_components/Profile";
import Login from "./_components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import ProtectedRoutes from "./_components/ProtectedRoutes";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            {/* public routes */}
            <Route path="/login" element={<Login />} />

            {/* protected routes: protecting entire route group */}
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Body />
                </ProtectedRoutes>
              }
            >
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
