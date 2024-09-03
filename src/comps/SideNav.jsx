import React from "react";
import { useNavigate } from 'react-router-dom';
import '../index.css'

function Sidenav() {
    const navigate = useNavigate();

    const openNav = () => {
        const sidenav = document.getElementById("mySidenav");
        const main = document.getElementById("main");

        if (sidenav && main) {
            sidenav.style.width = "250px";
            main.style.marginLeft = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    }

    const closeNav = () => {
        const sidenav = document.getElementById("mySidenav");
        const main = document.getElementById("main");

        if (sidenav && main) {
            sidenav.style.width = "0";
            main.style.marginLeft = "0";
            document.body.style.backgroundColor = "white";
        }
    }

    const handleLogout = () => {
        // Rensa token från localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Rensa användardata också om det behövs

        closeNav();
        // Omdirigera användaren till inloggningssidan
        navigate('/login');
    }

    return (
        <>
            <div id="mySidenav" className="sidenav">
                <a href="#" className="closebtn" onClick={(e) => { e.preventDefault(); closeNav(); }}>&times;</a>
                <div className="menu-btns">
                    <a href="/profile">Profil</a>
                    <button onClick={handleLogout}>Logga ut</button>
                </div>
            </div>

            <span style={{ fontSize: '20px', cursor: 'pointer' }} onClick={openNav}>&#9776; Meny</span>
        </>
    );
}

export default Sidenav;