import React, { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  Image,
  Radio,
} from "antd";
import { googleAuthApi, signupApi } from "../../network/api/authApi";

import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { message, Typography } from "antd";
import { useGoogleLogin } from "@react-oauth/google";
const { Text, Title } = Typography;

const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    emailError: false,
    emailErrorMsg: "",
    usernameTextError: false,
    usernameTextErrorMsg: "",
  });
  const onFinish = async (values) => {
    let data = await signupApi(values);
    if (data && !Object?.keys(data)?.includes("error")) {
      message.success("User created sucessfully");
      navigate("/login");
    } else {
      if (data?.error && Object?.keys(data?.error?.data)?.includes("email")) {
        setErrors((err) => {
          return {
            ...err,
            emailError: true,
            emailErrorMsg: data?.error?.data?.email[0],
          };
        });
      }
      if (
        data?.error &&
        Object?.keys(data?.error?.data)?.includes("user_name")
      ) {
        setErrors((err) => {
          return {
            ...err,
            usernameTextError: true,
            usernameTextErrorMsg: data?.error?.data?.user_name[0],
          };
        });
      } else {
        message.error("error invalid data provide");
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      let login = await googleAuthApi({
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_secret: "secret",
        client_id: "client",
        token: codeResponse?.access_token,
      });
      if (Object.keys(login)[0] !== "error") {
        navigate("/");
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <Layout>
      <div className="login-wrap">
        <div className="login-form-wrap">
          <Link to="/">
            <img className="left-arrow" src="/left-arrow.png" />
          </Link>
          <div className="form-wrap">
            <Title level={2}>Registrar</Title>
            <Form
              className="form-wrap"
              layout="vertical"
              name="basic"
              initialValues={{
                game_master: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your gmail!",
                  },

                  {
                    type: "email",
                  },
                ]}
              >
                <Input className="text-field" size="large" />
              </Form.Item>
              {errors.emailError && (
                <Text type="danger">{errors.emailErrorMsg}</Text>
              )}
              <Form.Item
                label="Username"
                name="user_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input className="text-field" size="large" />
              </Form.Item>
              {errors.usernameTextError && (
                <Text type="danger">{errors.usernameTextErrorMsg}</Text>
              )}

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* <Form.Item
                label=" Sign up as Game Master"
                name="game_master"
                valuePropName="checked"
                className="checkbox"
              >
                <Checkbox></Checkbox>
              </Form.Item> */}
              <Form.Item name="game_master" className="checkbox">
                <Radio.Group name="game_master" defaultValue={true}>
                  <Radio value={false}>Player</Radio>
                  <Radio value={true}>Game Master</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{ marginBottom: 10 }}>
                <Button block type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
              <Title level={5} className="or-text">
                or
              </Title>
              <Button
                onClick={() => login()}
                className="google-btn"
                block
                type="primary"
                ghost
              >
                <Image
                  preview={false}
                  src="/google-icon.svg"
                  width={25}
                  height={25}
                />
                Sign in with Google
              </Button>
            </Form>
            <Link className="link-text" to="/login">
              already have an account
            </Link>
          </div>
        </div>
        <div className="login-thum-wrap">
          <img src="/login-thumb.png" />
        </div>
      </div>
    </Layout>
  );
};
export default SignupPage;
