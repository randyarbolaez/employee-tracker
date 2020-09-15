import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      password
    }
  }
`;

let ErrorText = styled.p`
  margin-top: 0px;
  color: #506722;
  font-family: "Montserrat", sans-serif;
`;

let Fieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  text-align: center;
  border: none;
  padding: 0;
  width: 30vw;
  background: #406e8e;
  margin: 0;
  padding-bottom: 10vh;
`;

let Title = styled.h2`
  text-align: center;
  font-style: italic;
  font-variant: small-caps;
  margin-bottom: 0.6vmax;
  font-family: "Montserrat", sans-serif;
  color: #d9f0ff;
  font-size: 5vmax;
`;

let Input = styled.input`
  margin-bottom: 1vmax;
  background: #d9f0ff;
  border-radius: 20px;
  text-align: center;
  border: none;
  font-size: 2vmax;
  color: #406e8e;
  outline: none;
  padding: 10px 5px;
  ::placeholder {
    color: #406e8e;
  }
`;

let ButtonDiv = styled.div`
  text-align: center;
`;

let Button = styled.button`
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  color: #d9f0ff;
  font-weight: bold;
  font-size: 2.3vmax;
  font-variant: small-caps;
  border: none;
  padding: 10px 20px;
  width: 12vmax;
  :hover {
    background-color: #d9f0ff;
    color: #406e8e;
    border-radius: 16px;
  }
`;

let Form = styled.form``;

class Signin extends Component {
  state = {
    email: "",
    password: "",
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const emailRegex = /\S+@\S+\.\S+/;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await signin();
                this.setState({ email: "", password: "" });
              }}
            >
              <Fieldset disabled={loading}>
                <Title>Sign In</Title>
                {error && (
                  <ErrorText onError={error}>
                    Email or Password are incorrect!
                  </ErrorText>
                )}
                <label htmlFor="email">
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                {emailRegex.test(this.state.email) && (
                  <label htmlFor="password">
                    <Input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </label>
                )}
                <ButtonDiv>
                  <Button type="submit">Sign In</Button>
                </ButtonDiv>
              </Fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
