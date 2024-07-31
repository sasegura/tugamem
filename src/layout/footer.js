import { Col, Row, Typography, Divider, Space, Image } from "antd";
import React from "react";

import { useNavigate } from "react-router-dom";

const { Title } = Typography;
export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="default-footer">
        <div className="container">
          <Divider className="seprator" />
          <Row gutter={15}>
            {/* <Col xs={12} sm={8} md={5}>
              {" "}
              <Title level={5}>Start Playing</Title>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Partnerships</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </Col> */}
            <Col xs={12} sm={8} md={5}>
              {" "}
              <Title level={5}>Browse</Title>
              <ul>
                <li>
                  <a
                    onClick={() => {
                      navigate("/find-games");
                    }}
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/find-game-master");
                    }}
                  >
                    GMs
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={8} md={4}>
              {" "}
              <Title level={5}>Policy</Title>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Partnerships</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={8} md={4}>
              {" "}
              <Title level={5}>Support</Title>
              <ul>
                <li>
                  <a href="#">Refunds</a>
                </li>
                <li>
                  <a href="#">Contact support</a>
                </li>
                <li>
                  <a href="#">Report</a>
                </li>
                <li>
                  <a href="#">FaQ</a>
                </li>
              </ul>
            </Col>
            <Col className="text-left" xs={12} sm={16} md={6}>
              <Title level={5}>Your Account</Title>
              <ul>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
              <Title className="follow-us" level={5}>
                Follow Us
              </Title>
              <Space>
                <a href="#">
                  <Image
                    width={40}
                    height={40}
                    preview={false}
                    src={"/twitter.png"}
                  />
                </a>
                <a href="#">
                  <Image
                    width={40}
                    height={40}
                    preview={false}
                    src={"/facebook.png"}
                  />
                </a>
                <a href="#">
                  <Image
                    width={40}
                    height={40}
                    preview={false}
                    src={"/instagram.png"}
                  />
                </a>
                <a href="#">
                  <Image
                    width={40}
                    height={40}
                    preview={false}
                    src={"/linkedin.png"}
                  />
                </a>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
