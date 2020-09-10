import React, { useState, useEffect } from 'react'
import { getSingleProduct, getRelatedProduct } from './apiCore'
import ShowImage from './ShowImage'
import '../index.css'
import './SingleProduct.css'
import CCard from './Card'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { scrollTop } from './Utils'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    }
}));


const SingleProduct = (props) => {
    const classes = useStyles();

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState('');


    const loadSingleProduct = productId => {
        getSingleProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                getRelatedProduct(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId)
    }, [props])

    return <div className='row'>
        <div className='row mt-3'>
            <div className="col-md-4 element-center">
                <ShowImage item={product} url='product' height={500} />
            </div>
            <div className="col-md-7">
                <div class="card">
                    <div class="card-body">
                        <div className="name"><h4>{product.name}</h4></div>
                        <div className="d-flex d-row justify-content-between mt-3">
                            <div className="price">Price: <br />
                                <span>{product.price} <i class="fa fa-usd" aria-hidden="true"></i></span></div>
                            <div className="sold">Sold:
                        <span> {product.sold} <i class="fa fa-book" aria-hidden="true"></i></span> </div>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div className="quantity "> Quantitly: <span>{product.quantity} g</span></div>
                            <div className="category">{product.category ? product.category.name : ''}</div>
                        </div>

                        <div className={`shipping mt-3 
                    ${product.shipping ? 'delivery-available' : 'delivery-unavailable'}`}>
                            <i class="fa fa-truck" aria-hidden="true"></i>
                            {product.shipping ?
                                ' Delivery service unavailable' : ' Delivery service unavailable'}
                        </div>
                        <div className='description mt-3'> Description: </div>
                        <div className="description-content">{product.description}</div>
                        <div className="mt-3 element-center">
                            <button className="btn btn-outline-primary">Add to card</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="row" style={{ display: relatedProduct ? '' : 'none' }}>
            <h3 className="title-top5">
                <i className="fa fa-fire" aria-hidden="true"></i>
                       Related product
                    <hr />
            </h3>
            <Container className={classes.cardGrid} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {relatedProduct.map((product) => (
                        <CCard key={product._id} product={product} onClick={scrollTop} />
                    ))}
                </Grid>
            </Container>
        </div>
    </div>
};

export default SingleProduct;