import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';


const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>TS API</h1>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to="/Signup" activeStyle>
                        Sign Up
                    </NavLink>
                    <NavLink to="/About" activeStyle>
                        About
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/Signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar;
