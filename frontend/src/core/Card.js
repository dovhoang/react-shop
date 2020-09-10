import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ShowImage from '../core/ShowImage'

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

const CCard = ({ product, onClick }) => {

    const classes = useStyles();

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
            </CardContent>
            <CardActions>
                <Link to={`/product/${product._id}`}>

                    <Button size="small" color="primary" onClick={onClick}>
                        View Product
                </Button>
                </Link>
                <Button size="small" color="primary">
                    Add To Cart
                </Button>
            </CardActions>
        </Card>
    </Grid>
};

export default CCard;