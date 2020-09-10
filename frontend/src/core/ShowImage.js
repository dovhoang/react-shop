import React from 'react'
import { API } from '../config'

const ShowImage = ({ item, url, height }) => {
    return <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        style={{ height: `${height}px` }}
    />
};

export default ShowImage;