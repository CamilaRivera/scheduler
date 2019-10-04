import React from "react";
import DayListItem from "components/DayListItem";

export default function dayList ({days, day:dayProps, dispatchState, getSpots}){
return days.map(day => {
  return(
  <DayListItem 
  key = {day.id}
  name={day.name} 
  spots={getSpots(day.name)} 
  selected={day.name === dayProps}
  dispatchState={dispatchState}  />
  );  
});
}
