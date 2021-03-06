import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getQuotesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/quotes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbQuotes = response.data;
      const quotes = [];
      if (fbQuotes) {
        Object.keys(fbQuotes).forEach((fbId) => {
          fbQuotes[fbId].id = fbId;
        });
      }
      resolve(quotes);
    })
    .catch((err) => reject(err));
});

const getRandomQuote = (statusId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/quotes.json?orderBy="statusId"&equalTo="${statusId}"`)
    .then((response) => {
      const fbQuotes = response.data;
      const quotes = [];
      const randomQuotes = [];
      if (fbQuotes) {
        Object.keys(fbQuotes).forEach((fbId) => {
          fbQuotes[fbId].id = fbId;
          quotes.push(fbQuotes[fbId]);
        });
        const quoteToShow1 = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteToShow1Index = quotes.indexOf(quoteToShow1);
        quotes.splice(quoteToShow1Index, 1);
        const quoteToShow2 = quotes[Math.floor(Math.random() * quotes.length)];
        randomQuotes.push(quoteToShow1, quoteToShow2);
      }
      resolve(randomQuotes);
    })
    .catch((err) => console.error(err));
});

const getQuoteByQuoteId = (quoteId) => axios.get(`${baseUrl}/quotes/${quoteId}.json`);

export default { getQuotesByUid, getRandomQuote, getQuoteByQuoteId };
