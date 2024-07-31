import React from "react";
import { StarFilled, LikeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Image, Space, Tag, Row, Col } from "antd";

const { Title, Paragraph, Text } = Typography;
const GmComp = ({ gm }) => {
  const navigate = useNavigate();
  return (
    <div
      className="team-card"
      onClick={() => {
        navigate(`/game-master/${gm.id}`);
      }}
    >
      <div>
        <Image
          preview={false}
          width={115}
          height={115}
          src={gm?.user?.picture || "/user_profile.png"}
        />
        <Title className="card-heading" level={4}>
          {gm?.name}
        </Title>
        <Space size={10}>
          <Text className="text">
            {gm?.total_reviews
              ? `(${gm?.average_reviews}) ${gm?.total_reviews} reviews`
              : "No reviews "}
          </Text>
        </Space>
      </div>
      <div className="">
        <ul className="team-list">
          <li>
            <strong>{gm?.experience_game_master}</strong> years as a GM
          </li>
          <li>
            <strong>{gm?.games_hosted}</strong> Games Hosted
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GmComp;
