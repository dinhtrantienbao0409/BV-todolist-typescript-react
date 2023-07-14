import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 10px;
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
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${rotateAnimation} 1s linear infinite;
`;

// const LoadingText = styled.p`
//   margin-top: 16px;
//   font-size: 16px;
//   color: #333333;
// `;

export const LoadingComponent: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      {/* <LoadingText>Loading...</LoadingText> */}
    </LoadingContainer>
  );
};
