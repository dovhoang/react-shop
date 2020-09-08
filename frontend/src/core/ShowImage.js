import React from 'react'
import { API } from '../config'

const ShowImage = ({ item, url }) => {
    return <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        style={{ height: '300px' }}
    />
};

export default ShowImage;