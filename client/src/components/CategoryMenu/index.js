import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { mobile } from "../../utils/responsive";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 20vh;
    position: relative;
    align-self: center;
    margin-left: 4%;
  `;

  const Image = styled.img`
    width: 100%;
    height: 100%;
    /* adjust the img after */
    object-fit: contain;
    opacity: 0.5;
    ${mobile({ height: "20vh" })}
  `;

  const Title = styled.h3`
    font-size: 40px;
    color: teal;
    margin-bottom: 20px;
    margin-left: 1%;
  `;

  const Button = styled.button`
    border: 1px solid teal;
    border-radius: 4px;
    background: none;
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
    margin: 10px;
    transition: 1.5s;
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
      transition: 0.8s;
      top: 0;
      border-radius: 0 0 50% 50%;
    }
    &:hover::before {
      height: 180%;
    }
  `;

  return (
    <Container id="category">
      <Title>Our Brands</Title>
      {categories.map((item) => (
        <Button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </Button>
      ))}
    </Container>
  );
}

export default CategoryMenu;
