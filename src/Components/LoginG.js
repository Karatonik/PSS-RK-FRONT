
import axios from 'axios';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';



const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class LoginGoogle extends Component {
    state = {
        errorMessage: '',
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: ''
    }
    
    handleResponse = (data) => {

        if (data.profileObj.email &&
            data.profileObj.googleId && 
            data.accessToken && 
            data.profileObj.familyName &&
            data.profileObj.givenName) {

                const body = {
                    email: data.profileObj.email,
                    password: data.accessToken,
                }

            axios.post('https://pssrk2021-api.herokuapp.com/api/auth/external/', body).then(
                res => {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    localStorage.setItem("status", JSON.stringify(res.data.status));
                    localStorage.setItem("id", JSON.stringify(res.data.id));
                    var s =localStorage.getItem('status');
                    if(s ==="true"){
                      console.log('login');
                        this.props.history.push("/profile");
                        window.location.reload();
                    }else{
                      alert('Konto jeszcze nie zostało aktywowane!Sprawdź swoją skrzyńkę pocztową!');
                    }
                    this.setState({
                        loggedIn: true
                         
                    });
                }
            ).catch(err => {
                // snackbar
                this.setState({ errorMessage: err.message })
            })

        } else {
            // snackbar
            this.setState({ errorMessage: "Logowanie za pomocą Facebook'a nie powiodło się." })
        }
    }

    responseGoogle = (response) => {
        console.log(response);
      }

    render() {
        let googleContent = null;

        if(localStorage.getItem('token')){
           
            return <Redirect to ={'/'}/>
        } else {
            googleContent = (<GoogleLogin
            clientId="903532834240-sdn4ijpr0cksjvv6k5n6hg0skef39d3c.apps.googleusercontent.com"
            buttonText="Zaloguj"
            onSuccess={this.handleResponse}
            onFailure={this.handleResponse}
            cookiePolicy={'single_host_origin'}
          />);
        }

        return (
            <div>
                <div>
                    {googleContent}
                </div>
            </div>
        );
    }
}