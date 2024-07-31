import React, { useEffect, useState } from "react";
import {
  Typography,
  Image,
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Spin,
  message,
  Col,
  Row,
} from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

import TextEditor from "./textEditor";

import { useNavigate } from "react-router-dom";
import { getGmMeApi, updateGmProApi } from "../../network/api/authApi";
import MenuSettings from "./settingsMenu";

const { TextArea } = Input;

const { Title, Text } = Typography;

const GamerMasterProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({
    nameError: false,
    nameErrorMsg: "",
    aboutMeTextError: false,
    aboutMeTextErrorMsg: "",
    discordError: false,
    discordErrorMsg: "",
    gametoolsError: false,
    gametoolsMsg: "",
  });

  const onFinish = async (values) => {
    let data = await updateGmProApi(values);

    if (data?.status == 200) {
      // message.success("Update sucessfully");
      navigate("/");
    } else {
      if (data?.status == 400) {
        if (Object?.keys(data?.data)?.includes("name")) {
          setErrors((err) => {
            return {
              ...err,
              nameError: true,
              nameErrorMsg: data?.data?.name[0],
            };
          });
        }
        if (Object?.keys(data?.data)?.includes("about_me_game_master")) {
          setErrors((err) => {
            return {
              ...err,
              aboutMeTextError: true,
              aboutMeTextErrorMsg: data?.data?.about_me_game_master[0],
            };
          });
        }
        if (Object?.keys(data?.data)?.includes("discord_tag")) {
          setErrors((err) => {
            return {
              ...err,
              discordError: true,
              discordErrorMsg: data?.data?.discord_tag[0],
            };
          });
        }
        if (Object?.keys(data?.data)?.includes("game_tools")) {
          setErrors((err) => {
            return {
              ...err,
              gametoolsError: true,
              gametoolsMsg: data?.data?.game_tools[0],
            };
          });
        }
      }
    }
  };

  useEffect(() => {
    async function ListApiCalls() {
      setLoading(true);
      let data = await getGmMeApi();
      if (data) {
        let formSetData = {
          name: data?.data?.data?.name,
          about_me_game_master: data?.data?.data?.about_me_game_master,
          experience_game_master: data?.data?.data?.experience_game_master,
          experience_player: data?.data?.data?.experience_player,
          discord_tag: data?.data?.data?.discord_tag,
          game_tools: data?.data?.data?.game_tools,
        };

        form.setFieldsValue(formSetData);
      }
      setLoading(false);
    }
    ListApiCalls();
  }, []);

  return (
    <Spin spinning={loading} size="large">
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Game Master Profile",
            text: "Update information with ease",
          }}
        />

        <div className="container forms-wrap">
          <Form
            form={form}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="startgames-forms"
          >
            <div className="forms-wrapper">
              <Form.Item
                label={"Name"}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid name",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your name you want to use as a game master"
                  size="large"
                />
              </Form.Item>
              {errors.nameError && (
                <Text type="danger">{errors.nameErrorMsg}</Text>
              )}
              <Form.Item
                label="About Me"
                name="about_me_game_master"
                rules={[
                  {
                    required: true,
                    message: "Please input your About!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid text",
                  },
                ]}
              >
                <TextEditor />
              </Form.Item>
              {errors.aboutMeTextError && (
                <Text type="danger">{errors.aboutMeTextErrorMsg}</Text>
              )}
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Experience as a Player"
                    name="experience_player"
                    rules={[
                      {
                        required: true,
                        message: "Please input your experience!",
                      },
                    ]}
                    initialValue={0}
                  >
                    <InputNumber
                      size="large"
                      className="counter-field"
                      placeholder="Enter your experience as a player in years"
                      min={1}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Experience as a Game Master"
                    name="experience_game_master"
                    rules={[
                      {
                        required: true,
                        message: "Please input your experience as GM!",
                      },
                    ]}
                    initialValue={0}
                  >
                    <InputNumber
                      size="large"
                      className="counter-field"
                      placeholder="Enter your experience as a game master in years"
                      min={1}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Discord Tag"
                name="discord_tag"
                rules={[
                  {
                    required: true,
                    message: "Please input your discord tag!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid name",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter your discord tag" />
              </Form.Item>
              {errors.discordError && (
                <Text type="danger">{errors.discordErrorMsg}</Text>
              )}
              <Form.Item
                label="What tools do you use in games"
                name="game_tools"
                rules={[
                  {
                    required: true,
                    message: "Please input your games tool!",
                  },
                ]}
              >
                <TextEditor />
              </Form.Item>
              {errors.gametoolsError && (
                <Text type="danger">{errors.gametoolsMsg}</Text>
              )}
              <Form.Item>
                <Button
                  className="submit-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default GamerMasterProfile;
