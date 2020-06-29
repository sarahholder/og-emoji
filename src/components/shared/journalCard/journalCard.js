import React from 'react';
import { Link } from 'react-router-dom';

import journalEntryShape from '../../../helpers/propz/journalEntryShape';
import './JournalCard.scss';

class JournalCard extends React.Component {
  static propTypes = {
    journalEntry: journalEntryShape.journalEntryShape,
  }

  render() {
    const { journalEntry } = this.props;
    const singleLink = `/singleview/${journalEntry.id}`;
    return (
      <div className="card-group">
  <div className="journalPreviewCard">
    <div className="content">
      <div className="front" style={{ backgroundColor: journalEntry.statusColor }}>
      </div>
      <Link to={singleLink}>
      <div className="back">
        {journalEntry.date}
      </div>
      </Link>
    </div>
  </div>
  </div>
    );
  }
}

export default JournalCard;
