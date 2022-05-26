import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import styled from "styled-components";
import { DeleteForeverOutlined } from "@material-ui/icons";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NameItem = styled.h3`
  font-size: 16px;
  padding-top: 8px;
`;

const PriceItem = styled.b`
  font-size: 16px;
  color: gray;
  text-align: left;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
  padding-bottom: 20px;
`;

const Qty = styled.span`
  font-size: 16px;
`;
const Input = styled.input`
  border: 1px solid lightgray;
  width: 60%;
  text-align: center;
  margin: 0 5%;
  font-weight: 700;
  font-size: 18px;
`;

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <Container>
      <Left>
        <Image src={`/images/${item.image}`} alt="" />
      </Left>
      <Center>
        <NameItem>{item.name}</NameItem>
        <PriceItem>${item.price} /ea</PriceItem>
      </Center>
      <Right>
        <Qty>Qty:</Qty>
        <Input
          type="number"
          placeholder="1"
          value={item.purchaseQuantity}
          onChange={onChange}
        />

        <DeleteForeverOutlined
          onClick={() => removeFromCart(item)}
          style={{
            fontSize: "30px",
            color: "teal",
          }}
        />
      </Right>
    </Container>
  );
};

export default CartItem;
