import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};


export default function InterviewerList({onChange, interviewers: initialInterviewers, value: interviewerId}) {

  const interviewers = initialInterviewers.map(interviewer => {
    return ( 

          <InterviewerListItem 
            key = {interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === interviewerId}
            onChange = {event =>  onChange(interviewer.id)}
          />

    );
  });

  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>;
}

