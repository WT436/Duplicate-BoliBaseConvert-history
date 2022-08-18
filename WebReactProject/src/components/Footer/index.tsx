import "./style.css";
import * as React from 'react';
import { Col } from 'antd';
import { L } from '../../lib/abpUtility';

const Footer = () => {
  return (
      <Col className={"footer"}>
        {L('Common.FooterInfo')}
      </Col>
  );
};
export default Footer;
