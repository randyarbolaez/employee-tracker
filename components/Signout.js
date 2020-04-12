import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import styled from "styled-components";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const ButtonToLink = styled.div`
  h1 {
    border: none;
    background-color: none;
    font-family: "Montserrat", sans-serif;
    font-variant: small-caps;
    font-size: 2vmax;
  }
  button:hover {
    color: #fbe8a6;
    cursor: pointer;
  }
`;

const Signout = (props) => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout) => (
      <ButtonToLink>
        <h1 onClick={signout}>Sign Out</h1>
      </ButtonToLink>
    )}
  </Mutation>
);

export default Signout;
