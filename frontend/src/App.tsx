import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";

export interface Note {
  label: string;
  time: string;
}

const App = () => {
  return (
    <div>
      <Layout />
    </div>
  );
};

export default App;
