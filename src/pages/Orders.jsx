import Card from '../components/Card';
import { url } from '../App';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Orders() {

  const [isLoading, setIsLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(url + '/orders');
        setOrders(data.map(obj => obj.items).flat());
        setIsLoading(false);
      })();
    } catch (error) {
      alert('Не вдалось отримати дані замовлень');
      console.error(error); 
    }
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-30 justify-between">
        <h1>Мої Замовлення</h1>
      </div>
      <div className="d-flex flex-wrap">
        {
          (isLoading ? [...Array(8)] : orders).map((item, index) => (
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Orders;