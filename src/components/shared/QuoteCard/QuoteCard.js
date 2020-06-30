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
      .then(() => console.error('it worked'))
      .catch((err) => console.error(err));

    // const { likeQuote1 } = this.state;
    // const { likeQuote2 } = this.state;
    // console.error('this is e', e.target.checked);
    // if (e.target.checked) {
    //   if (likeQuote1 === '' && likeQuote2 === '') {
    //     this.setState({ likeQuote1: e.target.value });
    //   } else if (likeQuote1 === '' && likeQuote2 !== e.target.value) {
    //     this.setState({ likeQuote1: e.target.value });
    //   } else if (likeQuote2 === '' && likeQuote1 !== e.target.value) {
    //     this.setState({ likeQuote2: e.target.value });
    //   } else {
    //     if (e.target.value === likeQuote1) {
    //       this.setState({ likeQuote1: '' });
    //     }
    //     this.setState({ likeQuote2: '' });
    //   }
    // }
  }

  render() {
    const { quote } = this.props;
    return (
      <div className="col-6">
         <div className="card d-flex flex-wrap jusitfy-content-center align-content-center p-3">
            {quote.quote}
            <p className="text-right m-0">~ {quote.author}</p>
              <input
              type="checkbox"
              name={quote.id}
              id={quote.id}
              value={quote.id}
              className="css-checkbox m-0"
              onChange= {this.quoteChange}
              />
              <label htmlFor={quote.id} className="css-label m-0"></label>
          </div>
        </div>
    );
  }
}

export default withRouter(QuoteCard);
