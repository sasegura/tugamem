import React, { useEffect, useState } from "react";
import { Typography, Menu, Image, Form, Input, Button, Checkbox } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { deleteAccountApi } from "../../network/api/authApi";

import { useNavigate } from "react-router-dom";
import MenuSettings from "./settingsMenu";
const { Title, Text } = Typography;

const DeleteAccount = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let data = await deleteAccountApi({
      password: values?.password,
      delete_reason: values?.whyLeaving,
    });
    if (data?.status == "200") {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="profile-head"></div>
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Delete Account",
            text: "We are sorry to see you leave",
          }}
        />

        <div className="container forms-wrap">
          <Form
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="startgames-forms"
          >
            <div className="forms-wrapper">
              <Form.Item
                label="Enter Password"
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
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                label="Why are you leaving?"
                name="whyLeaving"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item>
                <Button
                  className="submit-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Delete
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
