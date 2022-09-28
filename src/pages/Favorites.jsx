import Card from '../components/Card';
import { useContext } from 'react';
import { AppContext } from '../App';

function Favorites() {
  const {favorites, onAddToFavorite} = useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-30 justify-between">
        <h1>Мої закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {
          favorites.map((item, index) => (
            <Card
              key={index}

              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Favorites;