import React, { Component } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import {
    getFromStorage
  } from '../../util/storage';
  
class Scrum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrumBoard: props.scrumBoard,
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

  onPostScrum = () => {
    const obj = getFromStorage('daily_app');
    const {
      scrumBoard,
      content1,
      content2,
      content3,
    } = this.state;

    fetch('/api/scrum', {
      method: 'POST',
      headers: {
        'Authorization': obj.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scrumBoardId: scrumBoard._id,
        content1: content1,
        content2: content2,
        content3: content3
      })
    })
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        MySwal.fire({
          title: <p>저장되었습니다.</p>,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          onClose: () => {
            location.reload();
          }
        })
      }
    });
  }


  render() {
    const {
        issues,
        selectContent,
        content1,
        content2,
        content3
    } = this.state;

    const list = issues.map(
        data => {
          const value = data.key + ' ' + data.title;
          return (<li className="jira-list" key={data.key} 
                    value={value} 
                    onClick={(e) => this.onJiraInputSelectContent(e, value)}>
                      {data.key} {data.title} : {data.storyPoint}
                  </li>)
        }
    );

    return (
      <section className="scrum-jira">
        <ul className="jira-list-wrapper">
            {list}
        </ul>

        <div className="scrum-work-title">
        {selectContent === 1 ? "어제까지 한 일" : ""}
        {selectContent === 2 ? "오늘 할 일" : ""}
        {selectContent === 3 ? "일정 내 못 마칠 것 같은 일" : ""}
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
          <button className="btn btn-ivory" onClick={this.onPostScrum}>저장하기</button>
        </div>
      </section>
    )
  }
}

export default Scrum;