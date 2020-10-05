import React, { useState } from 'react'
const CheckBox = ({ categories, handleFilter }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = cate => () => {
        const curCategoryId = checked.indexOf(cate);
        const newCheckedCategoryId = [...checked];

        console.log(curCategoryId);
        if (curCategoryId === -1) {
            newCheckedCategoryId.push(cate);
        } else {
            newCheckedCategoryId.splice(cate, 1)
        }
        setChecked(newCheckedCategoryId);
        handleFilter(newCheckedCategoryId);
    }

    return <form>
        {categories.map(cate => (
            < div key={cate._id} className="form-check" >
                <label className="form-check-label">
                    <input onChange={handleToggle(cate._id)}
                        type="checkbox"
                        className="form-check-input"
                        name={cate.name}
                        id={cate.name}
                        value={checked.indexOf(cate._id === -1)} />
                    {cate.name}
                </label>
            </div>
        ))}
    </form>
};

export default CheckBox