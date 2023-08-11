import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

interface AlertProps {
  type: string;
  message: string;
  timeout: number;
}

const AlertContainer = styled.div<{ type: string }>`
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  background-color: ${(props) =>
    props.type === "success"
      ? "#5cb85c"
      : props.type === "error"
      ? "#d9534f"
      : "#000"};
  color: #fff;
`;

export const Alert = (props: AlertProps) => {
  const { type, message, timeout } = props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout]);
  return (
    <>
      {visible ? <AlertContainer type={type}>{message}</AlertContainer> : null}
    </>
  );
};
