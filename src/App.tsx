import React, { useState } from "react";
import { v4 as uuid } from "uuid";

// type Item = {
//   name: string;
//   beforeD: string;
//   afterD: string;
//   id: string;
// };

type Item = {
  name: string;
  price: string;
  id: string;
};

// type Price = {
//   beforeD: string;
//   afterD: string;
// }

// .のあとは2桁

function App() {
  // budget
  const [budget, setBudget] = useState<string>("0.00");
  const [isChangingBudget, setIsChangingBudget] = useState<boolean>(false);
  const changeBudget = (): void => {
    isChangingBudget ? setIsChangingBudget(false) : setIsChangingBudget(true);
  };

  // change budget
  const checkBudget = (itemPrice: string, kw: string): void => {
    const itemPriceNum: number = parseFloat(itemPrice);
    let totalBudget: number = parseFloat(budget);

    if (kw === "add") {
      totalBudget -= itemPriceNum;
    } else if (kw === "edit") {
      // itemPriceNum === original price
      // parseFloat(editItem.price) === new price
      const def = itemPriceNum - parseFloat(editItem.price);
      totalBudget += def;
    } else if (kw === "delete") {
      totalBudget += itemPriceNum;
    }

    setBudget(addZero(totalBudget.toString()));
  };

  // +++++ recalculate budget +++++
  const recalcBudget = (): void => {
    if (items.length > 0) {
      let currentTotal: number = 0;
      items.map((item): void => {
        const priceNum = parseFloat(item.price);
        currentTotal += priceNum;
      });
      let totalBudget: number = parseFloat(budget);
      totalBudget -= currentTotal;
      setBudget(totalBudget.toString());
    }
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    kw: string
  ): void => {
    const { name, value } = e.target;

    if (kw === "add") {
      setInputItem((prev) => ({ ...prev, [name]: value }));
    } else if (kw === "edit") {
      setEditItem((prev) => ({ ...prev, [name]: value }));
    }
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
  };

  // edit
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Item>({
    name: "",
    price: "",
    id: "",
  });

  const handleIsEditing = (item: Item): void => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
    setEditItem({ ...item });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const checkedNum = checkNum(editItem.price);

    if (checkedNum !== "NaN") {
      editItem.price = checkedNum;

      const originalItem: Item | undefined = items.find(
        (item) => item.id === editItem.id
      );
      if (originalItem && originalItem.price !== editItem.price) {
        checkBudget(originalItem.price, "edit");
      }

      setItems((prev) => {
        return prev.map((item) =>
          item.id === editItem.id ? { ...editItem } : item
        );
      });

      setEditItem({ name: "", price: "", id: "" });
    } else {
      alert("Not a valid input.");
    }
  };

  // delete
  const handleDelete = (delItem: Item): void => {
    checkBudget(delItem.price, "delete");

    setItems((prev) => {
      return prev.filter((item) => item.id !== delItem.id);
    });
  };

  return (
    <div className="App">
      <div>
        {isChangingBudget ? (
          <>
            <button
              type="button"
              onClick={() => {
                changeBudget();
                recalcBudget();
              }}
            >
              Confirm change
            </button>
            <input
              type="text"
              defaultValue={budget}
              inputMode="numeric"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setBudget(e.target.value)
              }
            />
          </>
        ) : (
          <>
            <button type="button" onClick={changeBudget}>
              Change budget
            </button>

            <p>$ {budget}</p>
          </>
        )}
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div>
        <form onSubmit={(e) => handleAdd(e)}>
          <input
            type="text"
            name="name"
            placeholder="Apple"
            value={inputItem.name}
            required
            onChange={(e) => handleChange(e, "add")}
          />
          <div>
            ${" "}
            <input
              type="text"
              name="price"
              placeholder="1.00"
              value={inputItem.price}
              required
              inputMode="numeric"
              onChange={(e) => handleChange(e, "add")}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div>
        {items.length > 0 &&
          items.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: "pink", marginBottom: "1rem" }}
            >
              {isEditing && item.id === editItem.id ? (
                <form onSubmit={(e) => handleEdit(e)}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={item.name}
                    required
                    onChange={(e) => handleChange(e, "edit")}
                  />
                  <input
                    type="text"
                    name="price"
                    defaultValue={item.price}
                    required
                    inputMode="numeric"
                    onChange={(e) => handleChange(e, "edit")}
                  />
                  <button type="submit"> Done </button>
                </form>
              ) : (
                <>
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <button type="button" onClick={() => handleIsEditing(item)}>
                    {" "}
                    Edit{" "}
                  </button>
                </>
              )}
              <button type="button" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
