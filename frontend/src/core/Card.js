import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Card } from 'antd';
import './Card.css'
import { formatMoney } from './Utils'
import { setCardItem, addCartItem, updateItem, removeItem } from './cartHelper'
import ShowImage from './ShowImage';

const CCard = ({ product }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);


    // const showRemoveProductInCart = () => {
    //     return (showRemove &&
    //         <Button size="small" color="danger"
    //             onClick={() => {
    //                 removeItem(product._id);
    //                 setRun(!run);
    //             }}>
    //             Delete
    //         </Button>
    //     );
    // }

    return (
        <Card
            hoverable
            style={{ width: 240, marginTop: '20px' }}
            cover={
                <ShowImage item={product} url='product' height={250} />
            }
        >

            <div className='product-name'>
                <Link to={`/product/${product._id}`}>
                    {product.name}
                </Link>
            </div>
            <div className="d-flex justify-content-between">
                <div className='p-price'>đ {formatMoney(product.price)}</div>
                <div className='products-sold'>Đã bán: {product.sold}</div>
            </div>

        </Card>
    );
};

export default CCard;