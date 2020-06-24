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
          console.error(fbId);
        });
        const quoteToShow1 = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteToShow1Index = quotes.indexOf(quoteToShow1);
        quotes.splice(quoteToShow1Index, 1);
        const quoteToShow2 = quotes[Math.floor(Math.random() * quotes.length)];
        randomQuotes.push(quoteToShow1, quoteToShow2);
        console.error(randomQuotes);
      }
      resolve(randomQuotes);
    })
    .catch((err) => console.error(err));
});

export default { getQuotesByUid, getRandomQuote };
