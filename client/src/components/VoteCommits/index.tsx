import React from "react";
import styled from "styled-components";

interface Props {
  commits: Array<string>;
}

const StyledContainer = styled.div`
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 10px;
  align-items: center;
  justify-items: center;
  padding: 15px 20px;
  box-shadow: 0 4px 0px 0 rgba(0, 0, 0, 0.1);

  & > div {
    width: 100%;
    font-size: ${(props) => props.theme.text.size.sm};
    font-weight: bold;
    color: ${(props) => props.theme.color.black};

    &:first-child {
      text-align: start;
    }

    &:last-child {
      text-align: center;
    }
  }
`;

const StyledCommits = styled.div`
  min-height: 200px;
`;

const StyledCommit = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};

  &:last-child {
    border: none;
    margin-bottom: 20px;
  }

  & > div {
    color: ${(props) => props.theme.color.black};
    font-size: ${(props) => props.theme.text.size.sm};
    width: 100%;

    &:first-child {
      text-align: start;
    }

    &:last-child {
      text-align: center;
    }
  }
`;

const VoteRecords: React.FC<Props> = ({ commits }) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <div>#</div>
        <div>Commit</div>
      </StyledHeader>
      <StyledCommits>
        {commits.map((commit, index) => (
          <StyledCommit key={commit}>
            <div>{index + 1}</div>
            <div>{commit}</div>
          </StyledCommit>
        ))}
      </StyledCommits>
    </StyledContainer>
  );
};

export default VoteRecords;
