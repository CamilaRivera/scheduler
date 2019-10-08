import React from "react";
import "./DayListItem.scss";

import classNames from "classnames";

  export default function DayListItem({name, spots, selected, dispatchState}) {

    const formatSpots = function(spots) {
      if(spots === 0){
        return spots = "no spots remaining"
      }

      else if(spots === 1){
        return spots = "1 spot remaining"
      }

      else{
        return spots = `${spots} spots remaining`
      }

    }
    const dayClass = classNames ('day-list__item', {
      'day-list__item--selected' : selected,
      'day-list__item--full': (spots === 0)
    })
    return (
      <li 
      className = {dayClass} 
      onClick={() => dispatchState({type: "day", value: name})}
      data-testid = "day">
        <h2 className="text--regular">{name}</h2> 
        <h3 className="text--light">{formatSpots(spots)}</h3>
      </li>
    );
  }

