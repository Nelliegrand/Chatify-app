import { useState } from 'react'
import backgroundImage from "./pics/face2face.jpg"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './comps/Register'
import Login from './comps/Login'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Börja chatta!</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <Link to="/login">
            <button className="btn btn-primary">Logga in</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-secondary">Registrera</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
