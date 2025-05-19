import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./component/signUp/signUp";
import LogIn from "./component/logIn/logIn";
import { PrivateRoute } from "./component/common/privateRoute";
import Dashboard from "./component/dashboard/dashboard";
import { PublicRoute } from "./component/common/publicRoute";
import { EventManagement } from "./component/eventManagement/eventManagement";
import { EventParent } from "./component/eventParent";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route exact path="/" element={<Navigate to="/login" />}></Route>
            <Route exact path="signup" element={<SignUp />}></Route>
            <Route exact path="login" element={<LogIn />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
            <Route exact path="/event" element={<EventParent />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
