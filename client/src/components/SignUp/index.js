import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";


import axios from "axios";

//import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button'
//import Bootstrap from "react-bootstrap";



import "./index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;

  }

  

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


handleSubmit = event => {
    event.preventDefault();

  //  console.log('currently the email is' + this.state.email);
  //  console.log('the username is ' + this.state.username); 
  //  console.log('the password is ' + this.state.password );

// save the information to the database HERE:
axios.post('/api/signup', {
  //username: this.state.username,
  email: this.state.email,
  password: this.state.password

})
.then(function (data) {
// console.log(response);
console.log(data.data);     //data is an object so when you do data.data it will return a route!!! depending on what is in api-routes.js
 
 
 window.location.replace(data.data);     
 })
.catch(function (error) {
  console.log(error);
});

// when the post is complete clear the form and possibly redirect the user to the main page??
this.setState({email:""});
this.setState({password:""});
}
 



  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>

        {/* <FormGroup controlId="username" >
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup> */}
         
          <FormGroup controlId="email" >
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" >
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
