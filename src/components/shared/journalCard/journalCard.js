import React from 'react';
import { Link } from 'react-router-dom';

import journalEntryShape from '../../../helpers/propz/journalEntryShape';
import './JournalCard.scss';

class JournalCard extends React.Component {
  static propTypes = {
    journalEntry: journalEntryShape.entryShape,
  }

  render() {
    const { journalEntry } = this.props;
    const singleLink = `/singleview/${journalEntry.id}`;
    const { status } = this.props;
    console.error('this is the status info', status);

    return (
      <div className="cardWidth m-1">
        <div className="card journalCard">
          <div className="card-body p-1">
            <h5 className="card-title">{journalEntry.date}</h5>
            <Link className="btn btn-info" to={singleLink}><i className="fas fa-binoculars"></i></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default JournalCard;
