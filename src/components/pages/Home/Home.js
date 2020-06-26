import React from 'react';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import goalsData from '../../../helpers/data/goalsData';
import GoalsCard from '../../shared/GoalsCard/GoalsCard';
import NewGoalModal from '../../shared/NewGoalModal/NewGoalModal';
import journalData from '../../../helpers/data/journalData';
import JournalCard from '../../shared/JournalCard/JournalCard';
import statusData from '../../../helpers/data/statusData';
import StatusCard from '../../shared/StatusCard/StatusCard';
// import { ReactComponent as Happy } from '../../../../public/emogis/happyGREEN.svg';

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
    const { journals, goals, status } = this.state;
    const goalsLength = goals.length;

    const buildJournalCards = journals.map((journal) => (
      <JournalCard key={journal.id} journalEntry={journal} />
    ));
    const buildGoalCards = goals.map((oneGoal) => (
      <GoalsCard key={oneGoal.id} goal={oneGoal} removeGoal={this.removeGoal} saveGoal={this.saveGoal}/>
    ));
    const buildStatusCards = status.map((s) => (
      <StatusCard key={s.id} status={s}/>
    ));
    const today = moment().format('dddd, MMMM Do YYYY');

    const { formOpen } = this.state;

    const { goal } = this.props;

    return (

     <div className="justify-content-center">
     <h1>Home</h1>
     <div>
     </div>
     <h2>{today}</h2>
      <div className="d-flex flex-wrap">
        <div className=" col-8 card-group justify-content-center">
          {buildStatusCards}
        </div>
        <div className=" col-4 card-group justify-content-center">
          {buildGoalCards}
          {goals.length < 3 ? <button className="btn btn-success" onClick={() => this.setState({ formOpen: true })}>Add Goal</button> : ''}
          { formOpen ? <NewGoalModal formClose={this.formClose} goal={goal} /> : '' }
        </div>
      </div>
      <div className="card-group justify-content-center">
        {buildJournalCards}
      </div>
      <div/>
      </div>
    );
  }
}

export default Home;
