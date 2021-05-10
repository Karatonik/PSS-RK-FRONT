
import axios from 'axios';
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
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



export default class LoginFb extends Component {
    state = {
        errorMessage: '',
        isLoggedIn: false,
        userId: '',
        name: '',
        lastName:'',
        email: '',
        picture: ''
    }
    handleResponse = (data) => {

        if (data.email && data.userID && data.accessToken && data.name) {

            const body = {
                name: data.name.split(" ")[1],
                last: data.name.split(" ")[2],
                email:  data.email,
                password: data.accessToken
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
