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
  margin-right: 15rem;
  display: flex;
  justify-content: center;
  text-align: center;
  border: none;
  padding: 0;
`;

let Title = styled.h2`
  color: #acbdba;
  text-align: center;
  font-style: oblique;
  font-variant: small-caps;
  font-size: 5vmax;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 2vmax;
`;

let InputTop = styled.input`
  margin-bottom: 2.5vmax;
  background: none;
  border: 1px solid #ffe377;
  text-align: center;
  border-bottom: none;
  font-size: 2vmax;
  color: #d9dee9;
  outline: none;
`;

let Input = styled.input`
  margin-bottom: 2vmax;
  background: none;
  border: 1px solid #ffe377;
  text-align: center;
  border-bottom: none;
  border-top: none;
  font-size: 2vmax;
  color: #d9dee9;
  outline: none;
`;

let ButtonDiv = styled.div`
  text-align: center;
`;

let Button = styled.button`
  background: none;
  color: #b8dbd9;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  font-size: 2.3vmax;
  font-variant: small-caps;
  border: 1px solid #ffe377;
  border-top: none;
  width: 15vmax;
  outline: none;
`;

class Signin extends Component {
  state = {
    email: "",
    password: "",
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await signin();
                this.setState({ email: "", password: "" });
              }}
            >
              <Fieldset disabled={loading}>
                <Title>Sign In </Title>
                {error && (
                  <ErrorText onError={error}>
                    Email or Password are incorrect!
                  </ErrorText>
                )}
                <label htmlFor="email">
                  <InputTop
                    className="Top"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <ButtonDiv>
                  <Button type="submit">Sign In</Button>
                </ButtonDiv>
              </Fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
