import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ShowImage from '../core/ShowImage'
import { setCardItem, addCartItem, updateItem, removeItem } from './cartHelper'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },

}));

const CCard = ({ product,
    onClick,
    showAddToCart = true,
    showCartUpdate = false,
    showRemove = false }) => {

    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCartHandler = () => {
        addCartItem(product, () => {
            setRedirect(true);
        })
    }

    const redirectToCart = () => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const handleChange = (e) => {
        setCount(e.target.value < 1 ? 1 : e.target.value);
        if (e.target.value > 1) {
            updateItem(product._id, e.target.value)
        }
    }
    const showCartUpdateQuantity = () => {
        return (showCartUpdate &&
            <div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input type="number" className="form-control" value={count} onChange={handleChange} />
                </div>
            </div>
        )
    }

    const showRemoveProductInCart = () => {
        return (showRemove &&
            <Button size="small" color="danger"
                onClick={removeProductInCart}>
                Delete
            </Button>
        );
    }

    const removeProductInCart = () => {
        removeItem(product._id);
    }

    return <Grid item xs={6} sm={4} md={3}>
        <Card className={classes.card}>
            <ShowImage item={product} url='product' height={300} />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom component="h2">
                    {product.name}
                </Typography>
                <Typography>
                    Price: {product.price} $
                </Typography>
                <Typography>
                    {showCartUpdateQuantity()}

                </Typography>

            </CardContent>
            {redirectToCart()}
            <CardActions>
                <Link to={`/product/${product._id}`}>
                    <Button size="small" color="primary" onClick={onClick}>
                        View Product
                    </Button>
                </Link>
                {showRemoveProductInCart()}
                {showAddToCart && <Button size="small" color="primary" onClick={addToCartHandler}>
                    Add To Cart
                </Button>}

            </CardActions>
        </Card>
    </Grid>
};

export default CCard;