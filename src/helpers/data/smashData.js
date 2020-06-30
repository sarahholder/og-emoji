import journalData from './journalData';
import statusData from './statusData';

const getJournalsWithStatusId = (uid) => new Promise((resolve, reject) => {
  journalData.getJournalsByUid(uid)
    .then((fbJournals) => {
      statusData.getStatus().then((allStatuses) => {
        const allJournals = fbJournals;
        const completeJournal = [];
        allJournals.forEach((journal) => {
          const journalCopy = { ...journal };
          const foundMatches = allStatuses.find((x) => x.id === journal.status);
          journalCopy.statusName = foundMatches.name;
          journalCopy.statusColor = foundMatches.color;
          journalCopy.statusEmoji = foundMatches.emoji;
          completeJournal.push(journalCopy);
          resolve(completeJournal);
        });
      });
    })
    .catch((err) => reject(err));
});

export default { getJournalsWithStatusId };
