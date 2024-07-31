import React, { useEffect, useState } from "react";
import { Typography, Menu, Image, Upload, Button } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImgCrop from "antd-img-crop";

import {
  SettingOutlined,
  FireOutlined,
  PlusOutlined,
  CameraFilled,
  LoadingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import {
  coverImageApi,
  profileImageApi,
} from "../../network/api/otherDetailsApi";
import { setPosterPic, setProfilePic } from "../../store/slices/authUser";

const { Title, Text } = Typography;

const MenuSettings = ({
  titleTextInfo,
  profile = false,
  fileList,
  setFileList,
  fileListCov,
  setFileListCov,
}) => {
  const [selectKey, setSelectKey] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const role = useSelector((state) => state.authUser.user.role_type);
  const ImageProfile = useSelector((state) => state.authUser.user.picture);
  const ImageCover = useSelector((state) => state.authUser.user.poster);
  const currentRoute = useLocation();
  const onChange = async (e) => {
    setLoading1(true);
    let file = e?.fileList[0]?.originFileObj;
    let type = e?.file?.type;
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("content_type", type);
      formData.append("image_type", "profile_picture");

      let data = await profileImageApi(formData);
      if (data?.data?.status_code == 200) {
        setFileList(data?.data?.data);
        dispatch(setProfilePic(data?.data?.data || ""));
      }
    }
    setLoading1(false);
  };
  const onChangeCov = async (e) => {
    setLoading2(true);
    // setLoading1(true);
    let file = e?.file;
    let type = e?.file?.type;
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("content_type", type);

      let data = await coverImageApi(formData);
      console.log("data", data);
      if (data?.data?.status_code == 200) {
        setFileListCov(data?.data?.data);
        dispatch(setPosterPic(data?.data?.data || ""));
      }
    }
    setLoading2(false);
  };
  const uploadButton = (
    <div>
      {loading1 ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(() => {
    const currentPathname = window.location.pathname;
    if (currentPathname == "/dashboard") {
      setSelectKey("dashboard");
    } else if (currentPathname == "/games") {
      setSelectKey("my-game");
    } else {
      setSelectKey("settings");
    }
  }, []);

  function hasGameMasterRole(arr) {
    const resultArray = Array.isArray(arr)
      ? arr.map((item) => {
          if (item?.role == "game_master") {
            return true;
          }
        })
      : null;
    return resultArray.includes(true);
  }

  return (
    <>
      <Menu
        mode="horizontal"
        className="nav-menu"
        defaultSelectedKeys={["settings"]}
        selectedKeys={selectKey}
      >
        {role?.length > 0 && Array.isArray(role) && hasGameMasterRole(role) && (
          <>
            <Menu.Item
              key={"my-game"}
              icon={<FireOutlined />}
              onClick={() => {
                navigate("/games");
                setSelectKey("my-game");
              }}
            >
              My Games
            </Menu.Item>
            {/* <Menu.Item
              key={"post-game"}
              icon={<FireOutlined />}
              onClick={() => {
                navigate("/games/create-game");
                setSelectKey("post-game");
              }}
            >
              Post a games
            </Menu.Item> */}
          </>
        )}
        <Menu.Item
          key={"dashboard"}
          icon={<DashboardOutlined />}
          onClick={() => {
            navigate("/dashboard");
            setSelectKey("dashboard");
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key={"settings"}
          onClick={() => {
            navigate("/settings");
            setSelectKey("settings");
          }}
          icon={<SettingOutlined />}
        >
          Settings
        </Menu.Item>
      </Menu>
      {/* <div className="container text-left mx-900">
        {currentRoute?.pathname != "/settings" && (
          <Link to="/settings">
            <img
              className="left-arrow"
              src="/left-arrow.png"
              width="32"
              height="32"
            />
          </Link>
        )}
        <div>
          <ImgCrop rotationSlider>
            <Upload
              // listType="picture-card"
              fileList={[]}
              onChange={onChange}
              multiple={false}
              accept={".png,.jpeg,.jpg"}
              // onPreview={onPreview}
              beforeUpload={() => {
                return false;
              }}
            >
              <Button
                circle
                icon={loading1 ? <LoadingOutlined /> : <CameraFilled />}
              >
                test
              </Button>
            </Upload>
          </ImgCrop>
        </div>
      </div> */}

      <div className="container mx-900">
        <div className="page-header">
          {profile && (
            <div className="cover-upload-btn">
              <ImgCrop rotationSlider>
                <Upload
                  // listType="picture-card"
                  fileList={[]}
                  onChange={onChangeCov}
                  multiple={false}
                  accept={".png,.jpeg,.jpg"}
                  // onPreview={onPreview}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <Button
                    circle
                    icon={loading2 ? <LoadingOutlined /> : <CameraFilled />}
                  ></Button>
                </Upload>
              </ImgCrop>
            </div>
          )}
          {(fileListCov || ImageCover) && (
            <img className="setting-cover" src={fileListCov || ImageCover} />
          )}
          <div className="setting-content">
            <Title level={2}>{titleTextInfo?.title}</Title>
            <Text className="profile-text">{titleTextInfo?.text}</Text>
          </div>
          {profile ? (
            <div className="profile-thumbnail">
              <ImgCrop rotationSlider>
                <Upload
                  // listType="picture-card"
                  fileList={[]}
                  onChange={onChange}
                  multiple={false}
                  accept={".png,.jpeg,.jpg"}
                  // onPreview={onPreview}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <Button
                    className="upload-iconbtn"
                    circle
                    icon={loading1 ? <LoadingOutlined /> : <CameraFilled />}
                  ></Button>
                </Upload>
              </ImgCrop>
              {(fileList || ImageProfile) && (
                <img src={fileList || ImageProfile} preview={false} />
              )}
            </div>
          ) : (
            <div className="profile-thumbnail">
              {(fileList || ImageProfile) && (
                <img src={fileList || ImageProfile} preview={false} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuSettings;
