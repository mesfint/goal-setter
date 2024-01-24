import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals()); //dispatch goals from backend and put it in goals line 13
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  if (isLoading) {
    return Spinner;
  }

  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1>
        {console.log("user", user && user.name)}
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals && goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
