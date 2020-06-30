import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getJournalsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/journal.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbJournals = response.data;
      const journals = [];
      if (fbJournals) {
        Object.keys(fbJournals).forEach((fbId) => {
          fbJournals[fbId].id = fbId;
          journals.push(fbJournals[fbId]);
        });
      }
      resolve(journals);
    })
    .catch((err) => reject(err));
});

const getSingleEntry = (journalId) => axios.get(`${baseUrl}/journal/${journalId}.json`);

const getTodaysEntry = (date) => axios.get(`${baseUrl}/journal/${date}.json`);

const postEntry = (newEntry) => axios.post(`${baseUrl}/journal.json`, newEntry);

const updateLikeQuote = (journalId, quoteId) => axios.patch(`${baseUrl}/journal/${journalId}.json`, { likeQuote: quoteId });

export default {
  getJournalsByUid,
  getSingleEntry,
  postEntry,
  getTodaysEntry,
  updateLikeQuote,
};
