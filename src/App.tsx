import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import ItemComponent from "./ItemComponent";

import { useDispatch, useSelector } from "react-redux";
import { changeBudget, addItem } from "./redux/budgetCalcSlice";
import { TStore } from "./redux/store";

import {
  BudgetCalcMain,
  TitleDiv,
  BudgetCardDiv,
  AddCardDiv,
  AddPriceDiv,
  ItemContainerCardDiv,
} from "./assets/App.style";

export type Item = {
  name: string;
  price: string;
  id: string;
};

function App() {
  // +++++ redux toolkit +++++
  const dispatch = useDispatch();
  const budgetCalcState = useSelector((state: TStore) => state.budgetCalc);

  // +++++ budget +++++
  const [budget, setBudget] = useState<string>("0.00");
  const [isChangingBudget, setIsChangingBudget] = useState<boolean>(false);

  let oldBudget: number = 0;
  const handleChangingBudget = (budget: string): void => {
    isChangingBudget ? setIsChangingBudget(false) : setIsChangingBudget(true);
    oldBudget = parseFloat(budget);
  };

  // +++++ change budget +++++
  const checkBudget = (
    itemPrice: string,
    kw: string,
    editingItemPrice?: string
  ): void => {
    const itemPriceNum: number = parseFloat(itemPrice);
    let totalBudget: number = parseFloat(budget);

    if (kw === "add") {
      totalBudget -= itemPriceNum;
    } else if (kw === "edit" && !!editingItemPrice) {
      // +++++ itemPriceNum === original price +++++
      // +++++ parseFloat(editingItem.price) === new price +++++
      const def = itemPriceNum - parseFloat(editingItemPrice);
      totalBudget += def;
    } else if (kw === "delete") {
      totalBudget += itemPriceNum;
    }

    setBudget(addZero(totalBudget.toString()));
  };

  // +++++ recalculate budget +++++
  const recalcBudget = (): void => {
    let newBudget: number = parseFloat(budget);
    let currentTotal: number = 0;

    if (oldBudget !== newBudget) {
      if (items.length > 0) {
        items.map((item): void => {
          const priceNum = parseFloat(item.price);
          currentTotal += priceNum;
        });
        newBudget -= currentTotal;
      }
    }

    setBudget(addZero(newBudget.toString()));

    dispatch(changeBudget(addZero(newBudget.toString())));
  };

  // reset
  const handleReset = (): void => {
    if (window.confirm("Do you want to reset all?")) {
      setBudget("0.00");
      setItems([]);
    }
  };

  // items, input field, add item
  const [items, setItems] = useState<Item[]>([]);

  const [inputItem, setInputItem] = useState<Item>({
    name: "",
    price: "",
    id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setInputItem((prev) => ({ ...prev, [name]: value }));
  };

  // +++++ check if input is number or . +++++
  const checkNum = (price: string): string => {
    if (price.match(/^[0-9.]*$/) !== null) {
      return addZero(price);
    } else {
      return "NaN";
    }
  };

  // +++++ add . and 0 accordingly +++++
  const addZero = (price: string): string => {
    // +++++ check if input is number or . +++++
    const arr = price.split(".");

    switch (arr.length) {
      // +++++ no decimal (ex. "1", "12") +++++
      case 1:
        price += ".00";
        return price;

      case 2:
        // +++++ one digit after decimal (ex. "1.9", "12.8") +++++
        if (arr[1].length === 1) {
          price += "0";
        }
        // +++++ no digit after decimal (ex. "1.", "12.") +++++
        else if (arr[1].length === 0) {
          price += "00";
        }
        // +++++ more than 2 digits after decimal (ex. "1.988", "12.8653") +++++
        else if (arr[1].length > 2) {
          return "NaN";
        }

        // +++++ no digit before decimal (ex. ".1", ".12") +++++
        if (arr[0].length === 0) {
          price = "0" + price;
        }
        return price;

      // +++++ more than one decimal (ex. "1..", "1.2.") +++++
      default:
        return "NaN";
    }
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const checkedNum = checkNum(inputItem.price);

    if (checkedNum !== "NaN") {
      inputItem.price = checkedNum;
      inputItem.id = uuid();
      checkBudget(inputItem.price, "add");

      setItems((prev) => [...prev, inputItem]);
      setInputItem({ name: "", price: "", id: "" });
    } else {
      alert("Not a valid input.");
    }

    dispatch(addItem(inputItem));
  };

  return (
    <div className="App">
      <BudgetCalcMain>
        <section>
          <TitleDiv>
            <h1>Grocery Budget Calculator</h1>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </TitleDiv>

          <BudgetCardDiv isOverBudget={parseFloat(budget) < 0 ? true : false}>
            {isChangingBudget ? (
              <>
                <div className="changing-budget">
                  <span>$&nbsp;</span>
                  <input
                    type="text"
                    defaultValue={budget}
                    inputMode="numeric"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      setBudget(e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleChangingBudget(budget);
                    recalcBudget();
                  }}
                >
                  Confirm change
                </button>
              </>
            ) : (
              <>
                <div className="showing-budget">
                  <p>$&nbsp;</p>
                  <p>{budget}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChangingBudget(budget)}
                >
                  Change budget
                </button>
              </>
            )}
          </BudgetCardDiv>

          <AddCardDiv>
            <form onSubmit={(e) => handleAdd(e)}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Apple"
                  value={inputItem.name}
                  required
                  onChange={(e) => handleChange(e)}
                />

                <AddPriceDiv>
                  <p>$&nbsp;</p>
                  <input
                    type="text"
                    name="price"
                    placeholder="1.00"
                    value={inputItem.price}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </AddPriceDiv>
              </div>
              <button type="submit">Add</button>
            </form>
          </AddCardDiv>

          <ItemContainerCardDiv>
            {items.length > 0 &&
              items.map((item) => (
                <ItemComponent
                  key={item.id}
                  item={item}
                  items={items}
                  setItems={setItems}
                  checkNum={checkNum}
                  checkBudget={checkBudget}
                />
              ))}
          </ItemContainerCardDiv>
        </section>
      </BudgetCalcMain>
    </div>
  );
}

export default App;
