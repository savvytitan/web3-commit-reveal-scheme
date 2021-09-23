import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { COMMIT_REVEAL_ABI, COMMIT_REVEAL_ADDRESS } from "./config";

import styled from "styled-components";
import { CircleTimer, Commit, Reveal, VoteCommits } from "./components";

import { IVote } from "./utils/types";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background-color: ${(props) => props.theme.color.gray};
  height: 100vh;

  & > div {
    background-color: ${(props) => props.theme.color.white};
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const App: React.FC = () => {
  const [account, setAccount] = useState<string>();
  const [commitReveal, setCommitReveal] = useState<Contract>();
  const [commits, setCommits] = useState<Array<string>>([]);
  const [duration, setDuration] = useState<number>(-1);
  const [canReveal, setCanReveal] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3("http://localhost:8545");

        const accounts: Array<string> = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);

          const _commitReveal: Contract = new web3.eth.Contract(
            COMMIT_REVEAL_ABI,
            COMMIT_REVEAL_ADDRESS,
            {
              from: accounts[0],
              gasPrice: "10000000000000",
              gas: 1000000,
            }
          );
          setCommitReveal(_commitReveal);

          const commitPhaseEndTime = await _commitReveal?.methods
            .commitPhaseEndTime()
            .call();
          const _duration = commitPhaseEndTime - new Date().getTime() / 1000;
          setDuration(_duration < 0 ? 0 : _duration);
          setCanReveal(_duration <= 0);

          const _commits = await _commitReveal.methods
            .getVoteCommitsArray()
            .call();
          setCommits(_commits);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const commit = useCallback(
    async (secret: string, vote: IVote) => {
      try {
        await commitReveal?.methods
          .commitVote(Web3.utils.keccak256(vote + "_" + secret))
          .send({ from: account });

        const _commits = await commitReveal?.methods
          .getVoteCommitsArray()
          .call();
        setCommits(_commits);
      } catch (error) {
        console.error(error);
      }
    },
    [commitReveal, account]
  );

  const reveal = useCallback(
    async (secret: string, vote: IVote, commit: string) => {
      try {
        await commitReveal?.methods
          .revealVote(vote + "_" + secret, commit)
          .send({ from: account });

        const winner = await commitReveal?.methods.getWinner().call();

        const numberOfVotesCast = await commitReveal?.methods
          .numberOfVotesCast()
          .call();

        window.alert(
          `Winner: '${winner}'\n${numberOfVotesCast} votes are cast.`
        );
      } catch (error) {
        console.error(error);
      }
    },
    [commitReveal, account]
  );

  const onCommitPhaseEnd = useCallback(() => {
    setCanReveal(true);
  }, []);

  return (
    <StyledApp>
      <div>
        {duration >= 0 && (
          <div style={{ marginBottom: "20px" }}>
            <CircleTimer
              duration={duration || 0}
              onComplete={onCommitPhaseEnd}
            />
          </div>
        )}
        <Commit onCommit={commit} />
        <VoteCommits commits={commits} />
      </div>
      <div>{canReveal && <Reveal onReveal={reveal} />}</div>
    </StyledApp>
  );
};

export default App;
