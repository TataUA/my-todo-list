import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

type PropsInputAddItemType = {
  addItem: (title: string) => void;
};

export const InputAddItem = (props: PropsInputAddItemType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const addNewItem = () => {
    if (title.trim() === "") {
      setTitle("");
      setError("field 'title' is required");
      return;
    }
    props.addItem(title.trim());
    setTitle("");
  };

  const onKeyEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === "Enter") addNewItem();
  };

  return (
    <div>
      <TextField
        value={title}
        onChange={onChangeTitleHandler}
        onKeyUp={onKeyEnterHandler}
        variant="outlined"
        label="type..."
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addNewItem} color="primary">
        <ControlPoint />
      </IconButton>
    </div>
  );
};
