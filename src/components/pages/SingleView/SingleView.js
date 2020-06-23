import React from 'react';
// import { Link } from 'react-router-dom';

import journalData from '../../../helpers/data/journalData';

class SingleView extends React.Component {
    state = {
      journalEntry: {},
    }

    componentDidMount() {
      const { journalId } = this.props.match.params;
      journalData.getSingleEntry(journalId)
        .then((response) => this.setState({ journalEntry: response.data }))
        .catch((err) => console.error('unable to get journal: ', err));
    }

    render() {
      const { journalEntry } = this.state;
      // const { journalId } = this.props.match.params;

      return (
            <div>
            <h1>{journalEntry.date}</h1>
            <p>{journalEntry.status}</p>
            <p>Comments: {journalEntry.comments}</p>
            <p>Import quotes for liked quotes here</p>
            </div>
      );
    }
}

export default SingleView;
