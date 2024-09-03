import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './comps/Register';
import Login from './comps/Login';
import Chat from './comps/Chat';
import ProtectedRoute from './comps/ProtectedRoute';
import './index.css';
import backgroundImage from "./pics/face2face.jpg";
import Header from './comps/Header';
import Footer from './comps/Footer';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {

      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
