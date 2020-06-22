import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import journalEntryShape from '../../../helpers/propz/journalEntryShape';

class JournalCard extends React.Component {
  static propTypes = {
    journalEntry: journalEntryShape.journalEntryShape,
  }

  render() {
    const { journalEntry } = this.props;
    const singleLink = `/journalentry/${journalEntry.id}`;

    return (
      <div className="col-3">
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
