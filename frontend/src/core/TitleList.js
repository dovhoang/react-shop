import React from 'react'
import './TitleList.css'
const TitleList = ({ name }) => {
    return (<div className='title-list'>
        <h3 className='title-name'> {name}</h3>
    </div>);
};

export default TitleList;