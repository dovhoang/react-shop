import React from 'react'

const Layout = props => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
            <div className={props.className}>
                {props.children}
            </div>
        </div>
    );
};

export default Layout; 