import { useState } from 'react';
import imd from '../../shared/assets/images/sneaker.png';

const ProductCart = () => {
  const [countProduct, setCountProduct] = useState(1);

  return (
    <div className="cartProductsItem">
      <div className="propertyItemCart">
        <div className="aboutItemCart">
          <div className="imgItemCart">
            <img className="imageItemCart" src={imd} alt="image product" />
          </div>
          <div className="textItemCart">
            <div className="titleItemCart">
              Название модели, серия и что-то еще
            </div>
            <div className="subtitleItemCart">3 840 ₽ за штуку/за пару</div>
          </div>
        </div>
        <div className="countProductCart">
          <div
            className="prevCountProductCart"
            onClick={() => {
              if (countProduct <= 1) setCountProduct(1);
              else setCountProduct(countProduct - 1);
            }}
          >
            -
          </div>
          <div className="numbCountProductCart">{countProduct}</div>
          <div
            className="nextCountProductCart"
            onClick={() => {
              setCountProduct(countProduct + 1);
            }}
          >
            +
          </div>
        </div>
      </div>
      <div className="priceItemCart">
        <div className="currentPriceItemCart yourPricesCart">2123&nbsp;€</div>
        <div className="discountPriceItemCart yourPricesCart">2222&nbsp;€</div>
        <div className="removeItemCart"></div>
      </div>
    </div>
  );
};

export { ProductCart };
