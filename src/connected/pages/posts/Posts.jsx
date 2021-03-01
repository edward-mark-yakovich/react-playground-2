import './posts.scss';

import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useFetch } from "@hooks/useFetch";
import { useStore } from '@store/StoreContext';
import { setPosts, setPostCurrentPage } from '@store/appReducer';

import Page from "@connected/wrappers/global/Page.jsx";
import Pagination from '@components/base/pagination/Pagination.jsx';

const Posts = () => {
  const history = useHistory();
  const [state, dispatch] = useStore();
  const [page, setPage] = useState(state.postCurrentPage || 1);
  const perPage = 20;

  const [responsePosts, loadingPosts, hasErrorPosts] = useFetch(`posts?_embed&per_page=${perPage}&page=${page}`);
  const contentPosts = responsePosts || [];

  const handleGoToPost = (slug) => {
    history.push(`/posts/${slug}`);
  };

  useEffect(() => {
    dispatch(setPosts(contentPosts));
    dispatch(setPostCurrentPage(page));
  }, [responsePosts]);

  return (
    <Page
      nameId="posts"
    >
      <div className="page page--posts">

        <div className="page__heading">
          <h1>Posts</h1>
        </div>

        {(contentPosts.length === 0)
          ? <p>Fetching data...</p>
          : <div className="post-listing">
              <div className="post-listing__btns grid">
                {contentPosts.map((post, index) => {
                  return (
                    <button className="post-btn" key={index} onClick={() => handleGoToPost(post.slug)}>
                      <div className="post-btn__img">
                        <img src={post?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                      </div>

                      <h3
                        className="post-btn__heading"
                        dangerouslySetInnerHTML={{
                            __html: post?.title?.rendered || ''
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <Pagination
                currentPage={page}
                handleChosenPage={(page) => setPage(page)}
                endOfPages={perPage > contentPosts.length}
              />
            </div>
        }

      </div>
    </Page>
  );
};

export default Posts;
