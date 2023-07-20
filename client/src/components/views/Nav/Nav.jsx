import SearchBar from "../../SearchBar/SearchBar";
import React from "react";
import { Link } from "react-router-dom";

const Nav = ({onSearch}) =>{
    return (
        <div>
            <Link to="/form">
            <button>¡Crear Pokemon!</button>
            </Link>
            <SearchBar onSearch={onSearch} />
        </div>
    )
}

export default Nav;
