import React, { Component } from 'react'
import { isAuthenticate, isUserRegister } from './apiAuth'
import { Route, Redirect } from 'react-router-dom'

const UserRoute = ({ children, ...rest }) => {
    return (<Route
        {...rest}
        render={(props) => (
            isUserRegister() ? (
                children
            ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
        )}

    />);
};

export default UserRoute; 