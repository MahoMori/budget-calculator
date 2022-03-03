import React, { useState } from "react";
import { v4 as uuid } from "uuid";

type Item = {
  name: string;
  beforeD: string;
  afterD: string;
  id: string;
};

// type Item = {
//   name: string;
//   price: string;
//   id: string;
// };

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

  // price before decimal and after decimal
  // const [priceState, setPriceState] = useState<Price>({beforeD: "", afterD: ""})
  const checkNum = (): boolean => {
    const { beforeD, afterD } = inputItem;
    if (
      beforeD.match(/^[0-9]*$/) !== null &&
      afterD.match(/^[0-9]*$/) !== null
    ) {
      return true;
    } else {
      return false;
    }
  };

  const priceCheck = (): void => {
    const { beforeD, afterD } = inputItem;
    const inputTotal: number = parseFloat(`${beforeD}.${afterD}`);
    let totalBudget: number = parseFloat(budget);
    totalBudget -= inputTotal;

    setBudget(totalBudget.toString());

    if (totalBudget < 0) {
      console.log("below budget");
    }
  };

  const toFloat = (str: string): number => {
    return parseFloat(str);
  };

  // items, input field, add item
  const [items, setItems] = useState<Item[]>([
    { name: "milk", beforeD: "1", afterD: "00", id: "707565769708" },
  ]);

  // const [items, setItems] = useState<Item[]>([
  //   { name: "milk", price: "2", id: uuid() },
  // ]);

  const [inputItem, setInputItem] = useState<Item>({
    name: "",
    beforeD: "",
    afterD: "",
    id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setInputItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (): void => {
    if (checkNum()) {
      inputItem.id = uuid();
      priceCheck();

      setItems((prev) => [...prev, inputItem]);
      setInputItem({ name: "", beforeD: "", afterD: "", id: "" });
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
      priceCheck();

      setItems((prev) => {
        return prev.map((item) =>
          item.id === editId ? { ...inputItem } : item
        );
      });

      setInputItem({ name: "", beforeD: "", afterD: "", id: "" });
      setEditId("");
    } else {
      alert("Not a number.");
    }
  };

  // delete
  const handleDelete = (delItem: Item): void => {
    const inputTotal: number = toFloat(`${delItem.beforeD}.${delItem.afterD}`);
    let totalBudget: number = toFloat(budget);
    totalBudget += inputTotal;
    setBudget(totalBudget.toString());

    setItems((prev) => {
      return prev.filter((item) => item.id !== delItem.id);
    });
  };

  return (
    <div className="App">
      <div>
        {isChangingBudget ? (
          <>
            <button onClick={changeBudget}>Confirm change</button>
            <input
              type="text"
              value={budget}
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
            name="beforeD"
            placeholder="1"
            inputMode="numeric"
            onChange={(e) => handleChange(e)}
          />
          <span>.</span>
          <input
            type="text"
            name="afterD"
            placeholder="00"
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
                    name="beforeD"
                    defaultValue={item.beforeD}
                    inputMode="numeric"
                    onChange={(e) => handleChange(e)}
                  />
                  <span>.</span>
                  <input
                    type="text"
                    name="afterD"
                    defaultValue={item.afterD}
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
                  <p>
                    $ {item.beforeD}.{item.afterD}
                  </p>
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
