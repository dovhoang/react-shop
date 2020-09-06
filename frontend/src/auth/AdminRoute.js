import React, { Component } from 'react'
import { isAuthenticate, isAdmin } from './apiAuth'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ children, ...rest }) => {
    return (
        <Route {...rest}
            render={props =>
                isAdmin() ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: '/signin',
                                state: { from: props.location }
                            }}
                        />
                    )
            }

        />);
};

export default AdminRoute; 