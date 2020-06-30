import React from 'react';
import { Link } from 'react-router-dom';

import journalEntryShape from '../../../helpers/propz/journalEntryShape';
// import JournalEntry from '../../pages/JournalEntry/JournalEntry';

class JournalView extends React.Component {
  static propTypes = {
    journalEntry: journalEntryShape.journalEntryShape,
  }

  render() {
    const { journalEntry } = this.props;
    const journalId = journalEntry.id;
    const singleLink = `/singleview/${journalId}`;

    return (
  <div >
    <div class="list-group" >
  <Link to={singleLink} style={{ backgroundColor: journalEntry.statusColor }} class="list-group-item list-group-item-action flex-column align-items-start active">
    <div class="d-flex w-100 justify-content-between" >
      <h5 class="mb-1">{journalEntry.date}</h5>
      <small><img className="smallEmoji" src={journalEntry.statusEmoji} alt={journalEntry.statusName}/></small>
    </div>
    <p class="mb-1">{journalEntry.comments}</p>
    <small></small>
  </Link>
      {/* <Link to={singleLink}>
      <div className="back">
        {journalEntry.date}
      </div>
      </Link> */}
    </div>
    </div>
    );
  }
}

export default JournalView;
