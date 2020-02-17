import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

import SignIn from './SignIn';
import ScrumBoard from '../Scrum/ScrumBoard';

import {
  getFromStorage
} from '../../util/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
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

  setToken = (token) => {
    this.setState({
      token: token
    });
  }

  logout = () => {
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
      token
    } = this.state;

    if(isLoading) {
      return (<> <p> Loading ... </p> </>);
    }

    if(!token) {
      return (
      <> 
        <div className="login-form">
          <SignIn onSubmit={this.setToken} />
          <Link to="/signup">
            <button className="btn btn-ivory">Sign Up</button>
          </Link>
        </div>
      </>);
    }

    return (
      <div className="main-section" style={{display: 'flex'}}>
        <ScrumBoard />
      </div>
    );
  }
}

export default Home;