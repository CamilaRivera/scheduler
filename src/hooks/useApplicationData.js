import { useEffect, useReducer } from "react";
import axios from 'axios';
import { getAppointmentsForDay } from "./../helpers/selectors";

export function useApplicationData() {

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
      const newAppointment = {...(state.appointments[value.id] || {}), ...value};
      const appointments = {...state.appointments, [value.id]: newAppointment};
      return { ...state, appointments };
    },
    interviewers: (state, value) => {
      return { ...state, interviewers: value };
    },
    all: (state, value) => {
      return { ...state, ...value }
    }
  };

  const reduceState = (state, action) => {
    return stateLookup[action.type](state, action.value) || state;
  };

  let [state, dispatchState] = useReducer(reduceState, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: { name: 'hello' },
  });

  function getSpots(day) {
    let spots = [];
    const appointmentsPerDay = getAppointmentsForDay(state, day);

    spots = appointmentsPerDay.filter(appointment => appointment.interview === null);

    return spots.length;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        dispatchState({ value: appointments, type: "appointments" })
      })
      .catch(error => {
        console.log(error);
        throw error;
      });

  };

  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        const newState = JSON.parse(JSON.stringify(state));
        newState.appointments[id].interview = null
        const appointments = { ...newState.appointments }
        dispatchState({ value: appointments, type: "appointments" })
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))
    ]).then(all => {
      const value = { days: all[0].data, appointments: all[1].data, interviewers: all[2].data };
      dispatchState({ value, type: "all" });
    })
      var socket = new WebSocket("ws://localhost:8001");
      socket.onopen = function (event) {
        socket.send("ping");
      };
      socket.onmessage = function (event) {
        const messageObject = JSON.parse(event.data);
        if(messageObject.type === "SET_INTERVIEW"){
          const value =  {id: messageObject.id, interview: messageObject.interview};
          dispatchState({ value, type: "appointment" });
        }
      }
  }, []);

  return { state, dispatchState, bookInterview, cancelInterview, getSpots }

};
