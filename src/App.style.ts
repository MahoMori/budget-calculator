import styled from "styled-components";
import { color, addInputStyle, CardDiv } from "./assets/styleVariable";

export const BudgetCalcMain = styled.main`
  padding: 1rem;
`;

export const TitleDiv = styled.div`
  /* @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"); */

  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 0.5rem;

  & h1 {
    font-family: "Space Grotesk", sans-serif;
  }

  & button {
    height: 50%;
    border: solid ${color.reset} 1px;
    border-radius: 0.5rem;
    background-color: #fff;
    color: ${color.reset};
  }
`;

export const BudgetCardDiv = styled(CardDiv)`
  display: grid;
  grid-template-columns: 55% 45%;
  height: auto;
  align-items: center;

  & p,
  & form {
    display: flex;
    margin-right: 0.7rem;
    font-size: 1.5rem;
  }

  & p span:last-child {
    width: 8rem;
    text-align: right;
    border-bottom: solid 2px #000;
  }

  & form input {
    width: 100%;
    border-style: solid;
    border-color: ${color.edit};
    font-size: 1.5rem;
    text-align: right;
    border-radius: 0.2rem;
    padding-right: 0.2rem;
  }

  & button {
    border: solid ${color.edit} 1px;
    border-radius: 0.5rem;
    background-color: ${color.edit};
    color: #fff;
    height: 80%;
  }
`;

export const AddCardDiv = styled(CardDiv)`
  height: auto;

  & form {
    display: grid;
    grid-template-columns: 80% 20%;
    align-items: center;
  }

  & form div {
    margin-right: 0.7rem;
  }

  & form div input {
    width: 100%;
    border-style: ${addInputStyle.borderStyle};
    border-color: ${addInputStyle.borderColor};
    border-radius: ${addInputStyle.borderRadius};
    padding: ${addInputStyle.padding};
    font-size: ${addInputStyle.fontSize};
  }

  & form button {
    border: solid ${color.add} 1px;
    border-radius: 0.5rem;
    background-color: ${color.add};
    color: #fff;
    height: 45%;
  }
`;

export const AddPriceDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;

  & p {
    font-size: ${addInputStyle.fontSize};
  }

  & input {
    border-style: ${addInputStyle.borderStyle};
    border-color: ${addInputStyle.borderColor};
    border-radius: ${addInputStyle.borderRadius};
    padding: ${addInputStyle.padding};
    font-size: ${addInputStyle.fontSize};
  }
`;
