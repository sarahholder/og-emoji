import React from 'react';
import journalData from '../../../helpers/data/journalData';
import quoteData from '../../../helpers/data/quoteData';
import QuoteCard from '../../shared/QuoteCard/QuoteCard';
import statusData from '../../../helpers/data/statusData';

import './SingleView.scss';

class SingleView extends React.Component {
  state = {
    quotes: [],
    journalEntry: {},
    status: '',
    likeQuote: '',
    quoteSelected: false,
  }

  getCompleteJournal = () => {
    let journal = '';
    const { journalId } = this.props.match.params;
    journalData.getSingleEntry(journalId)
      .then((response) => {
        journal = response.data;
        const statusId = response.data.status;
        if (journal.likeQuote === '') {
          this.getRandomQuote(statusId);
        } else {
          this.setState({ quoteSelected: true });
          quoteData.getQuoteByQuoteId(journal.likeQuote)
            .then((resp) => {
              const singleQuote = resp.data;
              singleQuote.id = journal.likeQuote;
              this.setState({ quotes: [singleQuote] });
            });
        }
        statusData.getSingleStatus(statusId)
          .then((status) => {
            journal.statusName = status.data.name;
            journal.statusColor = status.data.color;
            journal.statusEmoji = status.data.emoji;
            this.setState({ journalEntry: journal });
          });
      })
      .catch((err) => console.error('unable to get journal: ', err));
  }

  componentDidMount() {
    this.getCompleteJournal();
  }

  getRandomQuote = (status) => {
    quoteData.getRandomQuote(status)
      .then((quotes) => {
        this.setState({ quotes });
      })
      .catch((err) => console.error('Unable to get quotes: ', err));
  }

  render() {
    const {
      quotes,
      journalEntry,
      likeQuote,
      quoteSelected,
    } = this.state;

    const buildQuotes = quotes.map((quote) => (
      <QuoteCard key={quote.id} quote={quote} likeQuote={likeQuote} quoteSelected={quoteSelected} getCompleteJournal={this.getCompleteJournal}/>
    ));

    return (
            <div className="d-flex flex-wrap justify-content-center text-center m-2 pb-2 align-content-middle" style={{ backgroundColor: journalEntry.statusColor }}>
              <h2 className="m-4 col-12">Previous Journal Entry:</h2>
              <div className="col-2"><img className="emojiIcon" src={journalEntry.statusEmoji} alt={journalEntry.name}/></div>
            <div className="col-8 text-left">
            <h3>{journalEntry.date}</h3>
            <p>{journalEntry.comments}</p>
            </div>
            {buildQuotes}
          </div>
    );
  }
}

export default SingleView;
