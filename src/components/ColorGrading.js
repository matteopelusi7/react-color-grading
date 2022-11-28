import React, { useState, useEffect } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";
import { v4 as uuidv4 } from "uuid";

const ColorGrading = () => {

    const [isError, setIsError] = useState(false)

    const [selectedColor, setSelectedColor] = useState([])

    const [colorInput, setColorInput] = useState({
        color: '',
        qty: 5
    })

 
    const handleSubmit = (e) => {
        e.preventDefault();
        if(colorInput.color && colorInput.qty) {
            const {color, qty} = colorInput
            try {
                setSelectedColor(
                    new Values(color).all(Math.round(100/ parseInt(qty, 10) * 2))
                );
                setColorInput({
                    color: '',
                    qty: 10
                })
            } catch (error) {
                setIsError(true)
            }
        }
    }

    const handleChange = (e) => {
        if(isError) {
            setIsError(false);
        }
        const {name, value} = e.target;

        setColorInput({
            ...colorInput, 
            [name]: value,
        })
    }

    useEffect(() => {
        setColorInput({qty: 10, color: '#1194ec'})
        setSelectedColor(new Values('#1194ec').all(Math.round(100/ 10) * 2))
    }, []);

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" name="color" value={colorInput.color} id="color" onChange={handleChange} maxLength={7} className='input'></input>
                    <input type="number" name="qty" value={colorInput.qty} id="qty" onChange={handleChange} max={100} min={5} step={5} className='input'></input>
                </div>
                <button className="btn btn-selector" type="submit">Create</button>
            </form>
            <section className="color-section">
                {isError ? (
                <h4 className="section-center">Nessun Colore Trovato</h4>
                ) : !isError && selectedColor ? (
                selectedColor.map((el) => <SingleColor key={uuidv4()} {...el} />)
                ) : (
                <h4>Loading</h4>
                )}
            </section>
        </>
    );
};

export default ColorGrading;