import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import Signout from "./Signout";
import User from "./User";

let Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  background: #2f4550;
  height: 20vh;
  overflow: hidden;
`;

let Title = styled.h1`
  color: #586f7c;
  font-variant: small-caps;
  font-style: oblique;
  font-family: "Muli", sans-serif;
  font-size: 6vmax;
  text-align: center;
  margin-top: 0;
`;

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data }) => {
          return (
            <div>
              {data.me && (
                <Container>
                  <Link href="/">
                    <a>
                      <Signout />
                    </a>
                  </Link>
                  <Title>Employee Tracker</Title>
                  <Link href="/add">
                    <a>
                      <h1>+</h1>
                    </a>
                  </Link>
                </Container>
              )}
              {!data.me && (
                <Container>
                  <Title>Employee Tracker</Title>
                </Container>
              )}
            </div>
          );
        }}
      </User>
    );
  }
}

export default Nav;
