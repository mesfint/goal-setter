import { useState, useEffect } from "react";
import { createGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";

const GoalForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            className="form-control"
            id="text"
            name="text"
            value={text}
            placeholder="Enter your name"
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
