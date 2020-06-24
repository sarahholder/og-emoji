import React from 'react';
import { Link } from 'react-router-dom';

import statusShape from '../../../helpers/propz/statusShape';

class statusCard extends React.Component {
  static propTypes = {
    status: statusShape.statusShape,
  }

  render() {
    const { status } = this.props;
    const singleLink = `/journalEntry/${status.id}`;
    return (
      <div>
         <div className="card">
          <div className="card-body">
      <p>{status.name}</p>
        <Link className="btn btn-info" to={singleLink}>LINK</Link>
      </div>
    </div>
  </div>
    );
  }
}

export default statusCard;
