import React from 'react';
import moment from 'moment';

import './JournalEntry.scss';
import authData from '../../../helpers/data/authData';
import journalData from '../../../helpers/data/journalData';

class JournalEntry extends React.Component {
  state = {
    date: '',
    status: '',
    comments: '',
    likeQuote: '',
  }

  commentsChange = (e) => {
    e.preventDefault();
    this.setState({ comments: e.target.value });
  }

  saveEntry = (e) => {
    e.preventDefault();
    const thisId = this.props.match.params.statusId;

    const {
      comments,
    } = this.state;

    const newEntry = {
      date: moment().format('dddd, MMMM Do YYYY'),
      comments,
      status: thisId,
      likeQuote: '',
      uid: authData.getUid(),
    };
    journalData.postEntry(newEntry)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('unable to save entry: ', err));
  }

  render() {
    const {
      comments,
      //  likeQuote,
    } = this.state;

    return (
      <div className="NewEntry">
      <div className="col-12">
      <h2>New Journal Entry</h2>
        <form className="text-left">
          <div className="form-group">
            <label htmlFor="entry-comments"></label>
            <input
            type="text"
            className="form-control comments"
            id="entry-comments"
            value={comments}
            placeholder="enter you thoughts about today here"
            onChange={this.commentsChange}
            />
          </div>
          <button className="btn btn-primary" onClick={this.saveEntry}>Save</button>
        </form>
      </div>
      </div>
    );
  }
}

export default JournalEntry;
