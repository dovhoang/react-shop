import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { getProducts, searchProduct } from './apiCore'
import ShowImage from '../core/ShowImage'
import CCard from './Card'

import './Home.css'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4];

export default function Home(props) {
    console.log(props);
    const classes = useStyles();
    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');
    console.log(searchResults);
    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                setProductBySell(data);
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                setProductByArrival(data);
            }
        })
    }


    const loadSearchResult = () => {
        setSearchResults(props.search.searchResult);
        setSearched(props.search.searched)
    };

    useEffect(() => {
        loadProductBySell();
        loadProductByArrival();

    }, []);

    useEffect(() => {
        loadSearchResult();
    }, [props.search])

    const searchMessage = (result = []) => {
        let message = '';
        if (searched && result.length > 1) {
            message = `Found ${result.length} products`
        }
        if (searched && result.length === 1) {
            message = `Found ${result.length} product`;
        }
        if (searched && result.length === 0) {
            message = 'No products found';
        }

        return (message &&
            <h3 className="title-top5">
                <i className="fa fa-fire" aria-hidden="true"></i>
                {message}
                <hr />
            </h3>);
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {searchMessage(searchResults)}
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {searchResults && searchResults.map((product, i) => (
                            <CCard key={i} product={product} />
                        ))}
                    </Grid>
                </Container>
                {/* Hero unit */}
                <h3 className="title-top5">
                    <i className="fa fa-fire" aria-hidden="true"></i>
                       New arrival
                    <hr />
                </h3>
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {productByArrival.map((product, i) => (
                            <CCard key={i} product={product} />
                        ))}
                    </Grid>
                </Container>
                <h3 className="title-top5">
                    <i className="fa fa-fire" aria-hidden="true"></i>
                       Most popular
                    <hr />
                </h3>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={4}>
                        {productByArrival.map((product, i) => (
                            <CCard key={i} product={product} />
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Book Store
        </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Project for studying ReactJS!
        </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}