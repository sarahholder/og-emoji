import PropTypes from 'prop-types';

const entryShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  likeQuotes: PropTypes.string,
  uid: PropTypes.string.isRequired,
});

export default { entryShape };
