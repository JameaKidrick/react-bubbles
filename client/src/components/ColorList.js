import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, fetchColor }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [add, setAdd] = useState(false);
  const [newColor, setNewColor] = useState(initialColor);

  const addNewColor = () => {
    setAdd(!add)
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    updateColor(colorToEdit)
  };

  const handleNewColor = e => {
    e.preventDefault();
    addColor();
  }

  const updateColor = () => {
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        fetchColor()
      })
      .catch(error => console.log(error))
      setColorToEdit({color: "", code: { hex: "" }})
  }

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, colorToEdit)
      .then(() => {
        fetchColor()
      })
      .catch(error => console.log(error))
  };

  const addColor = () => {
    axiosWithAuth()
      .post(`/api/colors`, newColor)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <button onClick={() => addNewColor()}>{!add ? 'Add Color' : 'Cancel'}</button>
      {/* <div className="spacer" /> */}
      {add && (
        <div>ADD FORM</div>
        <form onSubmit={handleNewColor}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
