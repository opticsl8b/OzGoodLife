import styled from "styled-components";
import React from "react";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  /* adjust the img after */
  object-fit: contain;
  opacity: 0.5;
  ${mobile({height:"20vh"})}
`;

const Info = styled.div`
flex-direction: column;
position:absolute;
top:0;
left:0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`;

const Title = styled.h1`
font-size: 40px;
color:black;
margin-bottom:20px;
`;

const Button = styled.button`
border:none;
padding: 10px;
cursor: pointer;
background-color:white;
color:gray;
font-weight:600;`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>Shop Now</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
