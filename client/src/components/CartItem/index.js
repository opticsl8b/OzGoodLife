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

const NameItem = styled.h3`
  font-size: 16px;
  padding-top: 8px;
  color: teal;
`;

const PriceItem = styled.p`
  font-size: 16px;
  color: teal;
  text-align: left;
  flex: 1;
  padding: 2px;
`;

const Right = styled.div`
  flex: 2;
  display: flex;

  flex-direction: column;
  padding-bottom: 20px;
`;

const Qty = styled.p`
  flex: 1;
  font-size: 16px;
  color: teal;
`;
const Input = styled.input`
  border: 1px solid lightgray;
  width: 60%;
  text-align: center;
  margin: 0 5%;
  font-weight: 700;
  font-size: 18px;
  flex: 2;
  color: teal;
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;
const Bottom = styled.div`
  flex: 1;

  display: flex;
  align-items: flex-end;
`;
const QtyItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
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

      <Right>
        <Top>
          <NameItem>{item.name}</NameItem>
        </Top>
        <Bottom>
          <PriceItem>${item.price} /ea</PriceItem>
          <QtyItem>
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
                flex: "1",
                fontSize: "30px",
                color: "teal",
                cursor: "pointer",
              }}
            />
          </QtyItem>
        </Bottom>
      </Right>
    </Container>
  );
};

export default CartItem;
