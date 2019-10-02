export function getAppointmentsForDay(state, day) {
  let appointmentsPerDay = [];
  let chosenDay = state.days.find(objDay => {
    return objDay.name === day;
  });

  if (chosenDay) {
    for (const key in state.appointments) {
      if (chosenDay.appointments.includes(Number(key))) {
        appointmentsPerDay.push(state.appointments[key]);
      }
    }

    // appointmentsPerDay = chosenDay.appointments.map(id => state.appointments["" + id]);

    // for (const appointmentId of chosenDay.appointments){
    //   appointmentsPerDay.push(state.appointments["" + appointmentId]);
    // }
  }
  return appointmentsPerDay;
}

export function getInterview(state, interview) {
  if (interview) {
    const index = interview.interviewer;
    return { ...interview, interviewer: state.interviewers[index] };
  } else {
    return null;
  }
}
