import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from"../InterviewerList"

export default function Form({name:initialName, interviewer: initialInterviewer, interviewers, onSave, onCancel}) {
  const [name, setName] = useState(initialName || "");
  // const array = useState(initialName || "");
  // const name = array[0];
  // const setName = array[1];
  const [interviewer, setInterviewer] = useState(initialInterviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    onSave(name, interviewer);
  }

return(
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        data-testid =  "student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick = {cancel}>Cancel</Button>
      <Button confirm onClick = {validate}>Save</Button>
    </section>
  </section>
</main>
);
}