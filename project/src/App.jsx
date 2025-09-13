import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Pages/LoginPage"
import Register from "./Pages/Register";
import Notes from "./Pages/Notes"
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
