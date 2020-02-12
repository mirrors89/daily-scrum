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
          <button className="btn btn-ivory" onClick={this.onSignIn}>Sign In</button>
        </div>

      </>);
  }
}

export default SignIn;