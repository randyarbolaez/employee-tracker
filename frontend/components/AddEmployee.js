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
    $jobTitle: String!
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
      jobTitle: $jobTitle
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

let Label = styled.label`
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
  :disabled {
    color: #d3d3d3;
  }
`;

class AddEmployee extends Component {
  state = {
    name: "",
    phoneNumber: "",
    email: "",
    jobTitle: "",
    salary: "",
    image: "",
    street: "",
    state: "",
    country: "US",
    zipcode: "",
    loading: true,
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
    this.setState({ image: file.url, loading: !this.state.loading });
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
                placeholder="Full Name"
                required
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="(123) 456-7890"
                pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                required
              />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Input
                type="jobTitle"
                id="jobTitle"
                name="jobTitle"
                placeholder="Job Title"
                required
                value={this.state.jobTitle}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="salary"
                name="salary"
                placeholder="Salary"
                required
                value={this.state.salary}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                id="street"
                name="street"
                placeholder="Street"
                required
                value={this.state.street}
                onChange={this.handleChange}
              />

              <Label htmlFor="State">
                <select
                  name="state"
                  onChange={this.handleChange}
                  required
                  placeholder="State"
                >
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </Label>
              <Input
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="Zipcode"
                required
                value={this.state.zipcode}
                onChange={this.handleChange}
                maxLength="5"
                minLength="5"
              />

              <InputBottom
                type="file"
                id="file"
                name="file"
                required
                onChange={this.uploadFile}
              />
              <Button type="submit" disabled={this.state.loading}>
                Submit
              </Button>
            </form>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default AddEmployee;
