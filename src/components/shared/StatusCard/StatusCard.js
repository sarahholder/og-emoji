import React from 'react';
import { Link } from 'react-router-dom';

import statusShape from '../../../helpers/propz/statusShape';
import './StatusCard.scss';

class statusCard extends React.Component {
  static propTypes = {
    status: statusShape.statusShape,
  }

  render() {
    const { status } = this.props;
    const singleLink = `/journalentry/${status.id}`;
    return (
      <div>
        <div className="card statusCard">
          <div className="card-body">
        <Link className="btn btn-info imageLink" status={status} to={singleLink}>
          <div>
            <img className="statusImg img-card-top" src={status.emoji} alt={status.name}/>
          </div>
          <div>
            {status.name}
          </div>
        </Link>
          </div>
      </div>
    </div>
    );
  }
}

export default statusCard;
