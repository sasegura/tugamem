import React, { useEffect, useState } from "react";
import { Typography, Space, Tag, Image, Spin } from "antd";
import { singleBlogApi } from "../../network/api/otherDetailsApi";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const { Title, Paragraph, Text } = Typography;

const SingleBlogPost = () => {
  const [blogInfo, setBlogInfo] = useState({});
  const [relatedBlog, setRelatedBlog] = useState([]);

  const [loading, setLoading] = useState(false);
  const id = useParams();
  useEffect(() => {
    async function getHomeData() {
      setLoading(true);
      let data = await singleBlogApi(id);
      console.log(data);
      if (data?.status_code == 200) {
        setBlogInfo(data?.data?.blog);
        setRelatedBlog(data?.data?.related_blogs || []);
      }
      setLoading(false);
    }
    getHomeData();
  }, []);
  return (
    <Spin spinning={loading} size="large">
      <div className="singlepage-wrap">
        <div className="single-banner">
          <Title level={1}>{blogInfo?.title}</Title>
          {/* <Title level={2}>Homebrew Game on Roll20</Title> */}
          <Space wrap className="game-tags">
            <span>Date: 11/4/2023</span>
            <Tag color="default">Campaign</Tag>
            <Tag color="default">Pathfinder 2e</Tag>
            <Tag color="default">Discord</Tag>
          </Space>
        </div>
        <div className="container blog-content">
          <div className="content-inr">
            <div className="post-thumbnail">
              <Image
                src={
                  blogInfo?.image ||
                  "/363a3f73-602e-42a1-bb85-df287f264bad.webp"
                }
                preview={false}
              />
            </div>
            <Text className="date-create">
              <span>Created Date:</span>{" "}
              {dayjs(blogInfo?.created_at).format("DD-MM-YYYY")}
            </Text>
            <Space wrap className="game-tags">
              {blogInfo?.tags?.length > 0 &&
                blogInfo?.tags?.map((tag, index) => {
                  return (
                    <Tag color="default" key={index}>
                      {tag?.slug}
                    </Tag>
                  );
                })}
            </Space>
            <Paragraph>{blogInfo?.description}</Paragraph>
          </div>
          <div className="sider">
            <div className="detail-info">
              <Title level={3}>Latest Post</Title>

              {relatedBlog?.length > 0 &&
                relatedBlog?.map((data, index) => {
                  return (
                    <>
                      <Space className="latest-post-wrap" key={index}>
                        <Image
                          width={80}
                          height={70}
                          src={data?.image}
                          preview={false}
                        />
                        <div>
                          <Title level={5}>{data?.title}</Title>
                          <Paragraph className="description">
                            {data?.description}
                          </Paragraph>
                        </div>
                      </Space>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default SingleBlogPost;
