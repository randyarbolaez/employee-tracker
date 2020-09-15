import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Nav from "./Nav";
import Meta from "./Meta";

const GlobalStyle = createGlobalStyle`
  html{
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body{
    background-color:#8ea8c3;
    height:100vh;
    padding:0;
    margin:0;
    font-size:1.5rem;
    line-height:2;
  }
  a{
    text-decoration:none;
    font-family: "Montserrat", sans-serif;
    color:#F4F4F9;
    font-size: 1.5vmax;
  }
  a:hover{
    color:#ACBDBA;
  }
`;

class Page extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Meta />
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
