import React, { useEffect } from "react";
import {
  Typography,
  Menu,
  Button,
  Image,
  Space,
  Tag,
  Row,
  Col,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  UserOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  MessageOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import MenuSettings from "./settingsMenu";

const { Title, Text } = Typography;

const Settings = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.authUser.user.role_type);

  function hasGameMasterRole(arr) {
    const resultArray = arr?.map((item) => {
      if (item?.role == "game_master") {
        return true;
      } else {
        return false;
      }
    });
    return resultArray.includes(true);
  }
  return (
    <>
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Personal Profile",
            text: "Update information with ease",
          }}
        />

        <div className="container setting-con">
          <Row
            gutter={[
              { xs: 16, sm: 16, md: 16, lg: 70 },
              { xs: 16, sm: 12, md: 16, lg: 70 },
            ]}
          >
            <Col xs={24} sm={12} md={12}>
              <Card
                className="setting-cards benefit-box"
                onClick={() => navigate("/personal-profile")}
                bodyStyle={{ padding: 0 }}
              >
                <UserOutlined />

                <Title level={4}>Personal Profile</Title>
                <Text className="text">
                  Edit your Personal Profile with ease
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <Card
                className="setting-cards benefit-box"
                onClick={() => navigate("/change-password")}
                bodyStyle={{ padding: 0 }}
              >
                <EllipsisOutlined />
                <Title level={4}>Change Password</Title>
                <Text className="text">Change Your Password</Text>
              </Card>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={12}
              onClick={() => navigate("/delete-account")}
            >
              <Card
                className="setting-cards benefit-box"
                bodyStyle={{ padding: 0 }}
              >
                <DeleteOutlined />
                <Title level={4}>Delete Account</Title>
                <Text className="text">Delete Your Account</Text>
              </Card>
            </Col>

            {role?.length > 0 &&
              Array?.isArray(role) &&
              hasGameMasterRole(role) && (
                <>
                  <Col span={12} onClick={() => navigate("/game-master")}>
                    <Card
                      className="setting-cards benefit-box"
                      bodyStyle={{ padding: 0 }}
                    >
                      <DeleteOutlined />
                      <Title level={4}>Game Master Profile</Title>
                      <Text className="text">
                        Edit your Game Master with ease
                      </Text>
                    </Card>
                  </Col>
                </>
              )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Settings;
