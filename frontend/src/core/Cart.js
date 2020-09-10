import React, { useEffect, useState } from 'react'
import CCard from './Card'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { totalCart, getCart } from './cartHelper'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    }
}));

const Cart = () => {

    const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(getCart());
    }, [getCart])
    return (
        <div>
            <div>
                Total: {totalCart()}
            </div>
            <Container className={classes.cardGrid} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {products.map((product, i) => (
                        <CCard key={i}
                            product={product}
                            showAddToCart={false}
                            showCartUpdate={true}
                            showRemove={true}
                        />
                    ))}
                </Grid>
            </Container>

        </div>
    );

};

export default Cart;
