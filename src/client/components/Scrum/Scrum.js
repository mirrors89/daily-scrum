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
        <div className='border-styles'>
          <p>{user.username}</p>
          <div>
            <p>1) 어제까지 한 일 </p>
            <div>{user.content1}</div>
          </div>
          <div>
            <p>2) 오늘 할 일 </p>
            <div>{user.content2}</div>
          </div>
          <div>
            <p>3) 일정 내 못 마칠 것 같은 일</p>
            <div>{user.content3}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Scrum;