import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import moment from 'moment';
import authData from '../../../helpers/data/authData';
import goalsData from '../../../helpers/data/goalsData';

import goalShape from '../../../helpers/propz/goalsShape';
import './GoalsCard.scss';

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
      .then(() => this.props.getGoals())
      .catch((err) => console.error('unable to save goal: ', err));
  }

  goalChange = (e) => {
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
      <div className="w-100">
        <div className="card goalsCard m-1 p-2">
          <div className="card-title p-1 m-0 justify-content-center">
            <div>
              <p className="float-left p-0 m-0">{goal.date}</p>
              <i className="float-right fas fa-trash-alt fa-lg" onClick={() => removeGoal(goal.id)}></i>
            </div>
          </div>
            <div className="pb-2 pl-2 pr-2 text-center">
              <span style={{ color: 'navy' }} href='#' id='UncontrolledTooltipExample'>
                <ContentEditable
                innerRef={this.contentEditable}
                html={title}// innerHTML of the editable div
                disabled={false} // use true to disable edition
                onChange={this.goalChange} // handle innerHTML change
                />
              </span>
      <UncontrolledTooltip className="p-3 goalToolTip" placement='right' target='UncontrolledTooltipExample'>
      Click on Text to Edit a Goal
      </UncontrolledTooltip>
          </div>
        </div>
      </div>
    );
  }
}

export default GoalsCard;
