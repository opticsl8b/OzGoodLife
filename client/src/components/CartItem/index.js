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

const ImageItem = styled.div`
  flex: 1;
`;

const Image = styled.img`
  max-width: 100%;
`;

const ItemDetails = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding-right: 15%;
`;

const NameNPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const NameItem = styled.h3`
  flex: 2;
  font-size: 20px;
`;

const PriceItem = styled.span`
  flex: 1;
  font-size: 15px;
  color: gray;
`;

const QtyNAction = styled.div`
  /* border: 1px solid black; */
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`;

const Qty = styled.span`
  font-size: 15px;
`;
const Input = styled.input`
  border: none;
  width: 20%;
  text-align: center;
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
    <Container className="flex-row">
      <ImageItem>
        <Image src={`/images/${item.image}`} alt="" />
      </ImageItem>
      <ItemDetails>
        <NameNPrice>
          <NameItem>{item.name}</NameItem>
          <PriceItem>${item.price}</PriceItem>
        </NameNPrice>
        <QtyNAction>
          <Qty>Qty:</Qty>
          <Input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <DeleteForeverOutlined
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          />
        </QtyNAction>
      </ItemDetails>
    </Container>
  );
};

export default CartItem;
