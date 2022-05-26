import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import styled from "styled-components";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.imgur.com/OI44MiS.png") center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  border: 0.5px solid gray;
  border-radius: 8px;
  box-shadow: 6px 6px 2px 2px teal;

  ${mobile({ width: "75%" })};
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  z-index: 3;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

// const Agreement = styled.span`
//   font-size: 12px;
//   margin: 20px 0px;
// `;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex: 2;
  margin-top: 16px;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  border-radius: 8px;
  padding: 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0;
`;

// const P = styled.p`
//   font-size: 16px;
// `;

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create An Account</Title>
        <Form onSubmit={handleFormSubmit}>
          <Input
            placeholder="First Name"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <Input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
          {/* <Input placeholder="confirm password" onChange={handleChange} /> */}
          {/* <Agreement>
              By creating an account,I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement> */}
          <Links>
            <Button type="submit">CREATE</Button>
            <Link
              to="/login"
              style={{
                alignSelf: "center",
                color: "teal",
                textDecoration: "none",
              }}
            >
              ← Go to Login
            </Link>
          </Links>{" "}
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Signup;
