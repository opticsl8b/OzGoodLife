import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import styled from "styled-components";

const Container = styled.div`
  width: 25%;
  text-align: center;
  position: relative;
  margin: 16px;
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
  border: 1px solid teal;
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
  font-size: 16px;
  font-weight: 500;
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
const Button = styled.a`
  cursor: pointer;
  display: inline-block;
  padding: 10px 20px;
  background: white;
  border: 1px solid teal;
  border-radius: 4px;
  margin-top: 10px;
  text-decoration: none;
  font-weight: 600;
  color: teal;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 0.75s;
  }
`;

// const ProductImage = styled.img`
//   z-index: 2;
//   object-fit: cover;
// `;

// const ProductName = styled.p`
//   font-size: 18px;
//   margin-top: 0;
// `;
// const ProductDetails = styled.div``;

// const Button = styled.button``;

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    // <Container>
    //   <Link to={`/products/${_id}`}>
    //     <ProductImage alt={name} src={`/images/${image}`} />
    //     <ProductName>{name}</ProductName>
    //   </Link>
    //   <ProductDetails>
    //     <div>
    //       {quantity} {pluralize("item", quantity)} in stock
    //     </div>
    //     <span>${price}</span>
    //   </ProductDetails>
    //   <Button onClick={addToCart}>Add to cart</Button>
    // </Container>

    <Container>
      <Card>
        <Link to={`/products/${_id}`}>
          <ImageBox>
            <Img alt={name} src={`/images/${image}`} />
          </ImageBox>
        </Link>
        <ContentBox>
          <TitleH2>{name}</TitleH2>
          <Desc>${price}</Desc>
          <Button onClick={addToCart}>Add to cart</Button>
        </ContentBox>
      </Card>
    </Container>
  );
}

export default ProductItem;
