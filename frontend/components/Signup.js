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
  background-color: #d9f0ff;
  width: 30vw;
  margin: 0;
  padding-bottom: 10vh;
`;

let Title = styled.h2`
  text-align: center;
  font-style: italic;
  font-variant: small-caps;
  margin-bottom: 0.6vmax;
  font-family: "Montserrat", sans-serif;
  color: #406e8e;
  font-size: 5vmax;
`;

// let InputTop = styled.input`
//   margin-bottom: 2.5vmax;
//   background: none;
//   border: 1px solid #ffe377;
//   text-align: center;
//   border-bottom: none;
//   font-size: 2vmax;
//   color: #d9dee9;
//   outline: none;
// `;

let Input = styled.input`
  margin-bottom: 1vmax;
  background: #406e8e;
  border-radius: 20px;
  text-align: center;
  border: none;
  font-size: 2vmax;
  color: #d9f0ff;
  outline: none;
  padding: 10px 5px;
  ::placeholder {
    color: #d9f0ff;
  }
`;

let ButtonDiv = styled.div`
  text-align: center;
`;

let Button = styled.button`
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  color: #406e8e;
  font-weight: bold;
  font-size: 2.3vmax;
  font-variant: small-caps;
  border: none;
  padding: 10px 20px;
  width: 12vmax;
  :hover {
    background-color: #406e8e;
    color: #d9f0ff;
    border-radius: 16px;
  }
`;

let Div = styled.div``;

class Signup extends Component {
  state = {
    email: "",
    password: "",
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render(props) {
    const emailRegex = /\S+@\S+\.\S+/;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <Div>
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
                  <Title>Sign Up</Title>
                  {error && <p onError={error}>Error</p>}
                  <label htmlFor="Columns">
                    <Input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </label>

                  {emailRegex.test(this.state.email) && (
                    <label htmlFor="Columns">
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
                    <Button type="submit">Sign Up</Button>
                  </ButtonDiv>
                </Fieldset>
              </form>
            </Div>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
