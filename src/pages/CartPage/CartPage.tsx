import './CartPage.scss';
import { useState } from 'react';
import { ProductCart } from './ProductCart';
import { routes } from '../../routes/AppRouter';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [countProducts, setCountProducts] = useState(true);
  const dataObj = [1, 2, 3, 4];

  return (
    <>
      <div className="cartPage">
        <div className="cartWrapper">
          {countProducts ? (
            <>
              <h1 className="cartTitle">Cart</h1>
              <div className="cartBox">
                <div className="cartProducts">
                  <div className="cartProductsBox">
                    <>
                      <div className="removeAllCart">
                        <p className="textRemoveAllCart">remove all</p>
                      </div>
                      {dataObj.map((el, index) => {
                        return <ProductCart key={index} />;
                      })}
                    </>
                  </div>
                </div>
                <div className="cartInfo">
                  <div className="titleCartInfo">Your order</div>
                  <div className="currentPriceAllCart">
                    Your products
                    <p className="yourPricesCart">2222&nbsp;€</p>
                  </div>
                  <div className="discountPriceAllCart">
                    Discount
                    <p className="yourPricesCart">-2222&nbsp;€</p>
                  </div>
                  <div className="promoCodeCart">
                    <h3>Have a promo code?</h3>
                    <input
                      className="inputPromoCodeCart"
                      type="text"
                      placeholder="Enter promo code"
                    />
                  </div>
                  <div
                    className="btnCartInfo"
                    onClick={() => {
                      setCountProducts(!countProducts);
                    }}
                  >
                    Pay
                  </div>
                  <div className="totalCartInfo">
                    <h3>Total price:</h3>
                    <h3>2222&nbsp;€</h3>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="emptyCartBox">
                <div className="textEmptyCart">
                  You have no items in your cart
                </div>
                <div className="bcgEmptyCart"></div>
                <div className="textEmptyCart">
                  Go to the&nbsp;
                  <Link className="btnEmptyCart" to={`../${routes.main.path}/`}>
                    main page
                  </Link>
                  &nbsp;to select a product
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
