import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    return (
        <Route
            {...rest}
            element={
                !loading ? (
                    isAuthenticated ? (
                        <Element />
                    ) : (
                        <Navigate to="/login" />
                    )
                ) : null
            }
        />
    );
};

export default ProtectedRoute;
