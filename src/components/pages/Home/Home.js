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
    <div className="d-flex flex-wrap justify-content-center">
      <div className="col-md-6">
        <h2>Pick Emoji:</h2>
        <div className="row justify-content-center">
          <div className="card-group d-flex flex-wrap justify-content-center emojiSection">
          {buildStatusCards}
          </div>
        </div>
      </div>
    <div className="col-md-6 d-flex flex-wrap justify-content-center ">
      <h2>Track up to 3 goals:</h2>
      <div className="card-group goalsSection">
          {buildGoalCards}
          {goals.length < 3 ? <button className="btn btn-success" onClick={() => this.setState({ formOpen: true }) }>Add Goal</button> : ''}
          { formOpen ? <NewGoalModal formClose={this.formClose} goal={goal} /> : '' }
      </div>
    </div>
    </div>
    <div className="mt-2">
    <h2>Previous Journal Entries:</h2>
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
