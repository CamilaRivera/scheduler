const stateLookup = {
  day: (state, value) => {
    return { ...state, day: value };
  },
  days: (state, value) => {
    return { ...state, days: value };
  },
  appointments: (state, value) => {
    return { ...state, appointments: value };
  },
  appointment: (state, value) => { // value = {id: 2, interview: null, time: 1} (appointment)
    const newAppointment = { ...(state.appointments[value.id] || {}), ...value };
    const appointments = { ...state.appointments, [value.id]: newAppointment };
    return { ...state, appointments };
  },
  interviewers: (state, value) => {
    return { ...state, interviewers: value };
  },
  all: (state, value) => {
    return { ...state, ...value }
  }
};

export default function reduceState(state, action) {
  if(stateLookup[action.type]){
  return stateLookup[action.type](state, action.value);
  }else {
    throw new Error("tried to reduce with unsupported action type");
  }
};

