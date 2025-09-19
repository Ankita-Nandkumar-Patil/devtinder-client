
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./Body";
import Profile from "./_components/Profile";
import Login from "./_components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./_components/Feed";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
