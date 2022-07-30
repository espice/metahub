import Image from 'next/image';
import PrimaryButton from '../../components/Button/Primary';
import TextButton from '../../components/Button/Text';
import styles from './index.module.scss';
import Textfield from '../../components/Textfield';
import { useState } from 'react';

export default function Content() {
  const [userName, setUserName] = useState("")
  const [userPass, setUserPass] = useState("")
  return (
    <div className={styles.content}>
      <div className={styles.content__container}>
        <h1 className={styles.content__container__heading}>Login to your app name account...</h1>
        <h2 className={styles.content__container__placeholder2}>Your <span className={styles.content__container__placeholder__blue}>Username</span> </h2>
        <Textfield value={userName} onChange={(e) => {setUserName(e.target.value)}} type={"text"} placeholder={"Your Username"} className={styles.content__container__input}></Textfield>
        <h2 className={styles.content__container__placeholder}>Your <span className={styles.content__container__placeholder__blue}>Password</span> </h2>
        <Textfield value={userPass} onChange={(e) => {setUserPass(e.target.value)}} type={"password"} placeholder={"Your Password"} className={styles.content__container__input}></Textfield>
        <PrimaryButton className={styles.content__container__button}>Let's Get Back!</PrimaryButton>
      </div>
    </div>
  );
}
