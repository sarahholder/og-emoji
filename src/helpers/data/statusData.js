import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getStatus = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/status.json`)
    .then((response) => {
      const fbStatus = response.data;
      const status = [];
      if (fbStatus) {
        Object.keys(fbStatus).forEach((fbId) => {
          fbStatus[fbId].id = fbId;
          status.push(fbStatus[fbId]);
        });
      }
      resolve(status);
    })
    .catch((err) => reject(err));
});

export default { getStatus };
