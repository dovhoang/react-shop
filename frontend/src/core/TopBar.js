import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import './TopBar.css'
import { isAuthenticate, isAdmin } from '../auth/apiAuth'
import { signout } from '../auth/apiAuth'
import Search from './Search'
import { connect } from 'react-redux'
import { getCart } from './cartHelper'

const TopBar = ({
    handleSearch,
    auth,
    cart = getCart() }) => {

    const history = useHistory()
    const [userId, setUserId] = useState(0);
    const signOut = () => signout(() => {
        setUserId(0);
        history.push('/');
    })

    useEffect(() => {
        const { user } = isAuthenticate();
        if (user) {
            setUserId(user._id);
        }
    }, [auth]);

    return (
        <div className='container-fluid top-bar'>
            {console.log('top bar render')}
            <div className="row main-bar">
                <div className='col-lg-1 col-md-1'>
                    <Link to='/'>
                        <img src='../pictures/logo.jpg' height={30} />
                    </Link>
                </div>
                <div className='col-lg-6 col-md-6' style={{ width: '100%' }}>
                    <Search handleSearch={handleSearch} />
                </div>
                <div className="col-lg-5 col-md-5 ">
                    <div className="row d-flex justify-content-end">
                        <Link to='/cart'>
                            <div className="shopping-cart">
                                <i className="fa fa-shopping-bag fa-2x" aria-hidden="true"></i>
                                <div className='cart-counter'>{cart.length}</div>
                            </div>
                        </Link>
                        {!isAuthenticate() &&
                            <React.Fragment>
                                <Link to='/signin'>
                                    <div className="signout">
                                        <i className="fa fa-sign-in" aria-hidden="true"></i>
                                        <span className='ml-1'>Đăng nhập</span>
                                    </div>
                                </Link>
                                <Link to='/signup'>
                                    <div className="signout">
                                        <i className="fa fa-registered" aria-hidden="true"></i>
                                        <span className='ml-1'>Đăng ký</span>
                                    </div>
                                </Link>
                            </React.Fragment>
                        }
                        {isAuthenticate() &&

                            <div className="signout" onClick={signOut}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                <span className='ml-1'>Đăng xuất</span>
                            </div>
                        }

                    </div>
                </div>
            </div>
            <div className="row func-list-bar">
                <ul className='func-list'>
                    <Link to='/all-products'>
                        <li>TẤT CẢ SẢN PHẨM</li>
                    </Link>
                    {isAuthenticate() && !isAdmin() &&
                        <React.Fragment>
                            <Link to={`/${userId}/history-purchase`}>
                                <li>LỊCH SỬ MUA HÀNG</li>
                            </Link>
                            <Link to='/'>
                                <li>XEM GẦN ĐÂY</li>
                            </Link>
                        </React.Fragment>
                    }
                    {isAuthenticate() && isAdmin() &&
                        <React.Fragment>
                            <Link to='/admin/categories'>
                                <li>QUẢN LÍ DANH MỤC</li>
                            </Link>
                            <Link to='/admin/products'>
                                <li>QUẢN LÝ SẢN PHẨM</li>
                            </Link>
                        </React.Fragment>
                    }
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

export default connect(
    mapStateToProps
)(TopBar)
