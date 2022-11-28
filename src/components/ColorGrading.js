import React, { useState, useEffect } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";
import { v4 as uuidv4 } from "uuid";

const ColorGrading = () => {

    const [colorInput, setColorInput] = useState({
        color: '',
        qty: 5
    })
 
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setColorInput({
            ...colorInput, 
            [name]: value,
        })
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" name="color" value={colorInput.color} id="color" onChange={handleChange} maxLength={7} className='input'></input>
                    <input type="number" name="qty" value={colorInput.qty} id="qty" onChange={handleChange} max={100} min={5} step={5} className='input'></input>
                </div>
                <button className="btn btn-selector" type="submit">Create</button>
            </form>
        </>
    );
};

export default ColorGrading;