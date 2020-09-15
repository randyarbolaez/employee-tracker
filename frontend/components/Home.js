import React, { Component } from "react";
import styled from "styled-components";

import Employees from "./Employees";
import Signin from "./Signin";
import Signup from "./Signup";
import User from "./User";

let Container = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: red; */
`;

let Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  color: white;
  font-size: 3vw;
  margin-bottom: 0;
`;

let WrapperAuth = styled.div``;

let WrapperSwitch = styled.div`
  display: flex;
  width: 30vw;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

let Wrapper = styled.div``;

let SubTitle = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1.2vw;
  color: #23395b;
  width: 80%;
  align-self: center;
`;

let Button = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  width: 35%;
  margin: 4px 2px;
  padding: 10px 20px;
  border: none;
  border-radius: 16px;
  background: white;
  border-color: red;
  color: #8ea8c3;
  align-self: center;
  text-decoration: none;
  font-size: 1.2vmax;
`;

class Home extends Component {
  state = {
    isSignUp: true,
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <Container>
              {!me && (
                <WrapperAuth>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {this.state.isSignUp ? (
                      <Signup />
                    ) : (
                      <WrapperSwitch style={{ backgroundColor: "#D9F0FF" }}>
                        <Title style={{ color: "#406E8E" }}>Sign Up!</Title>
                        <SubTitle>
                          If you don't already have an account please sign up.
                        </SubTitle>
                        <Button
                          style={{
                            backgroundColor: "#406E8E",
                            color: "#D9F0FF",
                          }}
                          onClick={() =>
                            this.setState({
                              isSignUp: !this.state.isSignUp,
                            })
                          }
                        >
                          Sign Up
                        </Button>
                      </WrapperSwitch>
                    )}
                    {!this.state.isSignUp ? (
                      <Signin />
                    ) : (
                      <WrapperSwitch style={{ backgroundColor: "#406E8E" }}>
                        <Title style={{ color: "#D9F0FF" }}>
                          Welcome Back!
                        </Title>
                        <SubTitle style={{ color: "#D9F0FF" }}>
                          If you already have an account please sign in.
                        </SubTitle>
                        <Button
                          style={{
                            backgroundColor: "#D9F0FF",
                            color: "#406E8E",
                          }}
                          onClick={() =>
                            this.setState({
                              isSignUp: !this.state.isSignUp,
                            })
                          }
                        >
                          Sign In
                        </Button>
                      </WrapperSwitch>
                    )}
                  </div>
                </WrapperAuth>
              )}
              {me && (
                <Wrapper>
                  <Employees />
                </Wrapper>
              )}
            </Container>
          );
        }}
      </User>
    );
  }
}

export default Home;
