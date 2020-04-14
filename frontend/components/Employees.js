import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import User, { CURRENT_USER_QUERY } from "./User";
import DeleteEmployee from "./DeleteEmployee";

const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY {
    employees {
      id
      name
      phoneNumber
      email
      salary
      image
      street
      state
      country
      zipcode
      user {
        id
      }
    }
  }
`;

let Table = styled.table`
  /* display: flex;
  justify-content: center; */
  border-collapse: collapse;
  width: 100%;
`;

let Img = styled.img`
  border-radius: 100%;
  width: 5vw;
  /* vertical-align: middle; */
  text-align: center;
`;

const Employees = () => (
  <User>
    {({ data: { me } }) => {
      return (
        <Query query={ALL_EMPLOYEES_QUERY}>
          {({ data, error, loading }) => {
            if (me == null) return <p>loading</p>;
            let filteredEmployees = data.employees.filter(
              (employee) => me.id == employee.user.id
            );
            if (filteredEmployees.length == 0)
              return <h1>Add an employee to get started!</h1>;

            return (
              <Table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>E-Mail</th>
                    <th>Salary</th>
                    <th>Street</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Zip Code</th>
                  </tr>
                </thead>
                {filteredEmployees.map((employee) => {
                  return (
                    <tbody key={employee.id}>
                      <tr>
                        <th>
                          <Img
                            src={(employee.image && employee.image) || null}
                            alt=""
                          />
                        </th>
                        <th>
                          <span>{employee.name}</span>
                        </th>
                        <th>{employee.phoneNumber}</th>
                        <th>{employee.email}</th>
                        <th>{employee.salary}</th>
                        <th>{employee.street}</th>
                        <th>{employee.state}</th>
                        <th>{employee.country}</th>
                        <th>{employee.zipcode}</th>
                        <th>
                          <DeleteEmployee id={employee.id} />
                        </th>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            );
          }}
        </Query>
      );
    }}
  </User>
);

export default Employees;
export { ALL_EMPLOYEES_QUERY };
