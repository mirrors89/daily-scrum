import React, { Component } from 'react';
import { Redirect } from 'react-router'
import 'whatwg-fetch';

import {
    getFromStorage,
} from '../../util/storage';

class SignUp extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          token: '',
          signUpEmail: '',
          signUpPassword: '',
          signUpUserName: '',
          signUpApiToken: '',
          signUpError: ''
        };
    }

    componentDidMount() {
        const obj = getFromStorage('daily_app');
        if(obj && obj.token) {
          const { token } = obj;
    
          fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
              if(json.success) {
                 this.setState({
                   token: token,
                   isLoading: false
                 });
              } else {
                this.setState({
                  isLoading: false
                });
              }
            });
    
        } else {
          this.setState({
            isLoading: false
          });
        }
      }


      onSignUp = () => {
        const {
          signUpEmail,
          signUpPassword,
          signUpUserName,
          signUpApiToken
        } = this.state;
    
        fetch('/api/account/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: signUpEmail,
            password: signUpPassword,
            username: signUpUserName,
            apiToken: signUpApiToken
          })
        })
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            this.setState({
              signUpEmail: '',
              signUpPassword: '',
              signUpUserName: '',
              signUpApiToken: ''
            })
          }
          this.setState({
            signUpError: json.message,
            isLoading: false
          })
        });
      }

  onTextboxChangeSignUpEmail = (event) => {
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onTextboxChangeSignUpPassword = (event) => {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onTextboxChangeSignUpUsername = (event) =>  {
    this.setState({
      signUpUserName: event.target.value
    });
  }
  onTextboxChangeSignUpApiToken = (event) =>  {
    this.setState({
      signUpApiToken: event.target.value
    });
  }

  render() {
    const { 
        isLoading,
        token,
        signUpError,
        signUpEmail,
        signUpPassword,
        signUpUserName,
        signUpApiToken
    } = this.state;

    if(isLoading) {
        return (<> <p> Loading ... </p> </>);
    }

    if(token) {
        return <Redirect to='/'/>;
    }

    return (
    <>
        <div>
            {
            (signUpError) ?  (
                <p>{signUpError}</p>
            ) : ( null )
            }
            <p> Sign Up </p>
            <input
            type="email"
            placeholder="Email"
            value={signUpEmail}
            onChange={this.onTextboxChangeSignUpEmail} />
            <br />
            <input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={this.onTextboxChangeSignUpPassword} />
            <br />
            <input
            type="text"
            placeholder="이름"
            value={signUpUserName}
            onChange={this.onTextboxChangeSignUpUsername} />
            <br />
            <input
            type="text"
            placeholder="API token"
            value={signUpApiToken}
            onChange={this.onTextboxChangeSignUpApiToken} />
            <br />
            <button className="btn btn-ivory" onClick={this.onSignUp}>Sign Up</button>
        </div>
    </>)
  }
}

export default SignUp;