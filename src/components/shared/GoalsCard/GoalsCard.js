import React from 'react';

import goalShape from '../../../helpers/propz/goalsShape';

class GoalsCard extends React.Component {
  static propTypes = {
    goal: goalShape.goalShape,
  }

  render() {
    const { goal } = this.props;

    return (
      <div>
        <div className="card">
          <div className="card-body">
          <p>{goal.goal}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default GoalsCard;
