import React, { useEffect, useState } from "react";
import { Typography, Form, Input, Col, Row, Select, Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

import TextEditor from "./textEditor";

import { useNavigate } from "react-router-dom";
import { getGmMeApi, updateGmProApi } from "../../network/api/authApi";
import MenuSettings from "./settingsMenu";

const { TextArea } = Input;

const { Title, Text } = Typography;

const Payouts = () => {
  return (
    <>
      {/* <MenuSettings
        titleTextInfo={{
          title: "Game Master Profile",
          text: "Update information with ease",
        }}
      /> */}
      <div className="forms-wrapper payouts-wrap">
        <Title level={3}>Payouts</Title>
        <Title level={4}>Complete your payout profile</Title>
        <p className="section-paragraph">
          Para empezar a crear partidas en TuGameMaster, será necesario que crees un perfil de pagos. Una vez completado, podrás cobrar y retirar el saldo a tu cuenta bancaria!
        </p>
        <Title level={4}>
          Nuestra web se mantiene quedándose un 10% de las reservas de las partidas.
        </Title>
        <p className="section-paragraph">
          {" "}
          Si necesitas ayuda, contacta a nuestro equipo de magos y duendes en {" "}
          <a href="mailto:ayuda@tugamemaster.com">
            ayuda@tugamemaster.com
          </a>
        </p>
        <Form layout="vertical" name="basic" autoComplete="off">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Legal Name"
                name="legal_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Legal Name!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid name",
                  },
                ]}
              >
                <Input placeholder="Enter Your Legal Name" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Legal Last Name"
                name="legal_last_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Legal Last Name!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid name",
                  },
                ]}
              >
                <Input placeholder="Enter Your Legal Last Name" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Account Type"
                name="individual"
                rules={[
                  {
                    required: true,
                    message: "Please select your Country",
                  },
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                  ]}
                >
                  {/* <Select.Option>abc</Select.Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please select your Country",
                  },
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                  ]}
                >
                  {/* <Select.Option>abc</Select.Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} className="text-right">
              <Form.Item>
                <Button type="primary" size="large">
                  Continuar a Stripe
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Payouts;
