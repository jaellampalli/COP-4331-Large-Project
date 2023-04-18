import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
    <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Lessons</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 ml-auto" action="/search" method="post">
            <input class="form-control mr-sm-2" type="search" name="lessonName" placeholder="Search for lessons" aria-label="Search" autocomplete="off"></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>      
        </div>
    </nav>
    </header>
 );
}