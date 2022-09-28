import { useState, useContext } from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader";

import { AppContext } from '../../App';

function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false
}) {

  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const itemObj = { id, parentId: id, imageUrl, title, price };

  const onClickPlus = () => {
    onPlus(itemObj);
  }

  const onClickFavorite = () => {
    onFavorite(itemObj);
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.card}>
      {loading ?
        (
          <ContentLoader
            speed={2}
            width={160}
            height={250}
            viewBox="0 0 160 250"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="0" y="0" rx="10" ry="10" width="160" height="150" />
            <rect x="0" y="166" rx="3" ry="3" width="160" height="15" />
            <rect x="0" y="189" rx="3" ry="3" width="93" height="15" />
            <rect x="0" y="226" rx="8" ry="8" width="80" height="24" />
            <rect x="128" y="217" rx="8" ry="8" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            {onFavorite &&
              <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/img/heart-2.svg" : "/img/heart-1.svg"} alt="unliked" />
              </div>}
            <img width={160} height={160} src={imageUrl} alt="tshirt" />
            <h5>{title}</h5>
            <div className="d-flex justify-between  align-center">
              <div className="d-flex flex-column">
                <span>Ціна: </span>
                <b>{price} UAH</b>
              </div >
              {onPlus &&
                <img className={styles.plus} onClick={onClickPlus}
                  src={isItemAdded(id) ? "/img/checked.svg" : "/img/plus.svg"} alt="Plus" />}
            </div>
          </>
        )
      }

    </div>
  );
}

export default Card;

