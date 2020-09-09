import React, { useState, useEffect } from 'react'

const RadioBox = ({ prices, handleFilter }) => {

    const [values, setValues] = useState(0);

    const handleChange = e => {
        handleFilter(e.target.value);
        setValues(e.target.value);
    }

    return <div className="card">
        <div className="card-header">
            Price
                </div>
        <div className="card-body">
            <form>
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

        </div>
    </div>
};

export default RadioBox;