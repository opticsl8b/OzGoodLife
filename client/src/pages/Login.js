import  { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
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
  /* background-size: cover; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  border: 0.5px solid gray;
  border-radius: 8px;
  box-shadow: 6px 6px 2px 2px teal;
  ${mobile({ width: "75%" })};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  border-radius: 8px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 5px 0;
`;

const P = styled.p`
  font-size: 16px;
`;

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
        <Title>LOGIN</Title>

        <Form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email address:</label>
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <label htmlFor="pwd">Password:</label>
          <Input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
          <Links>
            <Button type="submit">LOGIN</Button>
            <Link
              to="/signup"
              style={{
                alignSelf: "center",
                color: "teal",
                textDecoration: "none",
              }}
            >
              ← Haven't Create Account Yet?
            </Link>
          </Links>
          {/* <Link>Forget Password</Link>
            <Link>Create A New Account</Link> */}
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
        </Form>
      </Wrapper>
    </Container>

    // <div className="container my-1">

    //   <h2>Login</h2>
    //   <form onSubmit={handleFormSubmit}>
    //     <div className="flex-row space-between my-2">
    //       <label htmlFor="email">Email address:</label>
    //       <input
    //         placeholder="youremail@test.com"
    //         name="email"
    //         type="email"
    //         id="email"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="flex-row space-between my-2">
    //       <label htmlFor="pwd">Password:</label>
    //       <input
    //         placeholder="******"
    //         name="password"
    //         type="password"
    //         id="pwd"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     {error ? (
    //       <div>
    //         <p className="error-text">The provided credentials are incorrect</p>
    //       </div>
    //     ) : null}
    //     <div className="flex-row flex-end">
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
  );
}

export default Login;
