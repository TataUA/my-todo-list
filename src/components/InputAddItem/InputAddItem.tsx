import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

type PropsInputAddItemType = {
  addItem: (title: string) => void;
};

export const InputAddItem = (props: PropsInputAddItemType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  const addNewTask = () => {
    if (newTaskTitle.trim() === "") {
      setNewTaskTitle("");
      setError("field 'title' is required");
      return;
    }
    props.addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  const onKeyEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") addNewTask();
  };

  return (
    <div>
      <TextField
        value={newTaskTitle}
        onChange={onChangeTitleHandler}
        onKeyUp={onKeyEnterHandler}
        variant="outlined"
        label="type..."
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addNewTask} color="primary">
        <ControlPoint/>
      </IconButton>
    </div>
  );
};
