import React, { useState, useEffect } from "react";
import Footer from "./Footer";

export default function Task() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    } else {
      alert("Please adding a task in input field");
    }
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  return (
    <div className="container row">
      <h1 className="mt-5 text-white">Plan For Today</h1>
      <h2 className="text-white">Do the best or do nothing !</h2>
      <div className="row mt-3">
        <div className="badge text-warning">
          <h5>
            You have
            {!tasks.length
              ? " no tasks to do today !"
              : tasks.length === 1
              ? " only 1 tasks to do today !"
              : tasks.length > 1
              ? ` ${tasks.length} tasks to do today !`
              : null}
          </h5>
        </div>
        <div className="col-10 text-red">
          <input
            name="task"
            type="text"
            value={task}
            className="form-control w-100"
            placeholder="Adding a task in here"
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary btn-block form-control"
            onClick={addTask}
          >
            <i className="bi bi-plus-square-fill" />
          </button>
        </div>

        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <div className="col-10 mt-3">
              <span
                className="form-control bg-white btn-mt-2"
                style={{ textAlign: "left", fontWeight: "bold" }}
              >
                {task.title}
              </span>
            </div>
            <div className="col-2 mt-3">
              <button
                className="btn btn-danger form-control"
                onClick={() => handleDelete(task)}
              >
                <i className="bi bi-dash-square-fill" />
              </button>
            </div>
          </React.Fragment>
        ))}
        {!tasks.length ? null : (
          <div className="col-12 mt-3">
            <button
              className="btn btn-warning mt-4 mb-4"
              onClick={() => handleClear()}
            >
              Clear All Task
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
