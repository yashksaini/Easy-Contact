import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import "./Signup.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const [showMessage, setShowMessage] = useState("");

  useEffect(() => {
    if (name.length > 4 && email.length > 5 && password.length > 5) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [name, email, password]);

  const addUser = () => {
    setShowMessage("Signing up . . .");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setShowMessage("Signed Up Successfully");
        setEmail("");
        setPassword("");
        setName("");
        setValid(true);
        const user = auth.currentUser;
        const firestore = getFirestore();
        // Adding Profile data to the firebase
        setDoc(doc(firestore, "profile", user.uid), {
          name: name,
          id: user.uid,
          email: user.email,
        })
          .then(() => {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setShowMessage(error.message);
      });
  };

  return (
    <div className="App">
      <div className="contactBox">
        <div className="signupBox">
          <h1>SignUp</h1>
          <label>
            Name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Name here..."
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          ></input>
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
            SignUp
          </button>
          <Link to="/login">Already have account? Login here .</Link>
          <p>{showMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
