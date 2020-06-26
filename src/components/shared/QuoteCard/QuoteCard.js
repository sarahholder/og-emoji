import React from 'react';

import quoteShape from '../../../helpers/propz/quoteShape';
import './QuoteCard.scss';

class QuoteCard extends React.Component {
  static propTypes = {
    quote: quoteShape.quoteShape,
  }

  state = {
    likeQuote1: '',
    likeQuote2: '',
  }

  quoteChange = (e) => {
    const { likeQuote1 } = this.state;
    const { likeQuote2 } = this.state;
    console.error('this is e', e.target.checked);
    if (e.target.checked) {
      if (likeQuote1 === '' && likeQuote2 === '') {
        this.setState({ likeQuote1: e.target.value });
      } else if (likeQuote1 === '' && likeQuote2 !== e.target.value) {
        this.setState({ likeQuote1: e.target.value });
      } else if (likeQuote2 === '' && likeQuote1 !== e.target.value) {
        this.setState({ likeQuote2: e.target.value });
      } else {
        if (e.target.value === likeQuote1) {
          this.setState({ likeQuote1: '' });
        }
        this.setState({ likeQuote2: '' });
      }
    }
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
              value={quote.id}
              className="css-checkbox"
              onChange= {this.quoteChange}
              />
              <label htmlFor={quote.id} className="css-label"></label>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteCard;
