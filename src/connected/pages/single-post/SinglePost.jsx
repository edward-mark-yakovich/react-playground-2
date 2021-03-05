import './single-post.scss';

import React, { useEffect } from 'react';
import { useFetch } from "@hooks/useFetch";
import { useStore } from '@store/StoreContext';
import { setPost } from '@store/appReducer';
import Page from "@connected/wrappers/global/Page.jsx";
import { isEmptyObj } from '@utils/helpers';

const SinglePost = () => {
  const [state, dispatch] = useStore();
  const slug = match?.params?.slug || '';

  const [responsePost, loadingPost, hasErrorPost] = useFetch(`posts?_embed&slug=${slug}`);
  const contentPost = responsePost?.[0] || {};

  useEffect(() => {
    dispatch(setPost(contentPost));
  }, [responsePost]);

  return (
    <Page
      nameId="single-post"
    >
      <div className="page page--single-post">

        <div className="page__heading">
          <h1>Single Post</h1>
        </div>

        {isEmptyObj(contentPost)
          ? <p>Fetching data...</p>
          : <div className="single-post">
              <h3
                className="single-post__heading"
                dangerouslySetInnerHTML={{
                    __html: contentPost?.title?.rendered || ''
                }}
              />

              <div
                className="single-post__copy"
                dangerouslySetInnerHTML={{
                    __html: contentPost?.content?.rendered || ''
                }}
              />
            </div>
        }

      </div>
    </Page>
  );
};

export default SinglePost;
