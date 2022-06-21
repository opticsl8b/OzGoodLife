import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import styled from "styled-components";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Annoucement from "../components/Annoucement";

const Container = styled.div`
  width: 40%;
  text-align: center;
  position: relative;
  margin: 16px;
  left: 30%;
`;

const OrderWrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const Card = styled.div`
  border: 1px solid teal;
  border-radius: 8px;
  box-shadow: 6px 6px 2px 2px teal;
  position: relative;
  width: 320px;
  height: 450px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  margin: 2%;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #53c99e;
    clip-path: circle(150px at 80% 20%);
    transition: 0.5s ease-in-out;
  }

  &:hover:before {
    clip-path: circle(300px at 80% -20%);
  }

  &:after {
    content: "OzGood";
    position: absolute;
    top: 30%;
    left: -10%;
    font-size: 6em;
    font-weight: 800;
    font-style: italic;
    color: rgba(189, 242, 223, 0.5);
  }
`;

const ImageBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  width: 100%;
  height: 2;
  height: 220px;
  transition: 0.5s;

  ${Card}:hover & {
    top: 0%;
    transform: translateY(10%);
  }
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(25deg);
  width: 270px;
`;

const ContentBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  text-align: center;
  transition: 1s;
  z-index: 10;

  ${Card}:hover & {
    height: 170px;
  }
`;

const TitleH2 = styled.h2`
  position: relative;
  font-weight: 800;
  letter-spacing: 1;
  text-shadow: 1px 1px #b1c9c1;
  color: teal;
  margin-bottom: 6%;
  font-size: 24px;
`;

const Desc = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;

  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 24px;
  font-weight: 700;
  display: inline-block;
  background: white;
  margin: 0 5px;
  transition: 0.5s;
  color: teal;
  border-radius: 4px;

  ${Card}:hover & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.5s;
  }
`;
// const Button = styled.a`
//   cursor: pointer;
//   display: inline-block;
//   padding: 10px 20px;
//   background: white;
//   border: 1px solid teal;
//   border-radius: 4px;
//   margin-top: 10px;
//   text-decoration: none;
//   font-weight: 600;
//   color: teal;
//   opacity: 0;
//   transform: translateY(50px);
//   transition: 0.5s;

//   ${Card}:hover & {
//     opacity: 1;
//     transform: translateY(0px);
//     transition-delay: 0.75s;
//   }

//   &:hover {
//     background-color: teal;
//     color: white;
//     transition: 0.3s;
//   }
// `;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <Annoucement />
      <Container>
        <Link to="/" style={{ color: "teal" }}>
          ← Back to Products
        </Link>
        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <OrderWrapper key={order._id}>
                <h3>
                  Date -
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <CardWrapper>
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <Card key={index}>
                      <Link to={`/products/${_id}`}>
                        <ImageBox>
                          <Img alt={name} src={`/images/${image}`} />
                        </ImageBox>
                      </Link>
                      <ContentBox>
                        <TitleH2>{name}</TitleH2>
                        <Desc>${price}</Desc>
                      </ContentBox>
                    </Card>
                  ))}
                </CardWrapper>
              </OrderWrapper>
            ))}
          </>
        ) : null}
      </Container>
      <Cart />
      <Footer />
    </>
  );
}

export default OrderHistory;
