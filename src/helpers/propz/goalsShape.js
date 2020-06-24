import PropTypes from 'prop-types';

const goalShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { goalShape };
