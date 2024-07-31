import React, { useEffect, useState } from "react";
// import { Typography, Space, Tag, Image, Avatar } from "antd";
import {
  chatExistApi,
  createChatsApi,
  getGameDataApi,
} from "../../network/api/otherDetailsApi";
import { useParams, useNavigate, createSearchParams } from "react-router-dom";

import dayjs from "dayjs";

import { Typography, Space, Tag, Image, Avatar, Button } from "antd";
import { CalendarOutlined, LikeFilled } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { convert } from "html-to-text";
import { useSelector, useDispatch } from "react-redux";
const { Title, Paragraph, Text } = Typography;

const SinglePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [chatExist, setChatExist] = useState(false);
  const role = useSelector((state) => state.authUser.user.role_type);
  const authenticated = useSelector((state) => state.authUser.authenticate);

  const gmIdLogin = useSelector((state) => state?.authUser?.gmInfo?.id);

  const [game, setGame] = useState(null);
  const timeConvertToDateTime = (date) => {
    let parsedDate = dayjs(date);
    let formattedTime = parsedDate.format("YYYY-MM-DD h:mm A");
    return formattedTime;
  };
  function hasGameMasterRole(arr) {
    let res;
    if (role?.length > 0 && Array.isArray(role)) {
      const resultArray = Array.isArray(arr)
        ? arr.map((item) => {
            if (item?.role == "game_master") {
              return true;
            }
          })
        : null;
      res = resultArray.includes(true);
    } else {
      res = false;
    }
    return res;
  }
  useEffect(() => {
    async function getGameData() {
      if (/^\d+$/.test(id)) {
        let data = await getGameDataApi({ id });
        if (data?.status_code == 200) {
          setGame(data?.data);

          if (authenticated && gmIdLogin != data?.data?.game_master?.id) {
            let chatStaus = await chatExistApi({
              gmId: data?.data?.game_master?.id,
            });
            if (chatStaus?.data?.status_code == 200) {
              setChatExist(chatStaus?.data?.data?.gm ? true : false);
            }
          }
        }
      }
    }
    getGameData();
  }, []);

  return (
    <>
      <div className="singlepage-wrap">
        <div className="single-banner">
          <Title level={1}>{game?.title}</Title>
        </div>
        <div className="container blog-content">
          <div className="content-inr">
            <div className="post-thumbnail">
              <Image
                src={
                  game?.image || "/363a3f73-602e-42a1-bb85-df287f264bad.webp"
                }
                preview={false}
              />
            </div>

            <Title level={3}>Description</Title>
            <Paragraph>
              <div dangerouslySetInnerHTML={{ __html: game?.description }} />
            </Paragraph>
            <Title level={3}>What players needed ?</Title>
            <Paragraph>
              <div dangerouslySetInnerHTML={{ __html: game?.player_needed }} />
            </Paragraph>
          </div>
          <div className="sider">
            <div className="detail-info">
              <Title level={3}>Detailed Information</Title>
              <Space align="bottom" className="price">
                <div>
                  <Title level={5}>Price per player-session</Title>
                </div>
                <Text className="price-text">€{game?.cost}</Text>
              </Space>
              {/* <Space wrap className="game-tags">
                <Tag className="instant-tag" color="#0094ff80">
                  ⚡ Instantly Book
                </Tag>
              </Space> */}
              <Title className="capign-heading" level={4}>
                Available Seats
              </Title>
              <Tag className="price-tag seat-tag" color="#212640">
                <Image preview={false} src="/seat.png" />
                <div className="filled-text">
                  <span>seats filled</span>
                  {game?.seats_filled} out of {game?.seats}
                </div>
              </Tag>
              {/* <ul className="session-listing">
                <li>
                  Sat, Sep 23, 2023, 8:00 PM - <span>session 13</span>
                </li>
                <li>
                  Sat, Sep 23, 2023, 8:00 PM - <span>session 13</span>
                </li>
              </ul> */}
              {/* <Text className="timezone-text">Timezone: Asia/Karachi</Text> */}

              <Title className="capign-heading" level={4}>
                Session Date and Time
              </Title>
              <Title style={{ color: "white", marginTop: 0 }} level={5}>
                {timeConvertToDateTime(game?.date)}
              </Title>
              <Title className="capign-heading" level={4}>
                Information
              </Title>
              <ul className="session-listing">
                <li>Duration: {game?.duration} hours</li>
                <li>Type : {game?.type}</li>
                <li>Required Experience : {game?.required_experience}</li>

                <li>Character Creation : {game?.character_creation}</li>

                <li>Age: {game?.age_restricted ? "18+" : "All ages"} </li>
              </ul>
              {game && gmIdLogin != game?.game_master?.id && (
                <Button
                  ghost
                  block
                  type="primary"
                  size="large"
                  onClick={() => {
                    navigate(`/game-payment/${id}`);
                  }}
                >
                  Join Campain
                </Button>
              )}
            </div>
            <div className="detail-info gm-card">
              <Space size={16} align="bottom" className="card-header">
                <Avatar size={80} src={game?.game_master?.picture} />
                <div>
                  <Title level={2}>{game?.game_master?.name}</Title>
                  <Text className="text">
                    {game?.game_master?.total_reviews
                      ? `(${game?.game_master?.average_reviews}) ${game?.game_master?.total_reviews} reviews`
                      : "No reviews "}
                  </Text>
                </div>
              </Space>
              <ul className="game-master-list">
                <li>
                  {game?.game_master?.experience_player}{" "}
                  <span> years as a player</span>
                </li>
                <li>
                  {game?.game_master?.experience_game_master}{" "}
                  <span> years as a Game Master</span>
                </li>
                <li>
                  {game?.game_master?.games_hosted} <span> game hosted</span>
                </li>
                <li>
                  {game?.game_master?.discord_tag}
                  <span> Discord Tag</span>
                </li>
                {/* <li>
                  Game Tools{" "}
                  <span>
                    {convert(game?.game_master?.game_tools, {
                      wordwrap: 130,
                    }).substring(0, 90) + "..."}
                  </span>
                </li> */}
              </ul>
              <Paragraph className="text">
                {convert(game?.game_master?.about_me_game_master, {
                  wordwrap: 130,
                }).substring(0, 90) + "..."}
              </Paragraph>
              <Space className="footer">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    navigate(`/game-master/${game?.game_master?.id}`);
                  }}
                >
                  View Profile
                </Button>
                {game && gmIdLogin != game?.game_master?.id && (
                  <Button
                    ghost
                    type="primary"
                    size="large"
                    onClick={async () => {
                      if (authenticated) {
                        if (!chatExist) {
                          let data = await createChatsApi({
                            gm: game?.game_master?.id,
                          });
                        }
                        navigate({
                          pathname: "/chats",
                          search: createSearchParams({
                            gm: game?.game_master?.id,
                          }).toString(),
                        });
                      } else {
                        navigate("/signup");
                      }
                    }}
                  >
                    Contact GM
                  </Button>
                )}
              </Space>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
