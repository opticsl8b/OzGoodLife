import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../utils/responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "16px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 30px;
  ${mobile({ flex: 2, justifyContent: "Center" })}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
`;

const ListItem = styled.li`
  width: 50%;
  margin: 0px 20px;
  color: black;
`;

const ListLink = styled.a`
  color: black;
`;

// const Menuitem = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <List>
          <ListItem>
            <Link to="/orderHistory">Order History</Link>
          </ListItem>
          <ListItem>
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <ListLink href="/" onClick={() => Auth.logout()}>
              Logout
            </ListLink>
          </ListItem>
        </List>
      );
    } else {
      return (
        <List>
          <ListItem>
            <Link to="/signup">Signup</Link>
          </ListItem>
          <ListItem>
            <Link to="/login">Login</Link>
          </ListItem>
        </List>
        // <ul className="flex-row">
        //   <li className="mx-1">
        //     <Link to="/signup">Signup</Link>
        //   </li>
        //   <li className="mx-1">
        //     <Link to="/login">Login</Link>
        //   </li>
        // </ul>
      );
    }
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>

        <Center>
          <Logo>Oz GoodLife.</Logo>
        </Center>

        <Right>{showNavigation()}</Right>
      </Wrapper>
    </Container>
  );
}

export default Nav;
