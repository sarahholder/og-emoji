import React from 'react';
import smashData from '../../../helpers/data/smashData';
import authData from '../../../helpers/data/authData';
import JournalView from '../../shared/JournalView/JournalView';

class Journal extends React.Component {
  state = {
    journals: [],
  }

  getCompleteJournal = () => {
    const uid = authData.getUid();
    smashData.getJournalsWithStatusId(uid)
      .then((journals) => this.setState({ journals }))
      .catch((err) => console.error('unable to get journals'));
  }

  componentDidMount() {
    this.getCompleteJournal();
  }

  render() {
    const { journals } = this.state;

    const buildJournalView = journals.map((journal) => (
      <JournalView key={journal.id} journalEntry={journal} />
    ));

    return (

      <div>
        <h2 className="m-4 text-center">Journal Overview</h2>
        {buildJournalView}
      </div>
    );
  }
}

export default Journal;
