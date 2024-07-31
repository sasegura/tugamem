import React from "react";
import { Typography, Space, Tag, Image } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

export default function BlogComp({ blog }) {
  const navigate = useNavigate();
  const timeConvertToDateTime = (date) => {
    let parsedDate = dayjs(date);
    let formattedTime = parsedDate.format("YYYY-MM-DD h:mm A");
    return formattedTime;
  };
  return (
    <div
      className="blog-card"
      onClick={() => {
        navigate(`/blog-post/${blog?.id}`);
      }}
    >
      <Image src={blog?.image || "/blog-img.jpg"} preview={false} />
      <div className="blog-content-inr">
        {/* <Text className="date-create">
          <span>Created Date:</span> {timeConvertToDateTime(blog?.created_at)}
        </Text> */}
        <Space className="game-tags">
          Tags:
          {blog?.tags?.length > 0 &&
            blog?.tags?.map((tag) => {
              return <Tag color="default">{tag?.title}</Tag>;
            })}
        </Space>
        <Title level={4}>{blog?.title}</Title>
        <Paragraph className="description">{blog?.description}</Paragraph>
        <Text className="date-create">
          <span>Created Date:</span> {blog?.created_at}
        </Text>
        {/* <Link to={`/blog-post/${blog?.id}`}>Read More</Link> */}
      </div>
    </div>
  );
}
