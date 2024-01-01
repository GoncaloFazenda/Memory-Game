import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    let auth = localStorage.getItem('username');

    return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
