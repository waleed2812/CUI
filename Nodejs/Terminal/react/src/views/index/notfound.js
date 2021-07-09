import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (

  <>
    <div className="w-100 h-100 flex-column justify-content-center align-items-center">
      <h1>404 Not Found</h1>
      <Link to='/' className="btn btn-primary text-decoration-none">Go Home</Link>
    </div>
  </>

);

export default NotFound;