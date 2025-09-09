import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginPage"
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
