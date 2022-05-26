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

// const Language = styled.span`
//   font-size: 14px;
//   ${mobile({ display: "none" })}
// `;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;

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
  justify-content: center;
  align-items: flex-end;
`;

const ListItem = styled.li`
  width: 50%;

  color: black;

  display: flex;
`;

const Button = styled.button`
  width: 120px;
  border: 1px solid teal;
  background: none;
  padding: 5px 15px;
  font-size: 12px;
  cursor: pointer;
  margin: 10px;
  transition: 0.8s;
  position: relative;
  overflow: hidden;
  color: teal;

  &:hover {
    color: white;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 0%;
    background: teal;
    z-index: -1;
    transition: 1.5s;
    bottom: 0;
    border-radius: 50% 50% 0 0;
  }

  &:hover::before {
    height: 180%;
  }
`;

const ListLink = styled.a`
  color: black;
  text-decoration: "none";
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
            <Link to="/orderHistory" style={{ textDecoration: "none" }}>
              <Button>Order History</Button>
            </Link>
          </ListItem>
          <ListItem>
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <Link
              to="/"
              onClick={() => Auth.logout()}
              style={{ textDecoration: "none" }}
            >
              <Button>Log Out</Button>
            </Link>
          </ListItem>
        </List>
      );
    } else {
      return (
        <List>
          <ListItem>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button>Signup</Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>Login</Button>
            </Link>
          </ListItem>
        </List>
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
