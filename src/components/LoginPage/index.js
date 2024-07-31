import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Form, Input, Typography, Image, Layout } from "antd";
import { googleAuthApi, loginApi } from "../../network/api/authApi";
import { googleLogout, useGoogleLogin, GoogleLogin } from "@react-oauth/google";

const { Title, Text } = Typography;
const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async ({ email, password }) => {
    let login = await loginApi({
      username: email,
      password,
      grant_type: "password",
      client_secret: "secret",
      client_id: "client",
    });
    if (Object.keys(login)[0] !== "error") {
      navigate("/");
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
            <Title level={2}>Login</Title>
            <Form
              layout="vertical"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Button
                className="google-btn"
                block
                type="primary"
                ghost
                onClick={() => login()}
              >
                <Image
                  preview={false}
                  src="/google-icon.svg"
                  width={25}
                  height={25}
                />
                Inicia con Google
              </Button>
              <Title level={5} className="or-text">
                or
              </Title>
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
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" size="large" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Link className="link-text" to="/signup">
                Registrar una cuenta
              </Link>
            </Form>
          </div>
        </div>
        <div className="login-thum-wrap">
          <img src="/login-thumb.png" />
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
