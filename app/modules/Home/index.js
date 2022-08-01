import styles from './index.module.scss';
import PageStyles from '../../styles/pages/index.module.scss';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Loader from '../../components/Loader';
import Image from 'next/image';
import Clipboard from '../../public/icons/clipboard.svg';

export default function Content() {
  const [myVerses, setMyVerses] = useState([]);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVerses() {
      const { data } = await axios.get('/verses');
      setVerses(data.verses);
      await fetchMyVerses();
    }
    async function fetchMyVerses() {
      const { data } = await axios.get('/verses/my');
      if (data.success) {
        setMyVerses(data.myVerses);
        return setLoading(false);
      }
    }

    fetchVerses();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            height: '80vh',
          }}
        >
          <Loader center />
        </div>
      ) : (
        <div className={PageStyles.content}>
          <div className={PageStyles.content__section}>
            <div className={PageStyles.content__section__title}>
              <div>Your</div> <div>Verses</div>
            </div>

            <div className={PageStyles.content__section__body}>
              <div className={styles.verses__grid}>
                {myVerses.length !== 0 ? (
                  <>
                    {myVerses.map((verse, index) => {
                      return (
                        <div
                          className={styles.verses__grid__item}
                          style={{
                            width: `${100 / myVerses.length - 1.9} %`,
                          }}
                          key={index}
                        >
                          <div className={styles.verses__grid__item__left}>
                            <img src={verse.logo} alt="verse" />
                          </div>
                          <div className={styles.verses__grid__item__right}>
                            <div
                              className={
                                styles.verses__grid__item__right__title
                              }
                            >
                              {verse.name}
                            </div>

                            <div
                              className={
                                styles.verses__grid__item__right__status
                              }
                            >
                              <div
                                className={
                                  styles.verses__grid__item__right__status__total
                                }
                              >
                                <div
                                  className={
                                    styles.verses__grid__item__right__status__total__icon
                                  }
                                ></div>
                                <div>
                                  {verse.authorizedUsers.length} Members
                                </div>
                              </div>

                              <div
                                className={
                                  styles.verses__grid__item__right__status__online
                                }
                              >
                                <div
                                  className={
                                    styles.verses__grid__item__right__status__online__icon
                                  }
                                ></div>
                                <div>
                                  {verse.onlineUsers
                                    ? verse.onlineUsers
                                    : Math.ceil(
                                        verse.authorizedUsers.length / 2
                                      )}{' '}
                                  Online
                                </div>
                              </div>
                            </div>

                            <div
                              className={styles.verses__grid__item__right__copy}
                            >
                              <Image src={Clipboard} width={16} height={16} />
                              <div>Copy URL</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className={styles.noVerses}>
                    You haven't joined any verses... yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={PageStyles.content__section}>
            <div
              className={PageStyles.content__section__title}
              style={{
                marginTop: '40px',
              }}
            >
              <div>Explore</div>
            </div>

            <div className={PageStyles.content__section__body}>
              <div className={styles.explore__grid}>
                {verses.map((verse, index) => {
                  return (
                    <div
                      className={styles.explore__grid__item}
                      style={{}}
                      key={index}
                    >
                      <div className={styles.explore__grid__item__left}>
                        <img src={verse.logo} alt="verse" />
                      </div>
                      <div className={styles.explore__grid__item__right}>
                        <div
                          className={styles.explore__grid__item__right__title}
                        >
                          {verse.name}
                        </div>

                        <div
                          className={styles.explore__grid__item__right__status}
                        >
                          <div
                            className={
                              styles.explore__grid__item__right__status__total
                            }
                          >
                            <div
                              className={
                                styles.explore__grid__item__right__status__total__icon
                              }
                            ></div>
                            <div>{verse.authorizedUsers.length} Members</div>
                          </div>

                          <div
                            className={
                              styles.verses__grid__item__right__status__online
                            }
                          >
                            <div
                              className={
                                styles.verses__grid__item__right__status__online__icon
                              }
                            ></div>
                            <div>
                              {verse.onlineUsers
                                ? verse.onlineUsers
                                : Math.ceil(
                                    verse.authorizedUsers.length / 2
                                  )}{' '}
                              Online
                            </div>
                          </div>
                        </div>
                        <div className={styles.shit}>{verse.description}</div>

                        <div
                          className={styles.verses__grid__item__right__copy}
                          style={{ marginTop: 'auto' }}
                        >
                          <Image src={Clipboard} width={16} height={16} />
                          <div>Copy URL</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
