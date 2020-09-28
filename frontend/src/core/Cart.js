import React, { useEffect, useState } from 'react'
import CCard from './Card'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { totalCart, getCart } from './cartHelper'
import Checkout from './Checkout'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    }
}));


const Cart = () => {

    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setProducts(getCart());
        totalPrice();
        console.log(totalPrice());
    }, [run])

    const totalPrice = () => {
        var total = 0;
        products.map(p => {
            total = total + p.count * p.price;
        })
        return total;
    }

    const showContinueShopping = () => {
        return <div className='element-center' style={{ marginTop: '200px' }}>
            <div>
                <RemoveShoppingCartIcon style={{ fontSize: '100px' }} />
            </div>
            <div element-center><h4>Cart empty</h4> Continue to shopping !!!</div>
        </div>
    }


    return (
        <div className='container-fluid'>
            {products.length === 0 &&
                <div className='element-center'>
                    {showContinueShopping()}
                </div>}
            {products.length !== 0 &&
                <div className='row'>
                    <div className='col-md-3'>
                        <Checkout products={products}
                            run={run}
                            setRun={setRun} />
                    </div>
                    <div className="col-md-9">
                        <Container className={classes.cardGrid} maxWidth="lg">
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                                {products.map((product, i) => (
                                    <CCard key={i}
                                        product={product}
                                        showAddToCart={false}
                                        showCartUpdate={true}
                                        showRemove={true}
                                        run={run}
                                        setRun={setRun}
                                        md={4}
                                    />
                                ))}
                            </Grid>
                        </Container>
                    </div>
                </div>
            }
        </div>
    );

};

export default Cart;
