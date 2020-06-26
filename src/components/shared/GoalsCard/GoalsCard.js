import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import moment from 'moment';
import authData from '../../../helpers/data/authData';
import goalsData from '../../../helpers/data/goalsData';

import goalShape from '../../../helpers/propz/goalsShape';

class GoalsCard extends React.Component {
  static propTypes = {
    goals: goalShape.goalShape,
    removeGoal: PropTypes.func.isRequired,
  }

  state = {
    title: '',
  }

  constructor() {
    super();
    this.contentEditable = React.createRef();
  }

  updateGoal = (e) => {
    const { goal } = this.props;
    const updateId = goal.id;
    const title = this.state;
    const disTitle = title.title;
    const updatedGoal = {
      // eslint-disable-next-line object-shorthand
      title: disTitle,
      uid: authData.getUid(),
      date: moment().format('MM/DD/YYYY'),
    };
    goalsData.putGoal(updateId, updatedGoal)
      .then().catch((err) => console.error('unable to save goal: ', err));
  }

  goalChange = (e) => {
    console.error(e);
    this.setState({ title: e.target.value });
    this.updateGoal(e);
  }

  componentDidMount() {
    const { goal } = this.props;
    const editId = goal.id;
    goalsData.getSingleGoal(editId)
      .then((response) => {
        const thisGoal = response.data;
        this.setState({
          title: thisGoal.title,
        });
      })
      .catch((err) => console.error('Unable to get goal to edit: ', err));
  }

  render() {
    const { goal, removeGoal } = this.props;

    const { title } = this.state;

    return (
      <div>
        <div className="card">
          <div className="card-body">
        <div><button className="btn btn-danger" onClick={() => removeGoal(goal.id)}><i className="fa-md fas fa-times"></i></button></div>
          <p>{goal.date}</p>
           <ContentEditable
        innerRef={this.contentEditable}
        html={title}// innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={this.goalChange} // handle innerHTML change
      />
          </div>
        </div>
      </div>
    );
  }
}

export default GoalsCard;
