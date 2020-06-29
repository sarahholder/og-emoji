import PropTypes from 'prop-types';

const journalEntryShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  likeQuote: PropTypes.string,
  uid: PropTypes.string.isRequired,
});

export default { journalEntryShape };
