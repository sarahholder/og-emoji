import React from 'react';

import authData from '../../../helpers/data/authData';
import journalData from '../../../helpers/data/journalData';
import JournalCard from '../../shared/JournalCard/JournalCard';

class Home extends React.Component {
  state = {
    journals: [],
  }

  getJournals = () => {
    const uid = authData.getUid();
    journalData.getJournalsByUid(uid)
      .then((journals) => this.setState({ journals }))
      .catch((err) => console.error('unable to get journals: ', err));
  }

  componentDidMount() {
    this.getJournals();
  }

  render() {
    const { journals } = this.state;
    const buildJournalCards = journals.map((journal) => (
      <JournalCard key={journal.id} journalEntry={journal} />
    ));

    return (
     <div>
     <h1>Home</h1>
     <div className="card-group">
     {buildJournalCards}
     </div>
     </div>
    );
  }
}

export default Home;
