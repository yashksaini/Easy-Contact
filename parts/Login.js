import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const [showMessage, setShowMessage] = useState("");

  useEffect(() => {
    if (email.length > 5 && password.length > 5) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [email, password]);

  const addUser = () => {
    setShowMessage("Logging In . . .");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setShowMessage("Logged In Successfully");
        setEmail("");
        setPassword("");
        setValid(true);
        window.location.reload();
      })
      .catch((error) => {
        setShowMessage(error.message);
      });
  };

  return (
    <div className="App">
      <div className="contactBox">
        <div className="signupBox">
          <h1>Login</h1>
          <label>
            Email <span>*</span>
          </label>
          <input
            type="email"
            placeholder="Enter Email here..."
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
          ></input>
          <label>
            Password <span>*</span>
          </label>
          <input
            type="password"
            placeholder="Enter password here..."
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          ></input>
          <button type="submit" disabled={valid} onClick={addUser}>
            Login
          </button>
          <Link to="/signup">Don't have account? Create here .</Link>
          <p>{showMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
