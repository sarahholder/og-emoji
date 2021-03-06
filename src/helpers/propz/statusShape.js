import PropTypes from 'prop-types';

const statusShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
});

export default { statusShape };
