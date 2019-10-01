import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment({ id, interview, time }) {
  return (
    <Fragment>
      <Header time={time}></Header>
      {interview && <Show interviewer={interview.interviewer} student={interview.student}></Show>}
      {!interview && <Empty></Empty>}
    </Fragment>
  )
}
