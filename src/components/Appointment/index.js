import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import { useVisualMode } from "../../hooks/useVisualMode"
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment({ id, interview, time, interviewers, bookInterview }) {


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW));

  }

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Fragment>
        <Header time={time}></Header>
        {mode === EMPTY && <Empty onAdd={(event) => { transition(CREATE) }} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
          />
        )}
        {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={(event) => { back(EMPTY) }} />}
        {mode === SAVING && <Status message = {"Loading"}/>}
      </Fragment>

    </article>
  )
}


