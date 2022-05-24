import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
// For adding link direct back to login page
// import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import styled from "styled-components";
import { mobile } from "../responsive";

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
  ${mobile({ width: "75%" })};
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
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

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const P = styled.p`
  font-size: 16px;
`;

const Register = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER, {
    variables: { ...formState },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create An Account</Title>
        {data ? (
          <P>Account Create Success! Happy Shopping</P>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <Input
              placeholder="username"
              name="username"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
            <Input
              placeholder="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Input
              placeholder="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            {/* <Input placeholder="confirm password" onChange={handleChange} /> */}
            {/* <Agreement>
              By creating an account,I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement> */}
            <Button type="submit">CREATE</Button>
          </Form>
        )}
        {error && <Title>{error.message}</Title>}
      </Wrapper>
    </Container>
  );
};

export default Register;
