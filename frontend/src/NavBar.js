import React from 'react';
import { Link } from 'react-router-dom';
import {NavbarBrand} from "reactstrap";

const Navbar = () => {

    const handleLogout = (e) => {
        e.preventDefault();
        // Perform logout logic here
        // e.g., make an API request to log out the user
    };


    return (
        <div className="topnav">
            <NavbarBrand className="active" tag={Link} to={"/home"}>Home</NavbarBrand>
            <NavbarBrand tag={Link} to={"/registration"}>Registration</NavbarBrand>

            <div /*sec:authorize="hasAuthority('ADMIN')"*/>
                <NavbarBrand tag={Link} to={"/addExhibition"}>Add exhibition</NavbarBrand>
                <NavbarBrand tag={Link} to={"/addHall"}>Add hall</NavbarBrand>
                <NavbarBrand tag={Link} to={"/getStats"}>View statistics</NavbarBrand>
            </div>


         {/*   <a className="change-language" th:text="#{lang}"
               th:href="@{__${#httpServletRequest.requestURI}__?lang=__${#locale.toString()}=='ua'?'en':'ua'__}">
            </a>*/}

            <div className="login-container">
                <form onSubmit={handleLogout}>
                    <button type="submit">Logout</button>
                </form>
            </div>

        </div>
    );
};

export default Navbar;