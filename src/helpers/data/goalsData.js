import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getGoalsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/goals.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbGoals = response.data;
      const goals = [];
      console.error(fbGoals);
      if (fbGoals) {
        Object.keys(fbGoals).forEach((fbId) => {
          fbGoals[fbId].id = fbId;
          goals.push(fbGoals[fbId]);
          console.error(fbId);
        });
      }
      resolve(goals);
    })
    .catch((err) => reject(err));
});

export default { getGoalsByUid };
