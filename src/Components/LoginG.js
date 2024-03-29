
import axios from 'axios';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

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

            axios.post('https://pssrk2021-api.herokuapp.com/auth/external/', body).then(
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
            clientId="674430789110-38vkhnf8pr5mo1dh8slita5phh28fnga.apps.googleusercontent.com"
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