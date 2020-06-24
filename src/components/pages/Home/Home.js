import React from 'react';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import GoalsCard from '../../shared/GoalsCard/GoalsCard';
import goalsData from '../../../helpers/data/goalsData';
import journalData from '../../../helpers/data/journalData';
import JournalCard from '../../shared/JournalCard/JournalCard';
import statusData from '../../../helpers/data/statusData';
import StatusCard from '../../shared/StatusCard/StatusCard';

class Home extends React.Component {
  state = {
    journals: [],
    goals: [],
    status: [],
  }

  getGoals = () => {
    const uid = authData.getUid();
    goalsData.getGoalsByUid(uid)
      .then((goals) => this.setState({ goals }))
      .catch((err) => console.error('unable to get goals: ', err));
  }

  getJournals = () => {
    const uid = authData.getUid();
    journalData.getJournalsByUid(uid)
      .then((journals) => this.setState({ journals }))
      .catch((err) => console.error('unable to get journals: ', err));
  }

  getStatuses = () => {
    statusData.getStatus()
      .then((status) => this.setState({ status }))
      .catch((err) => console.error('unable to get status: ', err));
  }

  componentDidMount() {
    this.getJournals();
    this.getGoals();
    this.getStatuses();
  }

  render() {
    const { journals, goals, status } = this.state;

    const buildJournalCards = journals.map((journal) => (
      <JournalCard key={journal.id} journalEntry={journal} />
    ));
    const buildGoalCards = goals.map((oneGoal) => (
      <GoalsCard key={oneGoal.id} goal={oneGoal}/>
    ));
    const buildStatusCards = status.map((s) => (
      <StatusCard key={s.id} status={s}/>
    ));
    const today = moment().format('dddd, MMMM Do YYYY');

    return (
     <div className="justify-content-center">
     <h1>Home</h1>
     <h2>{today}</h2>
     <div className="d-flex flex-wrap">
        <div className=" col-8 card-group justify-content-center">
          {buildStatusCards}
        </div>
        <div className=" col-4 card-group justify-content-center">
          {buildGoalCards}
        </div>
      </div>
      <div className="card-group justify-content-center">
        {buildJournalCards}
      </div>
     </div>
    );
  }
}

export default Home;
