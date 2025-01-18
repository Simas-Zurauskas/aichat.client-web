import React from 'react';
import styled from '@emotion/styled';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1; /* Keep behind main content */
  overflow: hidden; /* Hide circle overflow */

  /* Common styles for all circles (a.k.a. “shapes”) */
  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.7;
    animation: floatAround 15s ease-in-out infinite;
  }

  /* Example circle positions & sizes — adjust as you wish */
  .shape1 {
    top: 10%;
    left: 20%;
    width: 220px;
    height: 220px;
    background-color: rgba(116, 49, 195, 0.4); /* #7431c3 + alpha */
  }
  .shape2 {
    top: 40%;
    left: 70%;
    width: 300px;
    height: 300px;
    background-color: rgba(47, 181, 240, 0.3); /* #2fb5f0 + alpha */
  }
  .shape3 {
    top: 70%;
    left: 30%;
    width: 250px;
    height: 250px;
    background-color: rgba(25, 232, 199, 0.35); /* #19e8c7 + alpha */
  }
  .shape4 {
    top: 50%;
    left: 5%;
    width: 180px;
    height: 180px;
    background-color: rgba(243, 70, 232, 0.25); /* pink/purple accent */
  }

  @keyframes floatAround {
    0% {
      transform: translate(0, 0) scale(1) rotate(0deg);
    }
    50% {
      /* Move and rotate halfway through */
      transform: translate(60px, -50px) scale(1.1) rotate(180deg);
    }
    100% {
      /* Return to original position */
      transform: translate(0, 0) scale(1) rotate(360deg);
    }
  }
`;

const ModernBackground: React.FC = () => {
  return (
    <BackgroundWrapper>
      {/* You can add or remove shapes as you like */}
      <div className="shape shape1" />
      <div className="shape shape2" />
      <div className="shape shape3" />
      <div className="shape shape4" />
    </BackgroundWrapper>
  );
};

export default ModernBackground;
