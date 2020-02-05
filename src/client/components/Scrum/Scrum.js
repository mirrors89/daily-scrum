import React, { Component } from 'react';

class Scrum extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    const { user } = this.props;

    return (
      <>
        <div className='border-styles'>
          <p>{user.username}</p>
          <p>1) 어제까지 한 일 {user.content1}</p>
          <p>2) 오늘 할 일 {user.content2}</p>
          <p>3. 일정 내 못 마칠 것 같은 일 {user.content3}</p>
        </div>
      </>
    )
  }
}

export default Scrum;