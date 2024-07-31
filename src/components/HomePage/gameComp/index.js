import React from "react";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  LikeFilled,
  FlagFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  deleteGameApi,
  getGmGamesApi,
} from "../../../network/api/otherDetailsApi";
import { Typography, Button, Image, Space, Tag, Row, Col } from "antd";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
const { Title, Paragraph, Text } = Typography;
const GameComp = ({
  game,
  edit = false,
  setGmGames,
  payoutsShowModal,
  deleteGameShowModal,
}) => {
  const navigate = useNavigate();
  const expressSubmitterDetail = useSelector(
    (state) => state.authUser?.gmInfo?.express_details_submitted
  );
  const getExperience = (key) => {
    if (key == "beginner") {
      return "Beginner";
    } else if (key == "experienced") {
      return "Experienced";
    } else if (key == "Expert") {
      return "expert";
    } else {
      return "Not Required";
    }
  };
  const timeConvertToDateTime = (date) => {
    let parsedDate = dayjs(date);
    let formattedTime = parsedDate.format("YYYY-MM-DD h:mm A");
    return formattedTime;
  };

  return (
    <div className="upcoming-cards">
      <Image
        className="upcoming-thumbnail"
        src={game?.image || "/Hoinghich.webp"}
        preview={false}
        alt=""
      />
      <div className="card-content">
        <Space size={4} className="coming-date">
          <div>
            <CalendarOutlined style={{ marginRight: 10 }} />
            {timeConvertToDateTime(game?.date)}
          </div>
          {edit && (
            <Space className="edit-btn">
              <Button
                onClick={() => deleteGameShowModal(game?.id)}
                type="primary"
                danger
                ghost
                icon={<DeleteOutlined />}
              ></Button>
              <Button
                onClick={() => {
                  if (expressSubmitterDetail) {
                    navigate(`/games/update/${game?.id}`);
                  } else {
                    payoutsShowModal();
                  }
                }}
                type="primary"
                icon={<EditOutlined />}
              ></Button>
            </Space>
          )}
        </Space>
        <div
          onClick={() => {
            navigate(`/game/${game.id}`);
          }}
          className="link-navigate"
        >
          {edit && (
            <Tag className="price-tag" color="#5572f6">
              {game?.session_status}
            </Tag>
          )}
          <Title className="card-heading" level={5}>
            {game?.title}
          </Title>

          <ul class="game-master-list">
            <li>
              Duration: <span>{game?.duration}</span>
            </li>
            <li>
              Type: <span>{game?.type}</span>
            </li>
            <li>
              <span>
                {game?.game_master?.name}{" "}
                {game?.game_master?.average_reviews
                  ? `(${game?.game_master?.average_reviews})`
                  : ""}
              </span>
            </li>
            <li className="game-tags">
              Required Experience:
              <Tag color="default">
                {getExperience(game?.required_experience)}
              </Tag>
            </li>
          </ul>
        </div>
      </div>
      <Space className="footer">
        <Tag className="price-tag seat-tag" color="#212640">
          <Image preview={false} src="/seat.png" />
          <div className="filled-text">
            <span>seats filled</span> {game?.seats_filled} out of {game?.seats}
          </div>
        </Tag>
        <Tag className="price-tag seat-tag" color="#212640">
          <LikeFilled />
          <div className="filled-text">
            {/* <span>Reviews</span>  */}
            {game?.total_reviews || "No review"}
          </div>
        </Tag>
        <Tag className="price-tag" color="#5572f6">
          €{game?.cost}
        </Tag>
      </Space>
      {/* </div> */}
    </div>
  );
};

export default GameComp;
