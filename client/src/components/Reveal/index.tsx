import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Vote from "../Vote";
import { Redo } from "../Icon";
import Theme from "../../assets/theme";
import crypto from "crypto";
import { IVote } from "../../utils/types";

interface Props {
  onReveal: (secret: string, vote: IVote, commit: string) => void;
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  width: fit-content;

  & > div:first-child {
    display: grid;
    grid-template-rows: auto auto;
    gap: 10px;

    & > div:first-child {
      display: grid;
      grid-template-columns: auto auto;
      gap: 10px;
    }
  }
`;

const StyledSecretInputContainer = styled.div`
  width: 300px;
  padding: 4px;
  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 5px;
  align-items: center;
  justify-items: center;
`;

const StyledSecretInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: ${(props) => props.theme.text.size.md};
  color: ${(props) => props.theme.color.black};
`;

const StyledSecretGenerator = styled.button`
  outline: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.transparent};
`;

const StyledVotes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StyledCommitInputContainer = styled.div`
  width: 100%;
  height: 38px;
  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 5px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const StyledCommitInput = styled.input`
  flex: 1;
  margin-left: 4px;
  margin-right: 4px;
  outline: none;
  border: none;
  font-size: ${(props) => props.theme.text.size.md};
  color: ${(props) => props.theme.color.black};
`;

const StyledReveal = styled.button`
  width: 120px;
  height: 40px;
  outline: none;
  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 5px;
  background-color: ${(props) =>
    props.disabled ? props.theme.color.gray : props.theme.color.success};
  font-size: ${(props) => props.theme.text.size.md};
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

const Reveal: React.FC<Props> = ({ onReveal }) => {
  const [secret, setSecret] = useState<string>("");
  const [vote, setVote] = useState<IVote | undefined>();
  const [commit, setCommit] = useState<string>("");

  const generateSecret = useCallback(() => {
    setSecret(crypto.randomBytes(12).toString("hex"));
  }, []);

  return (
    <StyledContainer>
      <div>
        <div>
          <StyledSecretInputContainer>
            <StyledSecretInput
              type="text"
              placeholder="Secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <StyledSecretGenerator onClick={generateSecret}>
              <Redo color={Theme.color.gray} height="16px" width="16px" />
            </StyledSecretGenerator>
          </StyledSecretInputContainer>
          <StyledVotes>
            <Vote
              type={IVote.up}
              active={vote === IVote.up}
              onClick={() => setVote(IVote.up)}
            />
            <Vote
              type={IVote.down}
              active={vote === IVote.down}
              onClick={() => setVote(IVote.down)}
            />
          </StyledVotes>
        </div>
        <div>
          <StyledCommitInputContainer>
            <StyledCommitInput
              type="text"
              placeholder="Commit"
              value={commit}
              onChange={(e) => setCommit(e.target.value)}
            />
          </StyledCommitInputContainer>
        </div>
      </div>
      <div>
        <StyledReveal
          type="button"
          disabled={!secret || !vote || !commit}
          onClick={() => {
            if (secret && vote) onReveal(secret, vote, commit);
          }}
        >
          Reveal
        </StyledReveal>
      </div>
    </StyledContainer>
  );
};

export default Reveal;
