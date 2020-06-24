import React from 'react';

import quoteShape from '../../../helpers/propz/quoteShape';
import './QuoteCard.scss';

class QuoteCard extends React.Component {
  static propTypes = {
    quote: quoteShape.quoteShape,
  }

  render() {
    const { quote } = this.props;
    return (
      <div className="col-6">
         <div className="card">
          <div className="card-body">
            <p>{quote.quote}</p>
            <p className="text-right">~ {quote.author}</p>
              <input
              type="checkbox"
              name={quote.id}
              id={quote.id}
              className="css-checkbox"
              />
              <label htmlFor={quote.id} className="css-label"></label>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteCard;
