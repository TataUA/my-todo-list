import { ChangeEvent, KeyboardEvent, useState } from "react";

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
      <input
        value={newTaskTitle}
        onChange={onChangeTitleHandler}
        onKeyUp={onKeyEnterHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addNewTask}>+</button>
      {error && <div className="error_message">{error}</div>}
    </div>
  );
};
