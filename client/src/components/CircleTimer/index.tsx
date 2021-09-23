import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";

interface Props {
  duration: number;
  onComplete: () => void;
}

const StyledTimer = styled.div`
  font-size: ${(props) => props.theme.text.size.sm};
`;

const StyledTimerValue = styled.div``;

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  if (remainingTime === 0) {
    return <StyledTimer>Too late...</StyledTimer>;
  }

  return (
    <StyledTimer>
      <StyledTimerValue>{remainingTime}s remaining...</StyledTimerValue>
    </StyledTimer>
  );
};

const CircleTimer: React.FC<Props> = ({ duration, onComplete }) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      colors={[
        ["#004777", 0.33],
        ["#F7B801", 0.33],
        ["#A30000", 0.34],
      ]}
      onComplete={onComplete}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default CircleTimer;
