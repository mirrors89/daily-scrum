import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import {
    getFromStorage
  } from '../../util/storage';
  
class Scrum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      selectContent: 1,
      content1: '',
      content2: '',
      content3: ''
    };
  }

  componentDidMount() {
    const obj = getFromStorage('daily_app');

    fetch('/api/jira/issue', {
      headers: {
        'Authorization': obj.token
      },
    })
    .then(res => res.json())
    .then(json => {
        this.setState({
            issues: json.issues
        })

    });

  }

  onTextAreaChangeContent1 = (event) => {
    this.setState({
      content1: event.target.value
    });
  }

  onTextAreaChangeContent2 = (event) => {
    this.setState({
      content2: event.target.value
    });
  }

  onTextAreaChangeContent3 = (event) => {
    this.setState({
      content3: event.target.value
    });
  }

  onClickTextAreaContent1 = () => {
    this.onClickTextAreaContent(1);
  }
  onClickTextAreaContent2 = () => {
    this.onClickTextAreaContent(2);
  }
  onClickTextAreaContent3 = () => {
    this.onClickTextAreaContent(3);
  }
  onClickTextAreaContent = (index) => {
    this.setState({
      selectContent: index
    });
  }

  onJiraInputSelectContent = (event, value) => {
    const { selectContent } = this.state

    switch(selectContent) {
      case 1:
        const { content1 } = this.state;
        if(content1) {
          value = "\n" + value;
        }
        this.setState({
          content1: content1 + value
        });
        break;
      case 2:
        const { content2 } = this.state;
        if(content2) {
          value = "\n" + value;
        }
        this.setState({
          content2: content2 + value
        });
        break;
      case 3:
        const { content3 } = this.state;
        if(content3) {
          value = "\n" + value;
        }
        this.setState({
          content3: content3 + value
        });
        break;
      default:
        break;
    }

  }

  render() {
    const {
        issues,
        content1,
        content2,
        content3
    } = this.state;

    const list = issues.map(
        data => {
          const value = data.key + ' ' + data.title;
          return (<p key={data.key} value={value} onClick={(e) => this.onJiraInputSelectContent(e, value)}>{data.key} {data.title} : {data.storyPoint}</p>)
        }
    );

    return (
      <div style={{flex: 1}}>
        <div>
            {list}
        </div>

        <div>
        ========================
        </div>

        <div>
          <div>
            <p>1) 어제까지 한 일</p>
            <textarea
            cols={40} rows={6}
            value={content1}
            onClick={this.onClickTextAreaContent1}
            onChange={this.onTextAreaChangeContent1} />
          </div>
          <div>
            <p>2) 오늘 할 일</p>
            <textarea
            cols={40} rows={6}
            value={content2}
            onClick={this.onClickTextAreaContent2}
            onChange={this.onTextAreaChangeContent2} />
          </div>
          <div>
            <p>3) 일정 내 못 마칠 것 같은 일</p>
            <textarea
            cols={40} rows={6}
            value={content3}
            onClick={this.onClickTextAreaContent3}
            onChange={this.onTextAreaChangeContent3} />
          </div>
        </div>
      </div>
    )
  }
}

export default Scrum;