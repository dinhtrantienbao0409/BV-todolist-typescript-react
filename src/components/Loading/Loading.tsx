import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%
  height: 100%;
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${rotateAnimation} 1s linear infinite;
`;

export const LoadingComponent: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
};
