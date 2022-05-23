import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
// import {Link} from 'react-router-dom'
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.imgur.com/OI44MiS.png") center;
  /* background-size: cover; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobile({ width: "75%" })};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const P = styled.p`
  font-size: 16px;
`;

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        {data ? (
          <P>Login Success! Happy Shopping</P>
        ) : (
          <Form onSubmit={handleFormSubmit}>
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
            <Button type="submit">LOGIN</Button>
            
            {/* <Link>Forget Password</Link>
            <Link>Create A New Account</Link> */}
          
          </Form>
        )}
        {error && <Title>{error.message}</Title>}
      </Wrapper>
    </Container>
  );
};

export default Login;
