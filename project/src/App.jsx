import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./LoginPages/LoginPage"
import Register from "./LoginPages/Register";
import Notes from "./MainPages/Notes"
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}
