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
import MenuSettings from "../Settings/settingsMenu";

const { Title, Text } = Typography;

const DashBoard = () => {
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
            title: "DashBoard",
            text: "Your dashboard for managing daily tasks",
          }}
        />

        <div className="container setting-con">
          <Row
            gutter={[
              { xs: 16, sm: 16, md: 16, lg: 70 },
              { xs: 16, sm: 12, md: 16, lg: 70 },
            ]}
          >
            {role?.length > 0 &&
              Array?.isArray(role) &&
              hasGameMasterRole(role) && (
                <>
                  <Col xs={24} sm={12} md={12}>
                    <Card
                      className="setting-cards benefit-box"
                      bodyStyle={{ padding: 0 }}
                      onClick={() => navigate("/payouts-over")}
                    >
                      <DollarOutlined />
                      <Title level={4}>Payouts</Title>
                      <Text className="text">Your Payout Details</Text>
                    </Card>
                  </Col>
                </>
              )}

            <Col xs={24} sm={12} md={12}>
              <Card
                className="setting-cards benefit-box"
                bodyStyle={{ padding: 0 }}
                onClick={() => navigate("/my-payments")}
              >
                <DollarOutlined />
                <Title level={4}>Bookings</Title>
                <Text className="text">Your Booked Game Sessions</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <Card
                className="setting-cards benefit-box"
                bodyStyle={{ padding: 0 }}
                onClick={() => navigate("/chats")}
              >
                <MessageOutlined />

                <Title level={4}>Chats</Title>
                <Text className="text">Check Your Messages</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
