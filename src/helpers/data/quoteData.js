import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getQuotesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/quotes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbQuotes = response.data;
      const quotes = [];
      console.error(quotes);
      if (fbQuotes) {
        Object.keys(fbQuotes).forEach((fbId) => {
          fbQuotes[fbId].id = fbId;
          console.error(fbId);
        });
      }
      resolve(quotes);
    })
    .catch((err) => reject(err));
});

const getRandomQuote = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/quotes.json`)
    .then((response) => {
      const fbQuotes = response.data;
      const quotes = [];
      if (fbQuotes) {
        Object.keys(fbQuotes).forEach((fbId) => {
          fbQuotes[fbId].id = fbId;
          quotes.push(fbQuotes[fbId]);
          console.error(fbId);
        });
        const quoteToShowOne = quotes[Math.floor(Math.random() * quotes.length)];
        console.error(quoteToShowOne);
      }
      resolve(quotes);
    })
    .catch((err) => console.error(err));
});

export default { getQuotesByUid, getRandomQuote };
