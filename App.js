import { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Signup from "./parts/Signup";
import Login from "./parts/Login";
import Display from "./parts/Display";
import UnprotectedRoute from "./UnprotectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import Home from "./parts/Home";

function App() {
  const [userId, setUserId] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
      setIsAuth(true);
    } else {
      setUserId("");
      setIsAuth(false);
    }
  });
  return (
    <BrowserRouter>
      <Switch>
        <UnprotectedRoute exact path="/" component={Home} isAuth={isAuth} />
        <UnprotectedRoute
          exact
          path="/login"
          component={Login}
          isAuth={isAuth}
        />
        <UnprotectedRoute
          exact
          path="/signup"
          component={Signup}
          isAuth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/home"
          component={Display}
          isAuth={isAuth}
          id={userId}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
