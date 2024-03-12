import { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanType = {
  title: string;
  onChange: (value: string) => void;
};

export const EditableSpan = (props: EditableSpanType) => {
  const [editeMode, setEditeMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onDoubleClickHandler = () => {
    setEditeMode(true);
    setNewTitle(props.title);
  };

  const onBlurHandler = () => {
    if (newTitle.trim() === "") {
      setNewTitle(props.title);
      setError("field 'title' is required");
      return;
    }
    setEditeMode(false);
    props.onChange(newTitle.trim());
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    setNewTitle(e.currentTarget.value);
  };

  return editeMode ? (
    <TextField
      value={newTitle}
      onChange={onChangeTitleHandler}
      onBlur={onBlurHandler}
      autoFocus
      variant="standard"
      error={!!error}
      helperText={error}
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  );
};
