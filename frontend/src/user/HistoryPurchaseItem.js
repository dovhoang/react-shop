import React from 'react'
import { Card } from 'antd'
import ShowImage from '../core/ShowImage'
import { Link } from 'react-router-dom'

const HistoryPurchaseItem = ({ order }) => {

    const formatTime = (isoDate) => {
        let date = new Date(isoDate);
        return (date.getHours() + ':' + date.getMinutes() + ' ' +
            date.getDate() + '/' + date.getMonth()
            + '/' + date.getFullYear());
    }

    return (
        <Card style={{ width: '100%' }}>
            <div className="row">
                <div className="col-md-3">
                    <div>Mã đơn hàng: <span style={{ fontWeight: 'bold' }}>{order._id}</span></div>
                    <div className="mt-3"> Lúc:
                    <span style={{ fontWeight: 'bold' }}>{formatTime(order.createdAt)}</span></div>
                    <div className='mt-3'>Tổng thanh toán: <span style={{ color: 'red', fontWeight: 'bold' }}>{order.amount}</span></div>
                </div>
                <div className="col-md-9">
                    {order.products.map((product) => (
                        <div className="row mt-1">
                            <div className="col-md-2 text-center">
                                <ShowImage item={product} url='product' height={100} />
                            </div>
                            <div className="col-md-4 text-center">
                                <Link to={`/product/${product._id}`}>
                                    {product.name}
                                </Link>
                            </div>
                            <div className="col-md-2 text-center">
                                Giá: {product.price}
                            </div>
                            <div className="col-md-2 text-center">
                                Số lượng: {product.count}
                            </div>
                            <div className="col-md-2 text-center">
                                Thành tiền: {product.price * product.count}
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default HistoryPurchaseItem;