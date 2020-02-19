import React, { Component } from 'react';
import Scrum from './Scrum';
import ScrumJira from './ScrumJira';

import {
  getDate,
} from '../../util/date';


class ScrumBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrumBoard: null,
      users: [],
      scrum: [],
      usersReady: false,
      scrumReady: false,
      showContent1: true,
      showContent2: true,
      showContent3: true
    };
  }

  async componentDidMount() {
    this.getUsers();
    this.getScrumBoard();
  }

   getScrumBoard = async () => {
    await fetch('/api/scrum/board?date=' + getDate())
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        this.setState({
          scrumBoard: json.scrumBoard
        });
      } else {
        fetch('/api/scrum/board', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: getDate()
          })
        })
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            this.setState({
              scrumBoard: json.scrumBoard
            });
          }
        });
      }
    });
    this.getScrum();

  }

  getUsers = () => {
    fetch('/api/user/list')
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        this.setState({
          users: json.users,
          usersReady: true
        });
      }
    });
  }

  getScrum = () => {
    const {
      scrumBoard
    } = this.state;

    fetch('/api/scrum/list?scrumBoardId=' + scrumBoard._id)
    .then(res => res.json())
    .then(json => {
      this.setState({
        scrum: json.scrums,
        scrumReady: true
      });
    });
  }

  toggleContent1 = () => {
    let { showContent1 } = this.state;
    this.setState({
      showContent1: !showContent1
    })
  }
  toggleContent2 = () => {
    let { showContent2 } = this.state;
    this.setState({
      showContent2: !showContent2
    })
  }
  toggleContent3 = () => {
    let { showContent3 } = this.state;
    this.setState({
      showContent3: !showContent3
    })
  }

  render() {
    const { 
      scrumBoard,
      users,
      scrum,
      usersReady,
      scrumReady,
      showContent1,
      showContent2,
      showContent3
    } = this.state;

    users.forEach(user => {
      scrum.forEach(doc => {
        if(user._id == doc.userId) {
          user.content1 = doc.content1;
          user.content2 = doc.content2;
          user.content3 = doc.content3;
        }
      })
    });

    if(usersReady && scrumReady) {
      const notWriteScrumUsers = users
                                  .filter(user => !(user.content1 || user.content2 || user.content3))
                                  .map(user => user.username)
                                  .join(", ");

      const scrumList = users.map(
        user => (<Scrum key={user._id} user={user} 
          showContent1={showContent1} showContent2={showContent2} showContent3={showContent3}/>)
      );

      if(scrumBoard) {
        return (
          <>
            <section className="scrum-board">
              <div className="scrum-date">{scrumBoard.date}</div>
              <p className="nonScrum-member">미작성 인원: {notWriteScrumUsers}</p>
              <nav>
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li className="navi"><a onClick={this.toggleContent1}>1) 어제까지 한 일</a></li>
                      <li className="navi"><a onClick={this.toggleContent2}>2) 오늘 할 일</a></li>
                      <li className="navi"><a onClick={this.toggleContent3}>3) 일정 내 못 마칠 것 같은 일</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="pinterest-layout">{scrumList}</div>
            </section>
            <ScrumJira scrumBoard={scrumBoard} />
          </>
        )
      }
  }

  return (
    <>
    </>
  )
  }
}

export default ScrumBoard;