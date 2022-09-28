import { useState } from 'react';
import axios from 'axios'

import styles from './Drawer.module.scss'

import Info from '../Info';
import { url } from '../../App';
import { useCart } from '../../hooks/useCart';


function Drawer({ onClose, onRemove, items = [], opened }) {
  const [orderId, setOrderId] = useState(null);
  const [isOrderCompete, setIsOrderCompete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, setCartItems, totalPrice } = useCart();

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(url + '/orders', { items: cartItems, });
      setOrderId(data.id);

      for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        await axios.delete(url + '/cart/' + item.id);
      }

      setIsOrderCompete(true);
      setCartItems([]);
    } catch (error) {
      alert('Не вдалось оформити замовлення');
    }
    setIsLoading(false);
  }

  return ( 
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>

        <h2 className="d-flex justify-between mb-20">
          Візок <img onClick={onClose} className="removeBtn cu-p" src="/img/remove-1.svg" alt="remove" />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center justify-between mb-20">
                  <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt="tshirt" />
                  <div className="mr-50 mb-10">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} UAH</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/remove-1.svg" alt="remove" />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <div className="d-flex align-end mb-20">
                <span>До сплати:</span>
                <div className="dash"></div>
                <b>{totalPrice} UAH</b>
              </div>
              <button disabled={isLoading} onClick={!isLoading ? onClickOrder : undefined} className="greenButton">Оформити замовлення <img src="/img/arrow.svg" alt="Arrow" /></button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderCompete ? "Замовлення прийнято" : "Візок пустий"}
            description={isOrderCompete ? `Замовлення під номером №${orderId}` : "Добавте хоча б один товар в візок, щоб зробити замовлення"}
            image={isOrderCompete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;