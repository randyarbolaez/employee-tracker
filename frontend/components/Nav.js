import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import Signout from "./Signout";
import User from "./User";

let Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
`;

let Title = styled.h1`
  color: #c6dbf0;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-style: oblique;
  font-size: 6vmax;
  text-align: center;
  margin-top: 0;
`;

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: me }) => {
          console.log(!!me.me, "ME", me.me);
          return (
            <div>
              {me.me && (
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
              {!me.me && (
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
