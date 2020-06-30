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
  }

  componentDidMount() {
    let journal = '';
    const { journalId } = this.props.match.params;
    journalData.getSingleEntry(journalId)
      .then((response) => {
        journal = response.data;
        const statusId = response.data.status;
        console.error('THIS IS THE ONE', statusId);
        if (journal.likeQuote === '') {
          this.getRandomQuote(statusId);
        } else {
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
            journal.statuscolor = status.data.color;
            journal.statusEmoji = status.data.emoji;
            this.setState({ journalEntry: journal });
          });
      })
      .catch((err) => console.error('unable to get journal: ', err));
  }

  getRandomQuote = (status) => {
    console.error('this is the status', status);
    quoteData.getRandomQuote(status)
      .then((quotes) => {
        console.error('this is the quotes ', quotes);
        this.setState({ quotes });
      })
      .catch((err) => console.error('Unable to get quotes: ', err));
  }

  render() {
    const { quotes } = this.state;
    const { journalEntry } = this.state;
    const { likeQuote } = this.state;
    console.error('this is the journal entry', journalEntry);

    const buildQuotes = quotes.map((quote) => (
      <QuoteCard key={quote.id} quote={quote} likeQuote={likeQuote}/>
    ));

    return (
            <div className="d-flex flex-wrap justify-content-center">
            <div>
            <img className="emojiIcon" src={journalEntry.statusEmoji} alt={journalEntry.name}/>
            </div>
            <div>
            <h2>{journalEntry.date}</h2>
            <p>{journalEntry.comments}</p>
            </div>
           {buildQuotes}
          </div>
    );
  }
}

export default SingleView;
