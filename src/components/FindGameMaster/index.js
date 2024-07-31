import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Tag,
  Form,
  Input,
  InputNumber,
  Button,
  Menu,
  Image,
  Upload,
  Select,
  Checkbox,
  DatePicker,
  Spin,
  Dropdown,
  Popover,
  Row,
  Col,
  Pagination,
  Slider,
} from "antd";
import { convert } from "html-to-text";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  getFindGMPublicApi,
  getFindGmPublicApi,
} from "../../network/api/otherDetailsApi";
import GmComp from "../HomePage/gmComp";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const FindGameMaster = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apply, setApply] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();

  const [language, setLanguage] = useState("");
  const [gmList, setGmList] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const LoadmoreApiCall = async (data) => {
    try {
      setLoading(true);
      let games = await getFindGMPublicApi({
        offset,
        language,
        search,
      });
      if (games?.status_code == 200) {
        setGmList([...gmList, ...games?.data?.results]);

        setCount(games?.data?.count);
        if (games?.data?.count > offset + 4) {
          setOffset(offset + 4);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function ListApiCalls() {
      setLoading(true);
      let games = await getFindGMPublicApi({ offset: 0, language, search });
      if (games?.status_code == 200) {
        setGmList(games?.data?.results || []);
        setCount(games?.data?.count);
        if (games?.data?.count > offset + 4) {
          setOffset(offset + 4);
        } else {
          setHasMore(false);
        }
      }

      setLoading(false);
    }
    ListApiCalls();
  }, [apply]);
  return (
    <>
      <div className="find-games-wrapper">
        <div className="sub-banner">
          <div className="container">
            <Title level={2}>Find Game Master</Title>
            <Text className="profile-text">
              Play D&D and Other Tabletop Roleplaying Games Online
            </Text>
          </div>
        </div>
        <div className="filter-wrap">
          <Form layout="vertical">
            <Space className="filter-inr" size={16}>
              <Space size={30}>
                <Form.Item label="Search By Name">
                  <Input
                    placeholder="Search GM"
                    value={search}
                    style={{
                      width: 250,
                    }}
                    onChange={(ss) => {
                      setSearch(ss.target.value);
                    }}
                    size="large"
                  />
                </Form.Item>
                <Form.Item label="Language">
                  <Select
                    showSearch
                    placeholder="Language"
                    value={language}
                    size="large"
                    style={{
                      width: 180,
                    }}
                    onChange={(lang) => {
                      setLanguage(lang);
                    }}
                    options={[
                      {
                        value: "Español",
                        label: "Español",
                      },
                      {
                        value: "Catalán",
                        label: "Catalán",
                      },
                      {
                        value: "Euskera",
                        label: "Euskera",
                      },
                      {
                        value: "Gallego",
                        label: "Gallego",
                      },
                      {
                        value: "Valenciano",
                        label: "Valenciano",
                      },
                    ]}
                  />
                </Form.Item>
                {/* <Form.Item label="Cost">
                  <Slider
                    style={{ width: 150 }}
                    tooltip={{
                      open: true,
                      placement: "bottom",
                    }}
                    range
                    defaultValue={[0, 100]}
                  />
                </Form.Item> */}
              </Space>
              <Space className="apply-filters">
                <Button
                  size="large"
                  className="clear-filter"
                  ghost
                  onClick={() => {
                    setApply(!apply);
                  }}
                >
                  Apply
                </Button>
                <Button
                  className="clear-filter"
                  ghost
                  size="large"
                  onClick={() => {
                    setSearch("");
                    setLanguage("");
                    setApply(!apply);
                  }}
                >
                  Clear Filter
                </Button>
              </Space>
            </Space>
          </Form>
          <div className="container">
            <Spin spinning={loading} size="large">
              <Row style={{ marginTop: 30 }} gutter={[16, 16]}>
                {gmList?.length > 0 &&
                  gmList?.map(
                    (gm) =>
                      gm && (
                        <Col xs={24} sm={24} md={24}>
                          <div
                            className="team-card find-gm-card"
                            onClick={() => {
                              navigate(`/game-master/${gm.id}`);
                            }}
                          >
                            <div>
                              <Image
                                preview={false}
                                width={130}
                                height={130}
                                src={gm?.user?.picture || "/user_profile.png"}
                              />
                            </div>
                            <div className="gm-page-listing">
                              <Title className="card-heading" level={4}>
                                {gm?.name}
                              </Title>
                              <Text className="text">
                                {gm?.total_reviews
                                  ? `(${gm?.average_reviews}) ${gm?.total_reviews} reviews`
                                  : "No reviews "}
                              </Text>
                              <ul className="team-list">
                                <li>
                                  {/* <strong>{gm?.experience_game_master}</strong> years as a GM    */}
                                  <strong>{gm?.experience_game_master}</strong>{" "}
                                  years as a GM
                                </li>
                                <li>
                                  <strong>{gm?.games_hosted}</strong> Games
                                  Hosted
                                </li>
                              </ul>
                            </div>
                            <div>
                              <p>
                                {convert(gm?.about_me_game_master, {
                                  wordwrap: 130,
                                }).substring(0, 780) + "..."}
                              </p>
                            </div>
                          </div>
                        </Col>
                      )
                  )}
              </Row>
              {/* <Pagination
                defaultCurrent={1}
                pageSize={4}
                showSizeChanger={false}
                onChange={LoadmoreApiCall}
                total={count}
              /> */}
              {hasMore && (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    !loading && LoadmoreApiCall();
                  }}
                >
                  Load More {loading && <LoadingOutlined />}
                </Button>
              )}
            </Spin>
          </div>
          {/* <div className="container">
            <Spin spinning={loading} size="large"> */}
          {/* <Row style={{ marginTop: 30 }} gutter={[16, 16]}>
                {gmList?.length > 0 &&
                  gmList?.map(
                    (gm) =>
                      gm && (
                        <Col xs={ 24} sm={24} md={24}>
                          <GmComp gm={gm} />
                        </Col>
                      )
                  )}
              </Row> */}
          {/* <Pagination
                defaultCurrent={1}
                pageSize={4}
                showSizeChanger={false}
                onChange={LoadmoreApiCall}
                total={count}
              /> */}
          {/* </Spin>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FindGameMaster;
