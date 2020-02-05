import React, { Component } from 'react';

import {
    getFromStorage
  } from '../../util/storage';
  
class Scrum extends Component {
  constructor(props) {
    super(props);

    this.state = {
        issues: []
    };
  }

  componentDidMount() {
    const obj = getFromStorage('daily_app');

    fetch('/api/jira/issue?token=' + obj.token)
    .then(res => res.json())
    .then(json => {
        this.setState({
            issues: json.issues
        })

    });

  }

  render() {
    const {
        issues
    } = this.state;

    const list = issues.map(
        data => (<p>{data.key} {data.title} : {data.storyPoint}</p>)
    );

    return (
        <div style={{flex: 1}}>
            jira 들어갈곳
            {list}
        </div>
    )
  }
}

export default Scrum;