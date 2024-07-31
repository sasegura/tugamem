import React, { useEffect, useState } from "react";
import { Typography, Button } from "antd";
import { getBlogsListApi } from "../../network/api/otherDetailsApi";
import { Link } from "react-router-dom";
import BlogComp from "./blogComp";

import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const BlogPostPage = () => {
  const [loading, setLoading] = useState(false);

  const [blogList, setBlogList] = useState([]);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const LoadmoreApiCall = async (data) => {
    try {
      setLoading(true);
      let blogs = await getBlogsListApi({ offset });
      if (blogs?.status_code == 200) {
        setBlogList([...blogList, ...blogs?.data?.results]);

        setCount(blogs?.data?.count);
        if (blogs?.data?.count > offset + 4) {
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
      let blogs = await getBlogsListApi({ offset: 0 });
      if (blogs?.status_code == 200) {
        setBlogList(blogs?.data?.results || []);
        setCount(blogs?.data?.count);
        if (blogs?.data?.count > offset + 4) {
          setOffset(offset + 4);
        } else {
          setHasMore(false);
        }
      }
      setLoading(false);
    }
    ListApiCalls();
  }, []);
  return (
    <>
      <div className="blogpost-wrap">
        <div className="sub-banner">
          <div className="container">
            <Title level={2}>See Our Blogs</Title>
            <Text className="profile-text">
              Play D&D and Other Tabletop Roleplaying Games Online
            </Text>
          </div>
        </div>
        <div className="container">
          <div className="blog-content-wrap">
            {blogList?.length > 0 &&
              blogList?.map((blog) => {
                return (
                  <>
                    <BlogComp blog={blog} />
                  </>
                );
              })}
          </div>
          {hasMore && (
            <Button
              className="see-all-btn"
              type="primary"
              size="large"
              onClick={() => {
                !loading && LoadmoreApiCall();
              }}
            >
              Load More {loading && <LoadingOutlined />}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
