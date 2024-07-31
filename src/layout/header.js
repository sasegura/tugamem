import {
  Layout,
  Button,
  Space,
  Image,
  Typography,
  Dropdown,
  Avatar,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { becomeaGmApi } from "../network/api/authApi";
import { getCookie } from "../utils/utils";
import { setSignOut } from "../store/slices/authUser";
import {
  DashboardOutlined,
  LogoutOutlined,
  AlignRightOutlined,
  ExclamationCircleFilled,
  FireOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { confirm } = Modal;
export default function Header() {
  const dispatch = useDispatch();
  const [togle, setTogle] = useState(false);
  const { Header } = Layout;
  const { Title } = Typography;
  const token =
    useSelector((state) => state.authUser.accessToken) ||
    getCookie("accessToken");
  const ImageProfile = useSelector((state) => state.authUser.user.picture);
  const role = useSelector((state) => state.authUser.user.role_type);

  const navigate = useNavigate();
  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to become a Game Master?",
      icon: <ExclamationCircleFilled />,
      // content:
      //   "When clicked the OK button, this dialog will be closed after 1 second",
      onOk: async () => {
        let res = await becomeaGmApi();
        if (res?.status_code == 200) {
          navigate("/game-master");
        }
      },
      onCancel() { },
    });
  };

  const itemsClient = [
    {
      label: (
        <Link to={"/dashboard"}>
          <DashboardOutlined />
          DashBoard
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link onClick={showPromiseConfirm}>
          <FireOutlined />
          Become A GM
        </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          onClick={() => {
            dispatch(setSignOut());
            document.cookie =
              "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }}
          to={"/"}
        >
          <LogoutOutlined />
          Logout
        </Link>
      ),
      key: "2",
    },
  ];
  const itemsGm = [
    {
      label: (
        <Link to={"/dashboard"}>
          <DashboardOutlined />
          DashBoard
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          onClick={() => {
            dispatch(setSignOut());
            document.cookie =
              "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }}
          to={"/"}
        >
          <LogoutOutlined />
          Logout
        </Link>
      ),
      key: "1",
    },
  ];
  function hasGameMasterRole(arr) {
    const resultArray = Array.isArray(arr)
      ? arr?.map((item) => {
        if (item?.role == "game_master") {
          return true;
        }
      })
      : null;
    return resultArray?.includes(true);
  }
  let items =
    role?.length > 0 && hasGameMasterRole(role) ? itemsGm : itemsClient;
  return (
    <>
      <Header className="main-header">
        <Space
          size={18}
          className="logo-wrap"
          onClick={() => {
            navigate("/");
          }}
        >
          <Title level={4}>TuGameMaster</Title>
        </Space>
        <div className={`header-right ${togle ? "show" : ""}`}>
          <Button
            type="text"
            className="toggle-menu"
            icon={<AlignRightOutlined />}
            onClick={() => {
              setTogle(!togle);
            }}
          ></Button>
          <Space className="menu-wrap" size={15}>
            <Space className="links" size={15}>
              <Link to="/find-games">Find Games</Link>
              <Link to="/find-game-master">Find GM</Link>
              <Link to="/blog-post">Blogs</Link>
            </Space>
            {!token ? (
              <Link to="/login">Login</Link>
            ) : (
              <Dropdown
                className="side-dropdown"
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar src={ImageProfile || "/user_profile.png"} />
                </a>
              </Dropdown>
            )}
          </Space>
          {!token && (
            <Button
              className="primary-btn"
              size="large"
              type="primary"
              href="/signup"
            >
              Sign Up
            </Button>
          )}
        </div>
      </Header>
    </>
  );
}
