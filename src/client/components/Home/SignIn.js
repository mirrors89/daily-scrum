import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  setInStorage
} from '../../util/storage';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signInEmail: '',
      signInPassword: '',
      signInError: '',
    };
  }

  componentDidMount() {
  }

  onTextboxChangeSignInEmail = (event) => {
    this.setState({
      signInEmail: event.target.value
    });
  }
  onTextboxChangeSignInPassword = (event) => {
    this.setState({
      signInPassword: event.target.value
    });
  }
  onSignInByEnterKey = (event) => {
    if (event.key === 'Enter') {
      this.onSignIn();
    }
  }

  onSignIn = () => {
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
        this._onSubmit(json.token);
      } else {
        this.setState({
            signInError: json.message
        });
      }
    });
  }

  _onSubmit = e => {
    this.props.onSubmit(e);
  };

  render() {
    const {
      signInEmail,
      signInPassword,
      signInError
    } = this.state;

    return (
      <> 
        <div>
          {
            (signInError) ?  (
              <p>{signInError}</p>
            ) : ( null )
          }

          <p className="title"> Sign In </p>
          <div className="input-sign-form">
            <input 
              type="email"
              placeholder="Email"
              value={signInEmail}
              onKeyDown={this.onSignInByEnterKey}
              onChange={this.onTextboxChangeSignInEmail} />
          </div>
          <div className="input-sign-form">
            <input 
              type="password"
              placeholder="Password"
              value={signInPassword}
              onKeyDown={this.onSignInByEnterKey}
              onChange={this.onTextboxChangeSignInPassword} />
          </div>
          <button className="btn btn-ivory" onClick={this.onSignIn}>Sign In</button>
        </div>

      </>);
  }
}

export default SignIn;