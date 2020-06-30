import React from 'react';
import { withRouter } from 'react-router-dom';

import quoteShape from '../../../helpers/propz/quoteShape';
import journalData from '../../../helpers/data/journalData';

import './QuoteCard.scss';

class QuoteCard extends React.Component {
  static propTypes = {
    quote: quoteShape.quoteShape,
  }

  state = {
    likeQuote: '',
  }

  quoteChange = (e) => {
    console.error(e.target.id);
    const { journalId } = this.props.match.params;
    const quoteId = e.target.id;
    journalData.updateLikeQuote(journalId, quoteId)
      .then(() => this.props.getCompleteJournal())
      .catch((err) => console.error(err));
  }

  render() {
    const { quote, quoteSelected } = this.props;
    const buildCheckbox = () => {
      if (quoteSelected === false) {
        return (
          <React.Fragment>
               <input
              type="checkbox"
              name={quote.id}
              id={quote.id}
              value={quote.id}
              className="css-checkbox m-0"
              onChange= {this.quoteChange}
              />
              <label htmlFor={quote.id} className="css-label m-0"></label>
          </React.Fragment>
        );
      }
      return '';
    };
    return (
      <div className="col-6">
         <div className="card d-flex flex-wrap jusitfy-content-center align-content-center p-3">
            {quote.quote}
            <p className="text-right m-0">~ {quote.author}</p>
            { buildCheckbox() }
          </div>
        </div>
    );
  }
}

export default withRouter(QuoteCard);
