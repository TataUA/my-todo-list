import { ChangeEvent, useState } from "react";

type EditableSpanType = {
  title: string;
  onChange: (value: string) => void;
};

export const EditableSpan = (props: EditableSpanType) => {
  const [editeMode, setEditeMode] = useState(false);
  const [title, setTitle] = useState("");

  const onDoubleClickHandler = () => {
    setEditeMode(true);
    setTitle(props.title);
  };

  const onBlurHandler = () => {
    setEditeMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editeMode ? (
    <input
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={onBlurHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  );
};


