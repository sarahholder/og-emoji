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
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('unable to save entry: ', err));
  }

  render() {
    const { singleStatus } = this.state;
    const {
      comments,
    } = this.state;

    return (
      <div>
        <div>
          <h2>Journal Entry: </h2>
          <div className="d-flex flex-wrap align-content-center row journalWidth">
            <div>
              <img className="emojiEntry" src={singleStatus.emoji} alt="emoji of feeling"/>
            </div>
            <form className="text-left">
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
        </div>
          <div>
            <button className="btn btn-primary" onClick={this.saveEntry}>Save</button>
          </div>
          <div>
            <div className="d-flex flex-wrap">
          </div>
        </div>
      </div>
    );
  }
}

export default JournalEntry;
