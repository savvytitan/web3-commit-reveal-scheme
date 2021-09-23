import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Vote from "../Vote";
import { Redo } from "../Icon";
import Theme from "../../assets/theme";
import crypto from "crypto";
import { IVote } from "../../utils/types";

interface Props {
  onCommit: (secret: string, vote: IVote) => void;
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 10px;
  width: fit-content;
  margin-bottom: 50px;
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

const StyledCommit = styled.button`
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

const Commit: React.FC<Props> = ({ onCommit }) => {
  const [secret, setSecret] = useState<string>("");
  const [vote, setVote] = useState<IVote | undefined>();

  const generateSecret = useCallback(() => {
    setSecret(crypto.randomBytes(12).toString("hex"));
  }, []);

  return (
    <StyledContainer>
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
      <StyledCommit
        type="button"
        disabled={!secret || !vote}
        onClick={() => {
          if (secret && vote) onCommit(secret, vote);
        }}
      >
        Commit
      </StyledCommit>
    </StyledContainer>
  );
};

export default Commit;
