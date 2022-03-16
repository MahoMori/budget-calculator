import styled from "styled-components";
import { color, addInputStyle, CardDiv } from "./styleVariable";
import { device } from "./screenSize";

export const BudgetCalcMain = styled.main`
  padding: 1rem;

  @media ${device.tablet} {
    width: 50%;
    margin: 0 auto;
  }

  @media ${device.laptop} {
    padding: 1.5rem;
    width: 35%;
    margin: 0 auto;
  }

  @media ${device.laptopL} {
    padding: 2rem;
    width: 30%;
    margin: 0 auto;
  }

  @media ${device.desktop} {
    padding: 2rem;
    width: 20%;
    margin: 0 auto;
  }
`;

export const TitleDiv = styled.div`
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
    cursor: pointer;
  }
`;

export const BudgetCardDiv = styled(CardDiv)<{ isOverBudget: boolean }>`
  display: grid;
  grid-template-columns: 55% 45%;
  height: auto;
  align-items: center;

  & .changing-budget,
  & .showing-budget {
    display: flex;
    margin-right: 0.7rem;
    font-size: 1.5rem;
  }

  & .showing-budget p:last-child {
    width: 100%;
    text-align: right;
    border-bottom: solid 2px #000;
    color: ${(props) => (props.isOverBudget ? `${color.delete}` : "black")};
  }

  & .changing-budget input {
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
    cursor: pointer;
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
    cursor: pointer;
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

export const ItemContainerCardDiv = styled(CardDiv)`
  & .each-item-div:not(:first-child):not(:last-child) {
    margin: 1.5rem 0;
  }

  & form input {
    width: 100%;
    border-style: ${addInputStyle.borderStyle};
    border-color: ${color.edit};
    border-radius: ${addInputStyle.borderRadius};
    padding: ${addInputStyle.padding};
    font-size: ${addInputStyle.fontSize};
  }
`;
