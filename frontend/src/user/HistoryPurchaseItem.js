import React from 'react'
import { Card } from 'antd'
import ShowImage from '../core/ShowImage'

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
                <div className="col-md-3 d-flex flex-column justify-content-around">
                    <div>Mã đơn hàng: {order._id}</div>
                    <div> Lúc: {formatTime(order.createdAt)}</div>
                    <div>Tổng thanh toán: <span style={{ color: 'red' }}>{order.amount}</span></div>
                </div>
                <div className="col-md-9">
                    {order.products.map((product) => (
                        <div className="row">
                            <div className="col-md-2">
                                <ShowImage item={product} url='product' height={100} />
                            </div>
                            <div className="col-md-4">
                                {product.name}
                            </div>
                            <div className="col-md-2 text-center">
                                Giá: {product.price}
                            </div>
                            <div className="col-md-2">
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