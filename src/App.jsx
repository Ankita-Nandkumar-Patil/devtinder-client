
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./Body";
import Profile from "./_components/Profile";
import Login from "./_components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./_components/Feed";
import SignUp from "./_components/SignUp";
import Connections from "./_components/Connections";
import Requests from "./_components/Requests";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
