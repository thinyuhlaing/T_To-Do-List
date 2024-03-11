import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";

export interface Note {
  label: string;
  time: string;
}

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
