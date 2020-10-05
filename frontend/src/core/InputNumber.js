import React, { useEffect, useState } from 'react'
import './InputNumber.css'
import { createAction } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

const InputNumber = ({
    data = 1,
    handleInputChange,
    cartChange
}) => {

    const [value, setValue] = useState(data);

    const handleChange = (e) => {
        cartChange()
        setValue(e.target.value);
    }

    const sub = () => {
        setValue(value > 1 ? value - 1 : value);
        cartChange()
    }
    const plus = () => {
        setValue(value + 1);
        cartChange()
    }

    useEffect(() => {
        handleInputChange(value);
    })
    return (
        <div class='input-number-layout'>
            <div onClick={sub} className='plus-sub'><i class="fa fa-minus " aria-hidden="true"></i></div>
            <input
                className='input-number'
                type="number"
                onChange={handleChange}
                value={value}
            />
            <div className='plus-sub' onClick={plus}><i class="fa fa-plus" aria-hidden="true"></i></div>
        </div>
    );
};

const cartChangeAction = createAction('CART_CHANGE')

const mapDispathToProps = (dispatch) => ({
    cartChange: () => dispatch(cartChangeAction())
})

export default connect(null, mapDispathToProps)(InputNumber);