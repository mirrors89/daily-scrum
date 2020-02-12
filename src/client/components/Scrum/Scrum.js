import React, { Component } from 'react';

class Scrum extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { user } = this.props;
    const scrum =  user.scrum

    return (
      <>
        <article className="daily-scrum-wrapper">
          <p className="member-name">{user.username}</p>
          <div>
            <p className="scrum-board-title">1) 어제까지 한 일 </p>
            <div className="scrum-content">{user.content1 || '-'}</div>
          </div>
          <div>
            <p className="scrum-board-title">2) 오늘 할 일 </p>
            <div className="scrum-content">{user.content2 || '-'}</div>
          </div>
          <div>
            <p className="scrum-board-title">3) 일정 내 못 마칠 것 같은 일</p>
            <div className="scrum-content">{user.content3 || '-'}</div>
          </div>
        </article>
      </>
    )
  }
}

export default Scrum;