import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import routes from './helpers/routes';
import { PrivateRoute } from './routers/PrivateRoute';

const Router = () => {
  const location = useLocation();
  return (
    <Routes>
      {location.pathname === '/' ? (
        <Route path="/" element={<Navigate to={'/login'} replace />} />
      ) : null}
      {routes.map((route) => {
        if (!route?.isPrivate) {
          return (
            <Route
              key={route.key}
              path={route.path as string}
              element={<route.Component />}
            />
          );
        } else {
          return (
            <Route
              key={route.key}
              path={route.path as string}
              element={
                <PrivateRoute>
                  <route.Component />
                </PrivateRoute>
              }
            />
          );
        }
      })}
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default Router;
