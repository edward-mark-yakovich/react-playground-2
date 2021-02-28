import './home.scss';

import _ from 'lodash';
import React, {useEffect} from 'react';
import { useFetch } from "@hooks/useFetch";
import { useStore } from '@store/StoreContext';
import { setPostCurrentPage, setHomeIntro, setHomeCategories } from '@store/appReducer';
import Page from "@connected/wrappers/global/Page.jsx";

const Home = () => {
  const [state, dispatch] = useStore();

  const [responseIntro, loadingIntro, hasErrorIntro] = useFetch('pages?_embed&slug=about');
  const contentIntro = !_.isEmpty(state.homeIntro) ? state.homeIntro : (responseIntro?.[0] || {});
  const [responseCats, loadingCats, hasErrorCats] = useFetch('categories');
  const contentCats = !_.isEmpty(state.homeCategories) ? state.homeCategories : (responseCats || []);

  useEffect(() => {
    if (_.isEmpty(state.homeIntro)) {
      dispatch(setHomeIntro(contentIntro));
    }
  }, [responseIntro]);

  useEffect(() => {
    if (_.isEmpty(state.homeCategories)) {
      dispatch(setHomeCategories(contentCats));
    }
  }, [responseCats]);

  return (
    <Page
      nameId="home"
    >
      <div className="page page--home">

        <div className="page__heading">
          <h1>Home</h1>
        </div>

        <div className="home-intro-top">
          <div>
            <button onClick={() => dispatch(setPostCurrentPage(state.postCurrentPage + 1))}>Set post page</button>
            <span> = {state.postCurrentPage} </span>
          </div>
        </div>

        {(_.isEmpty(contentIntro))
          ? <p>Fetching data...</p>
          : <div className="home-intro">
              <div className="grid">
                <div className="home-intro__img">
                  <img src={contentIntro?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                </div>

                <div className="home-intro__content">
                  <h3
                    className="home-intro__heading"
                    dangerouslySetInnerHTML={{
                        __html: contentIntro?.title?.rendered || ''
                    }}
                  />

                  <div
                    className="home-intro__copy"
                    dangerouslySetInnerHTML={{
                        __html: contentIntro?.excerpt?.rendered || ''
                    }}
                  />
                </div>
              </div>
            </div>
        }

        {(_.isEmpty(contentCats))
          ? <p>Fetching data...</p>
          : <div className="home-categories">
              <h3>Categories</h3>

              <ul>
                {_.map(contentCats, (category, index) => {
                  return (
                    <li key={index}>{category?.name || ''}</li>
                  );
                })}
              </ul>
            </div>
        }

      </div>
    </Page>
  );
};

export default Home;
