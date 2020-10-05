import React, { useState, useEffect } from 'react'

const RadioBox = ({ prices, handleFilter }) => {

    const [values, setValues] = useState(0);

    const handleChange = e => {
        handleFilter(e.target.value);
        setValues(e.target.value);
    }

    return <form>
        {prices.map(p => (
            <div class="form-check" key={p._id}>
                <label class="form-check-label">
                    <input onChange={handleChange}
                        name={p}
                        type="radio"
                        className="form-check-input"
                        value={`${p._id}`} />
                    {p.name}
                </label>
            </div>
        ))}
    </form>
};

export default RadioBox;