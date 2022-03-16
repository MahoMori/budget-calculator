import React, { useState } from "react";

import { Item } from "./App";

import { useDispatch, useSelector } from "react-redux";
import { editItem, deleteItem } from "./redux/budgetCalcSlice";
import { TStore } from "./redux/store";

import {
  EditPriceDiv,
  ItemDetailDiv,
  ItemIconsDiv,
  DoneIcon,
  EditIcon,
  DeleteIcon,
} from "./assets/ItemComponent.style";

type Props = {
  item: Item;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  checkNum: (price: string) => string;
  checkBudget: (
    itemPrice: string,
    kw: string,
    editingItemPrice?: string
  ) => void;
};

const ItemComponent: React.VFC<Props> = ({
  item,
  items,
  setItems,
  checkNum,
  checkBudget,
}) => {
  // +++++ redux toolkit +++++
  const dispatch = useDispatch();
  const budgetCalcState = useSelector((state: TStore) => state.budgetCalc);

  // +++++ edit +++++
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Item>({
    name: "",
    price: "",
    id: "",
  });

  const handleIsEditing = (item: Item): void => {
    if (isEditing === true) {
      setIsEditing(false);
      setEditingItem({ name: "", price: "", id: "" });
    } else {
      setIsEditing(true);
      setEditingItem({ ...item });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // +++++ ".00" is added at the end +++++
    const checkedNum: string = checkNum(editingItem.price);

    if (checkedNum !== "NaN") {
      editingItem.price = checkedNum;

      const originalItem: Item | undefined = items.find(
        (item) => item.id === editingItem.id
      );
      if (originalItem && originalItem.price !== editingItem.price) {
        checkBudget(originalItem.price, "edit", checkedNum);
      }

      setItems((prev) => {
        return prev.map((item) =>
          item.id === editingItem.id ? { ...editingItem } : item
        );
      });

      // dispatch(editItem(editingItem));
    } else {
      alert("Not a valid input.");
    }
  };

  // +++++ delete +++++
  const handleDelete = (delItem: Item): void => {
    checkBudget(delItem.price, "delete");

    setItems((prev) => {
      return prev.filter((item) => item.id !== delItem.id);
    });

    if (isEditing === true) {
      setIsEditing(false);
      setEditingItem({ name: "", price: "", id: "" });
    }

    // dispatch(deleteItem(delItem.id));
  };

  return (
    <div key={item.id} className="each-item-div">
      {isEditing && item.id === editingItem.id ? (
        <form
          onSubmit={(e) => {
            handleEdit(e);
            handleIsEditing(item);
          }}
        >
          <input
            type="text"
            name="name"
            defaultValue={item.name}
            required
            onChange={(e) => handleChange(e)}
          />
          <EditPriceDiv>
            <p>$&nbsp;</p>
            <input
              type="text"
              name="price"
              defaultValue={item.price}
              required
              inputMode="numeric"
              onChange={(e) => handleChange(e)}
            />
          </EditPriceDiv>
          <ItemIconsDiv>
            <span></span>
            <button
              type="submit"
              // onClick={() => handleIsEditing(item)}
            >
              <DoneIcon />
            </button>
            <button type="button" onClick={() => handleDelete(item)}>
              <DeleteIcon />
            </button>
          </ItemIconsDiv>
        </form>
      ) : (
        <>
          <ItemDetailDiv>
            <p>{item.name}</p>
            <p>$&nbsp;{item.price}</p>
          </ItemDetailDiv>

          <ItemIconsDiv>
            <span></span>
            <button type="button" onClick={() => handleIsEditing(item)}>
              <EditIcon />
            </button>
            <button type="button" onClick={() => handleDelete(item)}>
              {/* <FontAwesomeIcon icon={faCircleMinus} /> */}
              {/* Delete */}
              <DeleteIcon />
            </button>
          </ItemIconsDiv>
        </>
      )}
    </div>
  );
};

export default ItemComponent;
