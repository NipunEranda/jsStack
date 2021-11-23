import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import {Container} from 'react-bootstrap';

export const NavContainer1 = styled(Container)`
display: flex;
justify-content: space-between;
align-items: center;
height: 80px;

`;
export const NavLogo = styled.div`
color: #fff;
cursor:pointer;
display: flex;
align-items: center;
text-decoration: none;
font-size: 3.5rem;
font-weight: 500;
margin-left: -200px;


 @media screen and (max-width: 768px) {
    margin-left:10px;
  }

   @media screen and (max-width: 900px) {
    margin-left:10px;
  }
`;

export const Nav = styled.nav`
  background: #FFA500;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;

`;

export const NavLink = styled(Link)`
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
  margin-left:20px;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
export const NavBtnDiv1 = styled.div`

margin-left : 20px;
`;

export const NavBtnDiv2 = styled.div`

margin-left : -5px;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0px;
  margin-left: 550px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 5px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #000;
  }
`;