import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled(Link)`
  margin: 10px;
  padding: 10px;
  background-color: lightGrey;
  width: 100px;
  text-decoration: none;
  color: black;

  &:hover {
    color: #6cc0e5;
  }
`;

const Header = () => (
  <div>
    <NavBar>
      <Button to="/">
        <div>Home</div>
      </Button>
    </NavBar>
  </div>
);

export default Header;
