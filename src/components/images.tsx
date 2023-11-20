import Velo from '@/assets/velo-3840x2160.jpg';
import Buhta from '@/assets/buhta-2560x1080.jpg';
import Laguna from '@/assets/laguna-3024x4032.jpg';
import styles from './images.module.scss';

const Images = () => {
  return (
    <div>
      <section className={styles.groupimg}>
        <img src={Velo} alt="" loading="lazy" />
        <img src={Laguna} alt="" loading="lazy" />
        <img src={Buhta} alt="" loading="lazy" />
      </section>
    </div>
  );
};

export default Images;
