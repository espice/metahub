import Image from 'next/image';
import PrimaryButton from '../../components/Button/Primary';
import TextButton from '../../components/Button/Text';
import styles from './index.module.scss';
import Textfield from '../../components/Textfield';
import { useState } from 'react';
import TagTextField from './TagTextFIeld';
import axios from '../../utils/axios';
import useSession from '../../utils/hooks/useSession';

export default function Content() {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userNamee, setUserNamee] = useState('');
  const [userBday, setUserBday] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const { updateUser } = useSession();

  const generateRandomNum = () => {
    let num1 = Math.floor(Math.random() * 10).toString();
    let num2 = Math.floor(Math.random() * 10).toString();
    let num3 = Math.floor(Math.random() * 10).toString();
    let num4 = Math.floor(Math.random() * 10).toString();
    let num = num1 + num2 + num3 + num4;
    return num;
  };
  const [num, setNum] = useState(generateRandomNum());
  console.log(pageNum);
  if (pageNum == 1) {
    return (
      <div className={styles.content}>
        <div className={styles.content__container}>
          <h1 className={styles.content__container__heading}>
            Starting your{' '}
            <span className={styles.content__container__blue}>Journey</span>{' '}
            into the unknown...
          </h1>
          <h2 className={styles.content__container__placeholder2}>
            Your{' '}
            <span className={styles.content__container__placeholder__blue}>
              Email
            </span>{' '}
          </h2>
          <Textfield
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type={'email'}
            placeholder={'Your Email'}
            className={styles.content__container__input}
          ></Textfield>
          <h2 className={styles.content__container__placeholder}>
            Create a{' '}
            <span className={styles.content__container__placeholder__blue}>
              Password
            </span>{' '}
          </h2>
          <Textfield
            value={userPass}
            onChange={(e) => {
              setUserPass(e.target.value);
            }}
            type={'password'}
            placeholder={'Your Password'}
            className={styles.content__container__input}
          ></Textfield>
          <PrimaryButton
            className={styles.content__container__button}
            onClick={() => {
              setPageNum(2), console.log(pageNum);
            }}
          >
            Let's Go!
          </PrimaryButton>
        </div>
      </div>
    );
  } else if (pageNum == 2) {
    return (
      <div className={styles.content}>
        <div className={styles.content__container}>
          <h1 className={styles.content__container__heading}>
            Just a few more steps required...{' '}
          </h1>
          <h2 className={styles.content__container__placeholder2}>
            Your{' '}
            <span className={styles.content__container__placeholder__blue}>
              Username
            </span>{' '}
          </h2>
          <TagTextField
            num={num}
            value={userNamee}
            onChange={(e) => {
              setUserNamee(e.target.value);
            }}
            type={'text'}
            placeholder={'Your Username'}
            className={styles.content__container__input}
          ></TagTextField>
          <h2 className={styles.content__container__placeholder}>
            Your{' '}
            <span className={styles.content__container__placeholder__blue}>
              Birthday
            </span>{' '}
          </h2>
          <Textfield
            value={userBday}
            onChange={(e) => {
              setUserBday(e.target.value);
            }}
            type={'date'}
            placeholder={'Your Password'}
            className={styles.content__container__input}
          ></Textfield>
          <PrimaryButton
            className={styles.content__container__button}
            onClick={async () => {
              const { data } = await axios.post('/auth/register', {
                username: userNamee,
                tag: num,
                email: userName,
                dob: userBday,
                password: userPass,
              });

              if (data.success) {
                updateUser(data.user);
                return (window.location.href = '/');
              }
            }}
          >
            Let's Go! {'(for real this time)'}
          </PrimaryButton>
        </div>
      </div>
    );
  }
}
