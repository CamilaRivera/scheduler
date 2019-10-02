import React from "react";
import DayListItem from "components/DayListItem";

export default function dayList ({days, day:dayProps, setDay}){
return days.map(day => {
  return(
  <DayListItem 
  key = {day.id}
  name={day.name} 
  spots={day.spots} 
  selected={day.name === dayProps}
  setDay={setDay}  />
  );  
});
}
