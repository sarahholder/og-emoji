import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getGoalsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/goals.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbGoals = response.data;
      const goals = [];
      if (fbGoals) {
        Object.keys(fbGoals).forEach((fbId) => {
          fbGoals[fbId].id = fbId;
          goals.push(fbGoals[fbId]);
        });
      }
      resolve(goals);
    })
    .catch((err) => reject(err));
});

const putGoal = (goalId, updatedGoal) => axios.put(`${baseUrl}/goals/${goalId}.json`, updatedGoal);

const postGoal = (newGoal) => axios.post(`${baseUrl}/goals.json`, newGoal);

const deleteGoal = (goalId) => axios.delete(`${baseUrl}/goals/${goalId}.json`);

const getSingleGoal = (goalId) => axios.get(`${baseUrl}/goals/${goalId}.json`);

export default {
  getGoalsByUid,
  putGoal,
  postGoal,
  deleteGoal,
  getSingleGoal,
};
