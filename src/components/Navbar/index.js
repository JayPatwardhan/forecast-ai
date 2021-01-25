import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';


const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink style={{color: "#26688E"}} to="/">
                    <h1>Forecast A(P)I</h1>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to="/Signup" activeStyle>
                        Sign Up
                    </NavLink>
                    <NavLink to="/About" activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/trial' activeStyle>
                        Try it out!
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/Login">
                        Log In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar;
