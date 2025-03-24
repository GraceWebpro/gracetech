import React from "react";
import { Col } from "react-bootstrap";

const Tab = props => {
  return <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
    {props.children}
    </Col>;
};

export default Tab;
