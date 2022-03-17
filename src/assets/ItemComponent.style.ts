import styled from "styled-components";
import { color, inputStyle } from "./styleVariable";

import { FaCheck } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";

export const EditPriceDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;

  & p {
    font-size: ${inputStyle.fontSize};
  }
`;

export const ItemDetailDiv = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;

  & p:first-child {
    overflow-wrap: break-word;
  }

  & p:last-child {
    text-align: right;
  }
`;

export const ItemIconsDiv = styled.div`
  display: grid;
  grid-template-columns: 80% 10% 10%;
  align-items: center;

  & span {
    width: 100%;
    border-top: solid #9a9a9a 2px;
  }

  & button {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const DoneIcon = styled(FaCheck)`
  color: ${color.edit};
  font-size: 1rem;
`;

export const EditIcon = styled(RiEdit2Fill)`
  color: ${color.edit};
  font-size: 1.25rem;
`;

export const DeleteIcon = styled(TiDeleteOutline)`
  color: ${color.delete};
  font-size: 1.25rem;
`;
