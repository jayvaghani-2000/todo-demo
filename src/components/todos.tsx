import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  markTodoAsCompleted,
  markTodoAsIncomplete,
  selectTodo,
  deleteTodo,
} from "../store/slices/todoSlice";
import { Button, Checkbox, Typography } from '@mui/material';
import { localPropType } from './addTodo';


const Todos = (props: localPropType) => {
  const { setLocalStore } = props; 
  const todo = useSelector(selectTodo);
  const dispatch = useDispatch();

  const pendingTodo = todo.list.filter((i) => !i.completed);
  const completedTodo = todo.list.filter((i) => i.completed);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
    setLocalStore((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <Typography
        variant="h4"
        noWrap
        component="div"
        sx={{ display: { sm: "block", mr: 2 } }}
      >
        Pending:
      </Typography>
      {pendingTodo.length === 0 ? (
        <Typography
          variant="h6"
          noWrap
          component="div"
          style={{ fontStyle: "italic" }}
          sx={{ display: { sm: "block", mr: 2 } }}
        >
          No pending task
        </Typography>
      ) : (
        pendingTodo.map((i) => {
          return (
            <div
              key={i.id}
              style={{
                display: "flex",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              <Checkbox
                onChange={() => {
                  dispatch(markTodoAsCompleted(i.id));
                  setLocalStore((prev) => {
                    const newPrev = [...prev];
                    const index = newPrev.findIndex((j) => i.id === j.id);
                    newPrev[index].completed = true;
                    return newPrev;
                  });
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { sm: "block", mr: 2 } }}
              >
                {i.task}
              </Typography>
              <Button
                onClick={() => {
                  handleDeleteTodo(i.id);
                }}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </div>
          );
        })
      )}

      <Typography
        variant="h4"
        noWrap
        component="div"
        style={{ marginTop: "20px" }}
        sx={{ display: { sm: "block", mt: 2, mr: 2 } }}
      >
        Completed:
      </Typography>
      {completedTodo.length === 0 ? (
        <Typography
          variant="h6"
          noWrap
          component="div"
          style={{ fontStyle: "italic" }}
          sx={{ display: { sm: "block", mr: 2 } }}
        >
          No completed task
        </Typography>
      ) : (
        completedTodo.map((i) => {
          return (
            <div
              key={i.id}
              style={{
                display: "flex",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              <Checkbox
                defaultChecked
                onChange={() => {
                  dispatch(markTodoAsIncomplete(i.id));
                  setLocalStore((prev) => {
                    const newPrev = [...prev];
                    const index = newPrev.findIndex((j) => i.id === j.id);
                    newPrev[index].completed = false;
                    return newPrev;
                  });
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { sm: "block", mr: 2 } }}
              >
                {i.task}
              </Typography>
              <Button
                onClick={() => {
                  handleDeleteTodo(i.id);
                }}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Todos