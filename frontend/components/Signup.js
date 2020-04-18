import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import styled from "styled-components";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
      password
    }
  }
`;

let Fieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  text-align: center;
  border: none;
  padding: 0;
`;

let Title = styled.h2`
  color: #525b76;
  text-align: center;
  font-style: oblique;
  font-variant: small-caps;
  font-size: 5vmax;
  font-family: "Roboto", sans-serif;
  margin-bottom: 0.6vmax;
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
  color: #ff9aa2;
  font-family: "Montserrat", sans-serif;
  font-style: oblique;
  font-size: 2.3vmax;
  font-variant: small-caps;
  border: 1px solid #ffe377;
  border-top: none;
  width: 15vmax;
`;

class Signup extends Component {
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
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await signup();
                this.setState({ email: "", password: "" });
                console.log(res, "RES", "SIGNUP");
              }}
            >
              <Fieldset disabled={loading}>
                <Title>Sign Up </Title>
                {error && <p onError={error}>Error</p>}
                <label htmlFor="Columns">
                  <InputTop
                    type="text"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="Columns">
                  <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <ButtonDiv>
                  <Button type="submit">Sign Up</Button>
                </ButtonDiv>
              </Fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
