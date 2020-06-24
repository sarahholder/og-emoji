import PropTypes from 'prop-types';

const quoteShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  statusId: PropTypes.string.isRequired,
});

export default { quoteShape };
