import React, { Component } from 'react';
import Scrum from './Scrum';

import {
  getDate,
} from '../../util/date';


class ScrumBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrumBoard: null,
      users: [],
      scrum: []
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getScrumBoard();
    
    const {
      scrumBoard
    } = this.state;

    
    fetch('/api/scrum/list?scrumBoardId=' + scrumBoard)
    .then(res => res.json())
    .then(json => {
      this.setState({
        scrum: json.scrums
      });
    });

    
  }

  getScrumBoard = () => {
    fetch('/api/scrum/board?date=' + getDate())
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
  }

  getUsers = () => {
    fetch('/api/user/list')
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        this.setState({
          users: json.users
        });
      }
    });
  }

  render() {
    const { 
      scrumBoard,
      users,
      scrum
    } = this.state;

    users.forEach(user => {
      scrum.forEach(doc => {
        if(user.id == doc.userId) {
          user.scrum = doc;
        }
      })
    });


    if(users.length > 0) {
      console.log(users);

      const list = users.map(
        data => (<Scrum key={data._id} user={data}/>)
      );

      if(scrumBoard) {
        return (
          <div style={{flex: 2}}>
            <div>{scrumBoard.date}</div>
            <div>{list}</div>
          </div>
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