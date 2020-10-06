import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signin, authenticate } from '../auth/apiAuth'
import { Redirect } from 'react-router-dom'
import { Link as Links } from 'react-router-dom'
import { connect } from 'react-redux'
import { AUTH } from '../ActionType'
import { createAction } from '@reduxjs/toolkit'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const auth = createAction('AUTH');

const mapDispatchToProps = dispatch => {
    return {
        auth: () => dispatch(auth())
    }
}


function SignIn(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToRender: false
    })


    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value
        })

    }

    const { email, password, loadding, redirectToRender } = values;

    const submitHandler = (event) => {
        event.preventDefault();
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data,
                        () => setValues({
                            ...values,
                            email: '',
                            password: '',
                            error: '',
                            redirectToRender: true
                        }));
                }

            });

    }

    const renderAfterSignIn = () => {
        if (redirectToRender) {
            props.auth();
            return <Redirect to="/" />
        }
    }


    const showError = () => {
        return (
            <div className='alert alert-danger' style={{ display: values.error ? "" : "none" }}>
                {values.error}
            </div>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Địa chỉ email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange('email')}
                        value={email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Một khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange('password')}
                        value={password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lưu thông tin đăng nhập"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={submitHandler}
                        style={{ backgroundColor: 'thistle', color: 'black' }}
                    >
                        Đăng nhập
                    </Button>
                    {showError()}
                    <Grid container>
                        <Grid item xs>
                            <Links to='#'>
                                Quên mật khẩu?
                            </Links>
                        </Grid>
                        <Grid item>
                            <Links to="/signup" variant="body2">
                                {"Chưa có tài khoản? Đăng ký"}
                            </Links>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {renderAfterSignIn()}
        </Container>
    );
}



export default connect(
    null,
    mapDispatchToProps
)(SignIn)