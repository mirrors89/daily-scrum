import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../../util/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSignedIn: false,
      token: '',
      signInEmail: '',
      signInPassword: '',
      signInError: '',

      signUpEmail: '',
      signUpPassword: '',
      signUpUserName: '',
      signUpApiToken: '',
      signUpError: ''
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpApiToken = this.onTextboxChangeSignUpApiToken.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUserName: event.target.value
    });
  }
  onTextboxChangeSignUpApiToken(event) {
    this.setState({
      signUpApiToken: event.target.value
    });
  }

  onSignIn() {
    const {
      signInEmail,
      signInPassword
    } = this.state;

    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        setInStorage('daily_app', { token: json.token});

        this.setState({
          signInEmail: '',
          signInPassword: '',
          signInError: '',
          token: json.token,
        });
      }
      this.setState({
        signInError: json.message,
        isLoading: false
      });
    });
  }

  onSignUp() {
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

  logout() {
    this.setState({
      isLoading: true
    })

    const obj = getFromStorage('daily_app');
    if(obj && obj.token) {
      const { token } = obj;

      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token: '',
            isLoading: false
          })
        }
        this.setState({
          isLoading: false
        })
      });
    }
  }


  render() {
    const { 
      isLoading,
      token,
      signInEmail,
      signInPassword,
      signInError,

      signUpEmail,
      signUpPassword,
      signUpUserName,
      signUpApiToken,
      signUpError
    } = this.state;

    if(isLoading) {
      return (<> <p> Loading ... </p> </>);
    }

    if(!token) {
      return (
      <> 
        <div>
          {
            (signInError) ?  (
              <p>{signInError}</p>
            ) : ( null )
          }
          <p> Sign In </p>
          <input 
            type="email"
            placeholder="Email"
            value={signInEmail}
            onChange={this.onTextboxChangeSignInEmail} />
          <br />
          <input 
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword} />
          <br />
          <button onClick={this.onSignIn}>Sign In</button>
        </div>

        <br/><br/>

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
          <button onClick={this.onSignUp}>Sign Up</button>
        
        </div>
      </>);
    }

    return (
      <>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </>
    );
  }
}

export default Home;