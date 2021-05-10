
import axios from 'axios';
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router-dom';
export default class LoginFb extends Component {
    state = {
        errorMessage: '',
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: ''
    }
    handleResponse = (data) => {

        if (data.email && data.userID && data.accessToken && data.name) {

            const body = {
                email: data.userID + data.email,
                password: data.accessToken,
                nick: data.name
            }

            axios.post('http://localhost:8080/api/auth/external/', body).then(
                res => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('email', res.data.email);       
                    localStorage.setItem('nick',res.data.nick);
                    this.setState({
                        loggedIn: true
                    });
                    
                    window.location.reload();
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

    render() {
        let fbContent = null;

        if(localStorage.getItem('token')){
           
               return <Redirect to ={'/'}/>
               
              
        } else {
            fbContent = (<FacebookLogin
                appId="334011424722948"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.handleResponse}
                icon="fa-facebook"
                textButton='zaloguj'
                size='small'
            />);
        }

        return (
            <div>
                <div>
                    {fbContent}
                </div>
            </div>
        );
    }
} 
