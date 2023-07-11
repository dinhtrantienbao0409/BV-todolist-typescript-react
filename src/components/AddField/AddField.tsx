import React from "react";
import { styled } from "styled-components";

export const AddField = () => {
  //   const StyledInput = styled.input`
  //     display: flex;
  //     justify-content: center;
  //     align-content: center;
  //     margin: 20px 0px;
  //     border: 1px solid lightblue;
  //     border-radius: 5px;
  //   `;
  const StyledAddField = styled.div.attrs(() => ({}))`
    position: relative;
  `;
  const StyledInput = styled.input.attrs((props) => ({
    type: "text",
    $size: "2em",
  }))<{ $size?: string }>`
    color: black;
    font-size: 1em;
    border: 2px solid #bf4f74;
    border-radius: 5px;
    width: 100%;
    padding: ${(props) => props.$size};
  `;

  const StyledButton = styled.button<{ $primary?: boolean }>`
    /* Adapt the colors based on primary prop */
    background: ${(props) => (props.$primary ? "#BF4F74" : "white")};
    color: ${(props) => (props.$primary ? "white" : "#BF4F74")};

    font-size: 1em;
    right: 0;
    top: 0;
    padding: 2em 1em;
    border: 2px solid #bf4f74;
    border-radius: 3px;
    position: absolute;
  `;

  return (
    <>
      <StyledAddField className="add-component">
        <StyledInput placeholder="Create new task..." />
        <StyledButton $primary>+</StyledButton>
      </StyledAddField>
    </>
  );
};
