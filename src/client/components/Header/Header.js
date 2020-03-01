import React, { Component } from 'react';

import {
  getFromStorage,
  removeFromStorage
} from '../../util/storage';

class Header extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    const obj = getFromStorage('daily_app');
    if(obj && obj.token) {
      const { token } = obj;

      if(token) {
        this.setState({
          isLogin: true
        })
      }
    }
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

        removeFromStorage('daily_app');
        location.href = "/";
      });
    }
  }

  render() {
    const { isLogin } = this.state;

    return (
      <header className="header">
        <div>
          <h1>
            <a className="" href="/">혹시 스크럼 안쓰신분?</a>
          </h1>
        </div>
        {isLogin && 
        <div>
          <button id="logout" className="btn btn-ivory" onClick={this.logout}>logout</button>
        </div>
        }

      </header>
    )
  }
};

export default Header;