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
      jobTitle
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
  text-align: left;
  font-family: "Roboto", sans-serif;
  color: #425c66;
  font-weight: bold;
  border-collapse: collapse;
  background: #c4d7f2;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  .title {
    color: #f0f7ee;
    font-family: "Montserrat", sans-serif;
    font-weight: bolder;
  }
`;

let Img = styled.img`
  border-radius: 50%;
  width: 5vw;
  margin: 1vh;
`;

let Thead = styled.thead`
  background: #525b76;
  border-top-right-radius: 50%;
`;

let Tr = styled.tr`
  border-bottom: 1px solid #95afba;
  padding-bottom: 5px;
`;

let Th = styled.th`
  padding: 0 2vw;
  text-align: left;
  border: none;
`;

const Employees = () => (
  <User>
    {({ data: { me } }) => {
      return (
        <Query query={ALL_EMPLOYEES_QUERY}>
          {({ data, error, loading }) => {
            if (data.employees == null)
              return <h1>Add an employee to get started!</h1>;
            let filteredEmployees = data.employees.filter(
              (employee) => me.id == employee.user.id
            );
            if (filteredEmployees.length == 0)
              return <h1>Add an employee to get started!</h1>;

            return (
              <Table>
                <Thead>
                  <tr>
                    <Th className="edge-left"> </Th>
                    <Th className="title">Full Name</Th>
                    <Th className="title">Job Title</Th>
                    <Th className="title">Phone Number</Th>
                    <Th className="title">E-Mail</Th>
                    <Th className="title">Location</Th>
                    <Th></Th>
                  </tr>
                </Thead>
                {filteredEmployees.map((employee) => {
                  return (
                    <tbody key={employee.id}>
                      <Tr>
                        <Th>
                          <Img
                            src={(employee.image && employee.image) || null}
                            alt={employee.name}
                          />
                        </Th>
                        <Th>
                          <span title={employee.email}>{employee.name}</span>
                        </Th>
                        <Th title={`Salary | ${employee.salary}`}>
                          {employee.jobTitle}
                        </Th>
                        <Th>{employee.phoneNumber}</Th>
                        <Th>{employee.email}</Th>
                        <Th>
                          {employee.street} {employee.state.toUpperCase()},{" "}
                          {employee.country.toUpperCase()} {employee.zipcode}
                        </Th>
                        <Th>
                          <DeleteEmployee id={employee.id} />
                        </Th>
                      </Tr>
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
