import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';


function Header(props) {

  const { totalPrice } = useCart();


  return (
    <header className="d-flex justify-between align-center p-40">

      <Link to='/'>
        <div className="d-flex align-center">
          <img width={50} height={50} src="/img/logo.png" alt="" />
          <div>
            <h3 className=""> React T-Shirt</h3>
            <p className="opacity-5"> Online shop</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex ">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={25} height={25} src="/img/cart.svg" alt="cart" />
          <span className="opacity-7">{totalPrice} UAH</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to='/favorites'>
            <img width={25} height={25} src="/img/heart.svg" alt="heart" />
          </Link>
        </li>
        <li>
          <Link to='/orders'>
            <img width={25} height={25} src="/img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>

    </header>
  );
}

export default Header;