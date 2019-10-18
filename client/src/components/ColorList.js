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
        setColorToEdit({color: "", code: { hex: "" }})
        setEditing(!editing)
      })
      .catch(error => console.log(error))
      
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
        fetchColor()
        setNewColor({color: "", code: { hex: "" }})
        setAdd(!add)
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
      
      {!add && (
        <div>
          <p onClick={() => addNewColor()} style={{cursor:'pointer', color: 'rgb(50,205,50)'}}>+ add color</p>
        </div>
      )}
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
      {add && (
        <form onSubmit={handleNewColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setAdd(!add)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
