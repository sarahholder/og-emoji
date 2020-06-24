import React from 'react';
import moment from 'moment';

import './JournalEntry.scss';
import authData from '../../../helpers/data/authData';
import journalData from '../../../helpers/data/journalData';
import quoteData from '../../../helpers/data/quoteData';
import QuoteCard from '../../shared/QuoteCard/QuoteCard';
import statusData from '../../../helpers/data/statusData';

class JournalEntry extends React.Component {
  state = {
    date: '',
    status: '',
    comments: '',
    likeQuote: '',
    singleStatus: {},
    quotes: [],
  }

  getRandomQuote = () => {
    const thisId = this.props.match.params.statusId;
    quoteData.getRandomQuote(thisId)
      .then((quotes) => {
        this.setState({ quotes });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getRandomQuote();
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
      likeQuote: '',
      uid: authData.getUid(),
    };
    journalData.postEntry(newEntry)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('unable to save entry: ', err));
  }

  render() {
    const { singleStatus } = this.state;
    const { quotes } = this.state;
    const {
      comments,
      //  likeQuote,
    } = this.state;

    const buildQuotes = quotes.map((quote) => (
      <QuoteCard key={quote.id} quote={quote} />
    ));

    return (
      <div className="NewEntry">
      <div className="col-12">
      <h2>New Journal Entry: </h2>
      <h2> Feeling {singleStatus.name}</h2>
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
        <div className="d-flex flex-wrap">
          {buildQuotes}
        </div>
      </div>
      </div>
    );
  }
}

export default JournalEntry;
