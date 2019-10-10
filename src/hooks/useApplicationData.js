import { useEffect, useReducer } from "react";
import axios from 'axios';
import { getAppointmentsForDay } from "./../helpers/selectors";

import reduceState from "../reducers/application";


export function useApplicationData() {

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

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        dispatchState({ value: appointments, type: "appointments" })
      })
      .catch(error => {
        console.log(error);
        throw error;
      });

  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
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
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(all => {
      const value = { days: all[0].data, appointments: all[1].data, interviewers: all[2].data };
      dispatchState({ value, type: "all" });
    })
      var socket = new WebSocket("ws://localhost:8001");
      socket.onopen = function (event) {
        //socket.send("ping");
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
