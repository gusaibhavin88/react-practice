import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./component/signUp/signUp";
import LogIn from "./component/logIn/logIn";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="signup" element={<SignUp />}></Route>
          <Route exact path="login" element={<LogIn />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
