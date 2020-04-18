import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";

const ADD_EMPLOYEE_MUTATION = gql`
  mutation ADD_EMPLOYEE_MUTATION(
    $name: String!
    $phoneNumber: String!
    $email: String!
    $salary: String!
    $image: String!
    $street: String!
    $state: String!
    $country: String!
    $zipcode: String!
  ) {
    createEmployee(
      name: $name
      phoneNumber: $phoneNumber
      email: $email
      salary: $salary
      image: $image
      street: $street
      state: $state
      country: $country
      zipcode: $zipcode
    ) {
      id
    }
  }
`;

let Container = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
  margin: 5vh 10vw 0 10vw;
  text-align: center;
  align-items: center;
`;

let Input = styled.input`
  margin-top: 1vmax;
  margin-bottom: 1vmax;
  margin-left: 1.4vmax;
  background: none;
  border: 1px solid #ffe377;
  text-align: center;
  border-bottom: none;
  border-top: none;
  font-size: 1.4vmax;
  color: #d9dee9;
  outline: none;
  padding: 2vh;
`;

let InputBottom = styled.input`
  margin-top: 1vmax;
  margin-bottom: 1vmax;
  margin-left: 1.4vmax;
  background: none;
  border: 1px solid #ffe377;
  text-align: center;
  border-top: none;
  font-size: 1.4vmax;
  color: #d9dee9;
  outline: none;
  padding: 2vh;
`;

let ButtonDiv = styled.div`
  text-align: center;
`;

let Button = styled.button`
  background: none;
  color: #ff9aa2;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  font-size: 2vmax;
  margin-left: 4.2vmax;
  font-variant: small-caps;
  border: 1px solid #ffe377;
  border-top: none;
  width: 10vmax;
  outline: none;
  padding: 2vh;
`;

class AddEmployee extends Component {
  state = {
    name: "",
    phoneNumber: "",
    email: "",
    salary: "",
    image: "",
    street: "",
    state: "",
    country: "",
    zipcode: "",
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "employee-tracker");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx3i4rcnz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file.url, "=====FILE");
    this.setState({ image: file.url });
  };

  render() {
    return (
      <Mutation mutation={ADD_EMPLOYEE_MUTATION} variables={this.state}>
        {(createEmployee, { error, loading }) => (
          <Container>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await createEmployee();
                Router.push({
                  pathname: "/",
                });
              }}
            >
              {error && <p>{error.message}</p>}
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="name"
                required
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="phoneNumber"
                required
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="salary"
                name="salary"
                placeholder="salary"
                required
                value={this.state.salary}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="street"
                name="street"
                placeholder="street"
                required
                value={this.state.street}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="state"
                name="state"
                placeholder="state"
                required
                value={this.state.state}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="country"
                name="country"
                placeholder="country"
                required
                value={this.state.country}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="zipcode"
                required
                value={this.state.zipcode}
                onChange={this.handleChange}
              />

              <InputBottom
                type="file"
                id="file"
                name="file"
                required
                onChange={this.uploadFile}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default AddEmployee;
