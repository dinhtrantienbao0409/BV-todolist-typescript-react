import React, { useState } from "react";

interface InputProps {
  defaultValue: string;
  onChange: (e: React.SyntheticEvent) => void;
}

export default function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setValue(target.value);
  };
  const inputProps: InputProps = {
    defaultValue: value,
    onChange: handleChange,
  };
  return inputProps;
}
