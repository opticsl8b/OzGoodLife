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
`;

const ProductImage = styled.img`
  z-index: 2;
  object-fit: cover;
`;

const ProductName = styled.p`
  font-size: 18px;
  margin-top: 0;
`;
const ProductDetails = styled.div``;

const Button = styled.button``;

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
    <Container>
      <Link to={`/products/${_id}`}>
        <ProductImage alt={name} src={`/images/${image}`} />
        <ProductName>{name}</ProductName>
      </Link>
      <ProductDetails>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </ProductDetails>
      <Button onClick={addToCart}>Add to cart</Button>
    </Container>

    // <Container>
    //   <Card>
    //     <ImageBox>
    //       <Img/>
    //     </ImageBox>
    //     <ContentBox>
    //       <TitleH2></TitleH2>
    //       <Desc></Desc>
    //       <Button onClick={addToCart}>Add to cart</Button>
    //     </ContentBox>
    //   </Card>
    // </Container>
  );
}

export default ProductItem;
