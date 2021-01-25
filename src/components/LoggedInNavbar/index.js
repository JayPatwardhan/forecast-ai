import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './LoggedInNavElements';


const NavbarLoggedIn = (props) => {
    return (
        <>
            <Nav>
                <NavLink style={{color: "#26688E"}} to="/userMenu">
                    <h1>Forecast A(P)I</h1>
                </NavLink>
                <Bars/>
                <NavBtn onClick={props.logOut}>
                    <NavBtnLink to="/">
                        Log Out
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default NavbarLoggedIn;
