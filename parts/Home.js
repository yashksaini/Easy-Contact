import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <div className="contactBox">
        <img src="logo.png" className="bigImg" />
        <h3>Easy Contact</h3>
        <div className="allCards">
          <Link to="/signup" className="homeBtn">
            Sigup
          </Link>
          <Link to="/login" className="homeBtn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
