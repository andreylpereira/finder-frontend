import React from "react";
import { Alert, Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Bread = ({ current }) => {
  const location = useLocation();
  return (
    <Alert variant="light" className="pb-0 shadow-sm">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={location}>Dashboard</Link> 
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{current}</Breadcrumb.Item>
      </Breadcrumb>
    </Alert>
  );
};

export default Bread;
