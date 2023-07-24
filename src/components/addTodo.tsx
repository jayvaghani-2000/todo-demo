import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Search, SearchIconWrapper, StyledInputBase } from "./styledMui";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTodo, todo } from "../store/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";

export type localPropType = {
  setLocalStore: React.Dispatch<React.SetStateAction<todo[]>>;
};

const AddTodo = (props: localPropType) => {
  const { setLocalStore } = props;
  const [todoDraft, setTodoDraft] = React.useState("");
  const dispatch = useDispatch();

  const handleAddToast = () => {
    if (!todoDraft) return;
    const todo = { task: todoDraft, completed: false, id: uuidv4() };
    dispatch(addTodo(todo));
    setLocalStore((prev) => {
      const newTodo = [...prev];
      newTodo.push(todo);
      return newTodo;
    });
    setTodoDraft("");
  };

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDraft(e.target.value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", mr: 2 } }}
            >
              Add To-do
            </Typography>
            <Search>
              <SearchIconWrapper></SearchIconWrapper>
              <StyledInputBase
                onChange={handleUpdateTitle}
                placeholder="New Task"
                inputProps={{ "aria-label": "search" }}
                value={todoDraft}
              />
            </Search>

            <Button
              onClick={() => {
                handleAddToast();
              }}
              style={{ color: "white", border: "1px solid white" }}
            >
              Add
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AddTodo;
