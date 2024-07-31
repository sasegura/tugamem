import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Form,
  Input,
  Button,
  Select,
  Spin,
  Dropdown,
  Popover,
  Row,
  Col,
  Pagination,
  Slider,
  DatePicker,
} from "antd";
import {
  getFindGamesPublicApi,
  maxCostDurApi,
} from "../../network/api/otherDetailsApi";
import GameComp from "../HomePage/gameComp";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

const FindALLGames = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [durationRange, setdurationRange] = useState([0, 0]);
  const [costRange, setCostRange] = useState([0, 0]);
  const [experience, setExperience] = useState("");
  const [maxDuration, setMaxDuration] = useState(0);
  const [maxCost, setMaxCost] = useState(0);
  const [open, setOpen] = useState(false);

  const [apply, setApply] = useState(false);
  const [cost, setOpenCost] = useState(false);

  const [gameList, setGameList] = useState([]);
  const [count, setCount] = useState(0);

  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleOpenCost = (newOpen) => {
    setOpenCost(newOpen);
  };

  const LoadmoreApiCall = async (data) => {
    try {
      setLoading(true);
      let games = await getFindGamesPublicApi({
        offset: (data - 1) * 4,
        durationRange,
        date: date ? dayjs(date).format("YYYY-MM-DD") : "",
        costRange,
        experience,
      });
      if (games?.status_code == 200) {
        setGameList(games?.data?.results);

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
  const DurationSliderFor = (value) => {
    return `${value} hours`;
  };
  const CostSliderFor = (value) => {
    return `${value} eur`;
  };

  useEffect(() => {
    async function ListApiCalls() {
      setLoading(true);
      let data = await maxCostDurApi();
      if (data?.status_code == 200) {
        setMaxCost(data?.data?.max_cost);
        setMaxDuration(data?.data?.max_duration);
      }
      let games = await getFindGamesPublicApi({
        offset: 0,
        durationRange,
        date: date ? dayjs(date).format("YYYY-MM-DD") : "",
        costRange,
        experience,
      });
      if (games?.status_code == 200) {
        setGameList(games?.data?.results || []);
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
            <Title level={2}>Find Games</Title>
            <Text className="profile-text">
              Play D&D and Other Tabletop Roleplaying Games Online
            </Text>
          </div>
        </div>
        <div className="filter-wrap">
          <Spin spinning={loading} size="large">
            <Form layout="vertical">
              <Space wrap className="filter-inr" size={16}>
                <Space className="filter-form-wrap" wrap size={30}>
                  <Form.Item label="Duration">
                    <Slider
                      max={maxDuration}
                      range
                      style={{ width: "9.375rem" }}
                      tooltip={{
                        open: true,
                        placement: "bottom",
                        formatter: DurationSliderFor,
                        getPopupContainer: (triggerNode) =>
                          triggerNode.parentElement,
                      }}
                      value={durationRange}
                      onChange={(value) => {
                        setdurationRange(value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Date">
                    <DatePicker
                      value={date}
                      ghost
                      size="large"
                      onChange={(date) => {
                        setDate(date);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Cost">
                    <Slider
                      max={maxCost}
                      range
                      value={costRange}
                      onChange={(value) => {
                        setCostRange(value);
                      }}
                      tooltip={{
                        open: true,
                        placement: "bottom",
                        formatter: CostSliderFor,
                        getPopupContainer: (triggerNode) =>
                          triggerNode.parentElement,
                      }}
                      style={{ width: "9.375rem" }}
                    />
                  </Form.Item>
                  {/* <Search
                placeholder="input search text"
                style={{
                  width: 300,
                }}
                size="large"
              /> */}
                  <Form.Item label="Required Experienced">
                    <Select
                      value={experience}
                      onChange={(value) => {
                        console.log(value);
                        setExperience(value);
                      }}
                      size="large"
                      style={{
                        width: "11.25rem",
                      }}
                      options={[
                        {
                          value: "not_required",
                          label: "Not Required",
                        },
                        {
                          value: "beginner",
                          label: " Beginner",
                        },
                        {
                          value: "experienced",
                          label: "Experienced",
                        },
                        {
                          value: "expert",
                          label: "Expert",
                        },
                      ]}
                    />
                  </Form.Item>
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
                    size="large"
                    className="clear-filter"
                    ghost
                    onClick={() => {
                      setCostRange([0, 0]);
                      setDate("");
                      setdurationRange([0, 0]);
                      setExperience("");
                      setApply(!apply);
                    }}
                  >
                    Clear Filter
                  </Button>
                </Space>
              </Space>
            </Form>
            <div className="container">
              <Row style={{ marginTop: 30 }} gutter={[16, 16]}>
                {gameList?.length > 0 &&
                  gameList?.map((game) => {
                    return (
                      <>
                        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                          <GameComp game={game} />
                        </Col>
                      </>
                    );
                  })}
              </Row>
              {count > 0 && (
                <Pagination
                  defaultCurrent={1}
                  pageSize={4}
                  showSizeChanger={false}
                  onChange={LoadmoreApiCall}
                  total={count}
                />
              )}
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default FindALLGames;
