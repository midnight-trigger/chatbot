import React from 'react';
import './assets/styles/style.css'
import { Answers, Chats, FormDialog } from './components';
import {db} from './firebase/index.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: {},
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question"
    });
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    });
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === "init"):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      case (nextQuestionId === "contact"):
        this.handleClickOpen();
        break;
      default:
        const chats = this.state.chats
        chats.push({
          text: selectedAnswer,
          type: "answer"
        });
        this.setState({
          chats: chats
        });
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
    }
  }

  initDataset = dataset => {
    this.setState({
      dataset: dataset
    });
  }

  componentDidMount() {
    (async() => {
      const dataset = this.state.dataset;
      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          dataset[id] = data;
        });
      });
      this.initDataset(dataset);
      this.selectAnswer("", "init");
    })();
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById("scroll-area")
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats} />
            <Answers answers={this.state.answers} select={this.selectAnswer} />
            <FormDialog open={this.state.open} handleClose={this.handleClose} />
          </div>
        </section>
      </div>
    );
  }
}
