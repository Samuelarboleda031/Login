import React from 'react';
import Dashboard from '../components/Dashboard';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../slices/authSelectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="dashboard-page">
      <Dashboard />
    </div>
  );
};
export default DashboardPage;