import React from 'react';
import moment from 'moment';

import './JournalEntry.scss';
import authData from '../../../helpers/data/authData';
import journalData from '../../../helpers/data/journalData';
import statusData from '../../../helpers/data/statusData';

class JournalEntry extends React.Component {
  state = {
    date: '',
    status: '',
    comments: '',
    singleStatus: {},
  }

  componentDidMount() {
    const thisStatusId = this.props.match.params.statusId;
    statusData.getSingleStatus(thisStatusId)
      .then((response) => {
        const singleStatus = response.data;
        this.setState({ singleStatus });
      })
      .catch((err) => console.error('unable to get status info; ', err));
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
      date: moment().format('MM/DD/YYYY'),
      comments,
      status: thisId,
      uid: authData.getUid(),
      likeQuote: '',
    };
    journalData.postEntry(newEntry)
      .then((response) => this.props.history.push(`/singleview/${response.data.name}`))
      .catch((err) => console.error('unable to save entry: ', err));
  }

  render() {
    const { singleStatus } = this.state;
    const {
      comments,
    } = this.state;

    return (
      <div className="container">
          <h2 className="p-4 text-left">Journal Entry: </h2>
          <div>
          <div className="container d-flex fles-wrap justify-content-center">
            <div className="col-2">
                <img className="emojiEntry" src={singleStatus.emoji} alt="emoji of feeling"/>
            </div>
            <form className="text-left col-12">
              <div className="form-group">
                  <label htmlFor="entry-comments"></label>
                  <textarea
                  type="input"
                  className="form-control"
                  id="entry-comments"
                  value={comments}
                  placeholder="enter you thoughts about today here"
                  onChange={this.commentsChange}
                  ></textarea>
              </div>
            </form>
            </div>
            <div className="row justify-content-center">
              <button className="btn btn-info offset-11 col-1" onClick={this.saveEntry}>Save</button>
            </div>
            </div>
            </div>
    );
  }
}

export default JournalEntry;
