import React, { Component } from "react";
import styled from "styled-components";

import Employees from "./Employees";
import Signin from "./Signin";
import Signup from "./Signup";
import User from "./User";

let Container = styled.div`
  display: flex;
  justify-content: center;
`;

let Wrapper = styled.div``;

let Span = styled.span`
  button {
    background: none;
    border: none;
    color: #878e99;
    outline: none;
  }
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
                <Wrapper>
                  {this.state.isSignUp ? <Signup /> : <Signin />}
                  <Span
                    onClick={() =>
                      this.setState({
                        isSignUp: !this.state.isSignUp,
                      })
                    }
                  >
                    <button>
                      {this.state.isSignUp
                        ? "* Already have an account? Sign In"
                        : "* Don't have an account? Sign Up"}
                    </button>
                  </Span>
                </Wrapper>
              )}
              {me && (
                <Container>
                  <Employees />
                </Container>
              )}
            </Container>
          );
        }}
      </User>
    );
  }
}

export default Home;
