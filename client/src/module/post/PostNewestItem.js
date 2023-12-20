import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import { postContext } from "contexts/postContext";

const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;

const POST_PER_PAGE = 1;

const PostNewestItem = ({ user }) => {
  /*
  const [posts, setPosts] = useState([]);
  const [, setLastDoc] = useState();
  const [, setTotal] = useState(0);
  const filter = "";

  console.log(posts);
  */

  const {
    postState: { smalllastposts, postsLoading },
    getNewestPost
  } = useContext(postContext);

  useState(() => getNewestPost(), []);
  return (
    <>
      {smalllastposts.map((post) => (
        <PostNewestItemStyles>
          <PostImage
            url={`${post.image ||
              `https://images.unsplash.com/photo-1700141933748-4635f57d694e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }`}
            alt=""
          ></PostImage>
          <div className="post-content">
            <PostCategory type="secondary">{post.category}</PostCategory>
            <PostTitle size="normal">
              {post.title}
            </PostTitle>
            <PostMeta
              color="gray"
              authorName={post.user.username}
              date={post.date}
            ></PostMeta>
          </div>
        </PostNewestItemStyles>
      ))}
    </>
  );
};

export default PostNewestItem;
