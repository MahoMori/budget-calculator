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

// editで変わってなかったら何もしない
// deleteで値段を戻す

function App() {
  // budget
  const [budget, setBudget] = useState<string>("0.00");
  const [isChangingBudget, setIsChangingBudget] = useState<boolean>(false);
  const changeBudget = (): void => {
    isChangingBudget ? setIsChangingBudget(false) : setIsChangingBudget(true);
  };

  // reset
  const handleReset = (): void => {
    if (window.confirm("Do you want to reset all?")) {
      setBudget("0.00");
      setItems([]);
    }
  };

  // check if input is number
  const checkNum = (): boolean => {
    if (inputItem.price.match(/^[0-9.]*$/) !== null) {
      return true;
    } else {
      return false;
    }
  };

  // change budget
  const checkBudget = (itemPrice: string, kw: string): void => {
    const itemPriceNum: number = parseFloat(itemPrice);
    let totalBudget: number = parseFloat(budget);

    if (kw === "add") {
      totalBudget -= itemPriceNum;
    } else if (kw === "edit") {
      // itemPriceNum === original price
      // parseFloat(inputItem.price) === new price
      const def = itemPriceNum - parseFloat(inputItem.price);
      totalBudget += def;
    } else if (kw === "delete") {
      totalBudget += itemPriceNum;
    }

    setBudget(totalBudget.toString());
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

  const handleAdd = (): void => {
    if (checkNum()) {
      inputItem.id = uuid();
      checkBudget(inputItem.price, "add");

      setItems((prev) => [...prev, inputItem]);
      setInputItem({ name: "", price: "", id: "" });
    } else {
      alert("Not a number.");
    }
  };

  // edit
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  const handleIsEditing = (editItem: Item): void => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
    setEditId(editItem.id);
    setInputItem({ ...editItem });
  };

  const handleEdit = (): void => {
    if (checkNum()) {
      inputItem.id = editId;

      const originalItem: Item | undefined = items.find(
        (item) => item.id === editId
      );
      if (originalItem && originalItem.price !== inputItem.price) {
        checkBudget(originalItem.price, "edit");
      }

      setItems((prev) => {
        return prev.map((item) =>
          item.id === editId ? { ...inputItem } : item
        );
      });

      setInputItem({ name: "", price: "", id: "" });
      setEditId("");
    } else {
      alert("Not a number.");
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
        <input
          type="text"
          name="name"
          placeholder="Apple"
          required
          onChange={(e) => handleChange(e)}
        />
        <div>
          ${" "}
          <input
            type="text"
            name="price"
            placeholder="1.00"
            inputMode="numeric"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div>
        {items.length > 0 &&
          items.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: "pink", marginBottom: "1rem" }}
            >
              {isEditing && item.id === editId ? (
                <>
                  <input
                    type="text"
                    name="name"
                    defaultValue={item.name}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="text"
                    name="price"
                    defaultValue={item.price}
                    inputMode="numeric"
                    onChange={(e) => handleChange(e)}
                  />
                  <button type="button" onClick={() => handleEdit()}>
                    {" "}
                    Done{" "}
                  </button>
                </>
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
