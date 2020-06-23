import React from 'react';
import { Link } from 'react-router-dom';

import journalEntryShape from '../../../helpers/propz/journalEntryShape';

class JournalCard extends React.Component {
  static propTypes = {
    journalEntry: journalEntryShape.entryShape,
  }

  render() {
    const { journalEntry } = this.props;
    const singleLink = `/singleview/${journalEntry.id}`;

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{journalEntry.date}</h5>
            <Link className="btn btn-info" to={singleLink}><i className="fas fa-binoculars"></i></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default JournalCard;