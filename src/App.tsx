import React, { useState } from "react";
import { v4 as uuid } from "uuid";

type Item = {
  name: string;
  price: string;
  id: string;
};

// 数字かどうかチェック

function App() {
  // budget
  const [budget, setBudget] = useState<string>("0");
  const [isChangingBudget, setIsChangingBudget] = useState<boolean>(false);
  const changeBudget = (): void => {
    isChangingBudget ? setIsChangingBudget(false) : setIsChangingBudget(true);
  };

  // reset
  const handleReset = (): void => {
    if (window.confirm("Do you want to reset all?")) {
      setItems([]);
    }
  };

  // items, input field, add item
  const [items, setItems] = useState<Item[]>([
    { name: "milk", price: "2", id: uuid() },
  ]);

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
    inputItem.id = uuid();

    setItems((prev) => [...prev, inputItem]);
    console.log(items);
  };

  // edit
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const handleIsEditing = (editId: string): void => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
    setEditId(editId);
  };

  const handleEdit = (): void => {
    inputItem.id = editId;

    setItems((prev) => {
      return prev.map((item) => (item.id === editId ? { ...inputItem } : item));
    });
  };

  // delete
  const handleDelete = (id: string): void => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== id);
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
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="text"
                    name="price"
                    defaultValue={item.price}
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    type="submit"
                    onClick={() => {
                      handleIsEditing(item.id);
                      handleEdit();
                    }}
                  >
                    {" "}
                    Done{" "}
                  </button>
                </>
              ) : (
                <>
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <button
                    type="button"
                    onClick={() => handleIsEditing(item.id)}
                  >
                    {" "}
                    Edit{" "}
                  </button>
                </>
              )}
              <button type="button" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          ))}
      </div>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Apple"
          required
          onChange={(e) => handleChange(e)}
        />
        ${" "}
        <input
          type="text"
          name="price"
          placeholder="1.05"
          required
          onChange={(e) => handleChange(e)}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
