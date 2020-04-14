import React, { Component } from "react";
import styled from "styled-components";

import Employees from "./Employees";
import Signin from "./Signin";
import Signup from "./Signup";
import User from "./User";

let Container = styled.div`
  display: flex;
`;

let WrapperLeft = styled.div`
  background: #231c20;
  border-top-right-radius: 70%;
  height: 80vh;
  width: 50vw;
  float: left;
  margin-right: 1%;
`;

let WrapperRight = styled.div`
  background: #231c20;
  border-top-left-radius: 70%;
  width: 50vw;
  float: right;
  margin-left: 1%;
  height: 80vh;
`;

class Home extends Component {
  render() {
    return (
      <div>
        <User>
          {({ data }) => {
            console.log(data, "DATA");
            return (
              <div>
                {!data.me && (
                  <Container>
                    <WrapperLeft>
                      <Signin />
                    </WrapperLeft>
                    <WrapperRight>
                      <Signup />
                    </WrapperRight>
                  </Container>
                )}
                {data.me && (
                  <Container>
                    <Employees />
                  </Container>
                )}
              </div>
            );
          }}
        </User>
      </div>
    );
  }
}

export default Home;
