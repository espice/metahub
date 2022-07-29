import styles from './index.module.scss';
import PageStyles from '../../styles/pages/index.module.scss';

export default function Content() {
  return (
    <div className={PageStyles.content}>
      <div className={PageStyles.content__section}>
        <div className={PageStyles.content__section__title}>
          <div>Your</div> <div>Verses</div>
        </div>
      </div>
    </div>
  );
}
