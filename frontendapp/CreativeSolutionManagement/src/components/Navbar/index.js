import React from 'react';


import {

  Nav,
  NavContainer1,
  NavLogo,


  Bars,
  NavMenu,
  NavLink,

  NavBtn,
  NavBtnLink,

  NavBtnDiv1,
  NavBtnDiv2,
} from './NavbarElements';

const Navbar = () => {

  return (
    <>
      <Nav>
       <NavContainer1>
         <NavLogo to="/"> BeePLUS</NavLogo>

      <navLink to='/'>

        </navLink>
        <Bars />
        <NavMenu >
          <NavLink   to='/' activeStyle>
            Home
          </NavLink>
          <NavLink   to='/AboutUs' activeStyle>
            AboutUs
          </NavLink>
          <NavLink  to='/ContactUs' activeStyle>
            ContactUs
          </NavLink>


          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
    <NavBtnDiv1>
      <NavBtn>
          <NavBtnLink to='/Login'>Login</NavBtnLink>
        </NavBtn>
      </NavBtnDiv1>
      <NavBtnDiv2>
         <NavBtn>
          <NavBtnLink to='/Register'>Register</NavBtnLink>
        </NavBtn>
        </NavBtnDiv2>



      </NavContainer1>
      </Nav>
    </>
  );
};

export default Navbar;