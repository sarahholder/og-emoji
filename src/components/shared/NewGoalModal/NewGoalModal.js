import React from 'react';
import moment from 'moment';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import goalsData from '../../../helpers/data/goalsData';
import authData from '../../../helpers/data/authData';

class NewGoalModal extends React.Component {
  static propTypes = {
    formClose: PropTypes.func.isRequired,
  };

  state = {
    isOpen: true,
    modal: true,
    goalTitle: '',
    goalDate: moment().format('MM/DD/YYYY'),
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.setState({ modal: !this.state.modal });
    this.props.formClose();
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ goalTitle: e.target.value });
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
      .then(() => this.props.getGoals())
      .catch((err) => console.error('Unable to save goal', err));
  }

  render() {
    const {
      modal,
      goalTitle,
    } = this.state;

    return (
    <div>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Goal Here: </ModalHeader>
          <ModalBody>
          <div>
          <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="goal-title"
              value={goalTitle}
              onChange={this.titleChange}
            />
          </div>
          </form>
          </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={this.saveGoal} >Save</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default NewGoalModal;
