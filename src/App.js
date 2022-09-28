
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import { createContext, useEffect, useState } from 'react';


export const AppContext = createContext({});

export const url = 'https://632973b7d2c97d8c5267990b.mockapi.io';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          await axios.get(url + '/cart'),
          await axios.get(url + '/favorites'),
          await axios.get(url + '/items')
        ])

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);

      } catch (error) {
        alert('Не вдалось завантажити дані');
        console.error(error);
      }

    }

    fetchData();

  }, []);
 
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(url + `/cart/${findItem.id}`);
      }
      else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(url + '/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return { ...item, id: data.id };
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Не вдалось добавити дані в кошик');
      console.error(error);
    }
  };

  const onRemoveItems = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.delete(url + `/cart/${id}`);
    } catch (error) {
      alert('Не вдалось видалити дані з кошика');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(url + `/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      }
      else {
        const { data } = await axios.post(url + '/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не вдалось добавити в Fav');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, onAddToCart, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
      <div className="wrapper clear">

        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItems}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path='/' element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          } />
          <Route path='/favorites'
            element={<Favorites />}
          />
          <Route path='/orders'
            element={<Orders />}
          />
        </Routes>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;

