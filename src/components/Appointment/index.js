import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import { useVisualMode } from "../../hooks/useVisualMode"
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment({ id, interview, time, interviewers }) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Fragment>
        <Header time={time}></Header>
        {mode === EMPTY && <Empty onAdd={(event) => {transition(CREATE)}} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
          />
        )}
        { mode === CREATE && <Form interviewers={interviewers} onCancel={(event) => {back(EMPTY)}}/> }
      </Fragment>

    </article>
  )
}


