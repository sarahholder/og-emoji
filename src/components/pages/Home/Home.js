import React from 'react';

import authData from '../../../helpers/data/authData';
import goalsData from '../../../helpers/data/goalsData';
import GoalsCard from '../../shared/GoalsCard/GoalsCard';
import NewGoalModal from '../../shared/NewGoalModal/NewGoalModal';
import JournalCard from '../../shared/JournalCard/journalCard';
import statusData from '../../../helpers/data/statusData';
import StatusCard from '../../shared/StatusCard/StatusCard';
import smashData from '../../../helpers/data/smashData';

class Home extends React.Component {
  state = {
    journals: [],
    goals: [],
    status: [],
    formOpen: false,
  }

  getGoals = () => {
    const uid = authData.getUid();
    goalsData.getGoalsByUid(uid)
      .then((goals) => this.setState({ goals }))
      .catch((err) => console.error('unable to get goals: ', err));
  }

  getSmashJournals = () => {
    const uid = authData.getUid();
    smashData.getJournalsWithStatusId(uid)
      .then((journals) => this.setState({ journals }))
      .catch((err) => console.error('unable to get journals'));
  }

  getStatuses = () => {
    statusData.getStatus()
      .then((status) => this.setState({ status }))
      .catch((err) => console.error('unable to get status: ', err));
  }

  componentDidMount() {
    this.getSmashJournals();
    this.getGoals();
    this.getStatuses();
  }

  saveGoal = (e) => {
    this.toggle();
    e.preventDefault();
    const {
      goalTitle,
      goalDate,
    } = this.state;
    const newGoal = {
      title: goalTitle,
      date: goalDate,
      uid: authData.getUid(),
    };
    goalsData.postGoal(newGoal)
      .then(() => this.props.history.push('./*'))
      .catch((err) => console.error('Unable to save goal', err));
  }

  removeGoal = (goalId) => {
    goalsData.deleteGoal(goalId)
      .then(() => this.getGoals())
      .catch((err) => console.error('unable to delete goal: ', err));
  }

  formClose = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const {
      journals,
      goals,
      status,
      formOpen,
    } = this.state;

    const buildJournalCards = journals.map((journal) => (
      <JournalCard key={journal.id} journalEntry={journal} status={status} />
    ));
    const buildGoalCards = goals.map((oneGoal) => (
      <GoalsCard key={oneGoal.id} goal={oneGoal} removeGoal={this.removeGoal} saveGoal={this.saveGoal} getGoals={this.getGoals}/>
    ));
    const buildStatusCards = status.map((s) => (
      <StatusCard key={s.id} status={s}/>
    ));

    const { goal } = this.props;

    return (
  <div>
    <div className="justify-content-center">
    </div>
    <div className="d-flex flex-wrap justify-content-center align-content-middle m-2">
      <div className="col-md-6">
        <h2 className="m-4">How are you feeling today?</h2>
        <div className="row">
          <div className="card-group d-flex flex-wrap justify-content-center emojiSection">
          {buildStatusCards}
          </div>
        </div>
      </div>
    <div className="col-md-5 d-flex flex-wrap justify-content-center m-2">
      <h2 className="m-4">Goals :</h2>
      <div className="card-group goalsSection d-flex flex-wrap justify-content-center text-center">
          {buildGoalCards}
          {goals.length < 3 ? <button className="btn btn-info"><i className="fas fa-plus fa-2x" onClick={() => this.setState({ formOpen: true }) }></i></button> : ''}
          { formOpen ? <NewGoalModal formClose={this.formClose} goal={goal} /> : '' }
      </div>
    </div>
    </div>
    <div className="mt-5">
    <h2 className="titleBorder">Previous Journal Entries :</h2>
    <div className="d-flex flex-wrap justify-content-center">
      <div className="card-group d-flex flex-wrap justify-content-center">
        {buildJournalCards}
      </div>
    </div>
    </div>
    </div>
    );
  }
}

export default Home;
