import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import { ALL_EMPLOYEES_QUERY } from "./Employees";

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DELETE_EMPLOYEE_MUTATION($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

let Button = styled.button`
  background: none;
  color: #b8dbd9;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  font-size: 1.3vmax;
  font-variant: small-caps;
  border: 1px solid #ffe377;
  border-top: none;
  border-bottom: none;
  width: 5vmax;
`;

class DeleteEmployee extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_EMPLOYEES_QUERY });
    // console.log(payload);
    data.employees = data.employees.filter(
      (employee) => employee.id !== payload.data.deleteEmployee.id
    );
    Router.push({
      pathname: "/",
    });
    cache.writeQuery({ query: ALL_EMPLOYEES_QUERY, data });
  };
  render(props) {
    return (
      <Mutation
        mutation={DELETE_EMPLOYEE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteEmployee, { error }) => (
          <Button
            onClick={() => {
              if (confirm("Are you sure you want to delete this employee?")) {
                deleteEmployee();
              }
            }}
          >
            Delete
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteEmployee;
