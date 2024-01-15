import React from "react";
import LoginSignUp from "/Users/rj/Desktop/FYDP practices/truffleEng-main/client/src/Components/LoginSignUp/LoginSignUp.jsx";
import { useState, useEffect } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import Web3 from "web3";
import "./App.css";

function App() {
  return (
    <div>
      <LoginSignUp />
    </div>
  );
}

export default App;
