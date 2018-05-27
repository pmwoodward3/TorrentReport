import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/fontawesome-free-solid';

// import { Link } from 'react-router-dom';
import data from './data';
import './style.scss';

const hiddenAnswers = () => {
  const stateObj = {};
  data.forEach((faq) => {
    stateObj[faq.question] = false;
  });
  return stateObj;
};

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = hiddenAnswers();
  }
  toggleQuestion = (question) => {
    const updateObj = {};
    updateObj[question] = !this.state[question];
    this.setState(updateObj);
  };
  render() {
    return (
      <div>
        <h1>Frequently Asked Questions</h1>
        {data.map(faq => (
          <div key={`FAQ-${faq.question}`}>
            <div className="faq-flex-row" onClick={() => this.toggleQuestion(faq.question)}>
              <div>
                <FontAwesomeIcon
                  className="faq-icon"
                  icon={this.state[faq.question] ? faMinus : faPlus}
                />
              </div>
              <h4 className="faq-question">{faq.question}</h4>
            </div>
            {this.state[faq.question] && (
              <ReactMarkdown className="faq-answer" source={faq.answer} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default FAQ;
