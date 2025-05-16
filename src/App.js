import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./component/signUp/signUp";
import LogIn from "./component/logIn/logIn";
import Dashboard from "./component/dashboard/dashboard";
import { PrivateRoute } from "./component/privateRoute/privateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Navigate to="/dashboard" />}></Route>
          <Route exact path="signup" element={<SignUp />}></Route>
          <Route exact path="login" element={<LogIn />}></Route>
          <Route
            exact
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
