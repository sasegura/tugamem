import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Typography,
  Menu,
  Image,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { changePasswordApi } from "../../network/api/authApi";
import MenuSettings from "./settingsMenu";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { TextArea } = Input;
const { Title, Text } = Typography;

const ChangePassword = () => {
  const navigate = useNavigate();
  // const [selectedTimezone, setSelectedTimezone] = useState(
  //   Intl.DateTimeFormat().resolvedOptions().timeZone
  // );
  const onFinish = async (values) => {
    let datta = await changePasswordApi({
      old_password: values.oldPassword,
      new_password: values.newPassword,
    });
    if (datta?.status == "200") {
      navigate("/");
    }
  };
  return (
    <>
      <div className="profile-head"></div>
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Change Password",
            text: "Update your password and keep your account safe",
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
                label="Old Password"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your Old password!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your New Password!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                label="Confrim Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
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
              <Form.Item>
                <Button
                  className="submit-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Change Password
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
