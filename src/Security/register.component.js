import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vnip = value => {
  if (value.length < 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The company NIP must be at least 10 numbers.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 8 ) {
    return (
      
      <div className="alert alert-danger" role="alert">
        
        Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.
      </div>
      
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeCompanyAddress = this.onChangeCompanyAddress.bind(this);
    this.onChangeCompanyNip = this.onChangeCompanyNip.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);

    this.state = {
      companyName: "",
      companyAddress: "",
      companyNip: "",
      name: "",
      lastName: "",
      email:"",
      password: "",
   

      successful: false,
      message: ""
    };
  }
  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }
  onChangeCompanyAddress(e) {
    this.setState({
      companyAddress: e.target.value
    });
  }
  onChangeCompanyNip(e) {
    this.setState({
      companyNip: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }


  onChangeName(e) {
    this.setState({
      name: e.target.value 
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.name,
        this.state.email,
        this.state.password,
        this.state.companyName,
        this.state.companyAddress,
        this.state.companyNip,
        this.state.lastName,

      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          console.log(response)
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }
  
  render() {
    return (
      <div>
     
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.emai}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                     pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                     pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={this.state.companyName}
                    onChange={this.onChangeCompanyName}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company NIP</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="companyNip"
                    value={this.state.companyNip}
                    onChange={this.onChangeCompanyNip}
                    validations={[required, vnip]}
                     pattern="^[0-9]{10}$"
                  
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="companyAddress"
                    value={this.state.companyAddress}
                    onChange={this.onChangeCompanyAddress}
                    validations={[required]}
                  />
                </div>
                


                <div className="form-group">
                  <button className="btn btn-primary btn-block">Register</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
      </div>
      
    );
  }
}
