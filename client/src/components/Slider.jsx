import { useState } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { sliderItems } from "../utils/slideData";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  widows: 100%;
  height: 90vh;
  display: flex;
  /* background-color: coral; */
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* arrow locate left and right can center */
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 2s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const ButtonContainer = styled.div``;

const Button = styled.a`
  text-decoration: none;
  width: 240px;
  border: 1px solid teal;
  border-radius: 8px;
  background: none;
  padding: 10px 20px;
  font-size: 32px;
  cursor: pointer;
  margin: 10px;
  transition: 0.8s;
  position: relative;
  overflow: hidden;
  color: #fff;

  &:hover {
    color: teal;
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
    border-radius: 0 0 0 0;
    height: 100%;
  }

  &:hover::before {
    height: 0%;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  // functions for arrows
  const handleClick = (direction) => {
    if (direction === "left") {
      // if >0 then -1,otherwise =2(last pic)
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      // if >0 then -1,otherwise =2(first pic)
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((slideData) => (
          <Slide bg={slideData.bg} key={slideData.id}>
            <ImgContainer>
              <Image src={slideData.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{slideData.title}</Title>
              <Desc>{slideData.desc}</Desc>
              <ButtonContainer>
                <Button href="#category">Shop Now</Button>
              </ButtonContainer>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
