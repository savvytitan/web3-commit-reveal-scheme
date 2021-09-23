import React from "react";
import styled from "styled-components";
import {
  ThumbsDownRegular,
  ThumbsUpRegular,
  ThumbsDownSolid,
  ThumbsUpSolid,
} from "../Icon";
import Theme from "../../assets/theme";
import { IVote } from "../../utils/types";

interface Props {
  type: IVote;
  active?: boolean;
  onClick?: () => void;
}

const StyledButton = styled.button<{ active?: boolean }>`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 2px solid
    ${(props) =>
      props.active ? props.theme.color.info : props.theme.color.gray};
  border-radius: 5px;
  cursor: pointer;
`;

const Vote: React.FC<Props> = ({ type, active, onClick = () => {} }: Props) => {
  return (
    <StyledButton type="button" active={active} onClick={onClick}>
      {type === IVote.down ? (
        active ? (
          <ThumbsDownSolid
            color={Theme.color.info}
            height="20px"
            width="20px"
          />
        ) : (
          <ThumbsDownRegular
            color={Theme.color.gray}
            height="20px"
            width="20px"
          />
        )
      ) : active ? (
        <ThumbsUpSolid color={Theme.color.info} height="20px" width="20px" />
      ) : (
        <ThumbsUpRegular color={Theme.color.gray} height="20px" width="20px" />
      )}
    </StyledButton>
  );
};

export default Vote;
