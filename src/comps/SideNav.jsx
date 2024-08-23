import React from "react";
import { Link } from 'react-router-dom';
import '../index.css'


function Sidenav() {
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    }

    return (
        <>
            <div id="mySidenav" className="sidenav">
                <a href="#" className="closebtn" onClick={(e) => { e.preventDefault(); closeNav(); }}>&times;</a>
                <a href="/profile">Profil</a>
                <a href="/login">Logga ut</a>

            </div>

            <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776; Meny</span>


        </>
    );
}


export default Sidenav;