import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import { useVisualMode } from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment({ id, interview, time, interviewers, bookInterview, cancelInterview }) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW));

  }

  function deleteInterview() {
    transition(CONFIRM);
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY));

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
            onDelete = {(event) => {transition(CONFIRM)}}
            student={interview.student}
            interviewer={interview.interviewer}
            onEdit = {(event) => { transition(EDIT) }}
          />
        )}
        {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={(event) => { back(EMPTY) }} />}
        {mode === EDIT && <Form onSave={save} name={interview.student} interviewer = {interview.interviewer.id} interviewers={interviewers} onCancel={(event) => { back(SHOW) }} />}
        {mode === SAVING && <Status message = {"Saving"}/>}
        {mode === DELETING && <Status message = {"Deleting"}/>}
        {mode === CONFIRM && <Confirm onConfirm = {deleteInterview} onCancel={(event) => { transition(SHOW) }} message = {"Are you sure you would like to delete this?"}/>}
      </Fragment>

    </article>
  )
}


