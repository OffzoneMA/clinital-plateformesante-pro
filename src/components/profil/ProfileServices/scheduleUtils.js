
const groupAndMergeSchedules = (schedules) => {
  const groupedSchedules = {};

  
  schedules.forEach((schedule) => {
    if (!groupedSchedules[schedule.day]) {
      groupedSchedules[schedule.day] = [];
    }
    groupedSchedules[schedule.day].push({
      start: new Date(schedule.availabilityStart),
      end: new Date(schedule.availabilityEnd),
    });
  });

  // Fusionner les tranches horaires qui se chevauchent pour chaque jour
  Object.keys(groupedSchedules).forEach((day) => {
    groupedSchedules[day].sort((a, b) => a.start - b.start);

    const mergedSchedules = [groupedSchedules[day][0]];
    for (let i = 1; i < groupedSchedules[day].length; i++) {
      const current = groupedSchedules[day][i];
      const previous = mergedSchedules[mergedSchedules.length - 1];
      if (current.start <= previous.end) {
       
        previous.end = new Date(Math.max(previous.end, current.end));
      } else {
        
        mergedSchedules.push(current);
      }
    }

    groupedSchedules[day] = mergedSchedules;
  });

  return groupedSchedules;
};

export default groupAndMergeSchedules;
