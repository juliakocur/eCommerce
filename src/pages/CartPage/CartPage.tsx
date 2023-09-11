import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addItemInCart,
  deleteAllCart,
  deleteItemInCart,
  getCartById,
} from '../../api/methods';
import {
  AppNotification,
  NotificationType,
} from '../../components/Notification/Notification';
import { routes } from '../../routes/AppRouter';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeCartId } from '../../store/rootReducer';
import { IDataCart } from '../MainPage/MainPage';
import './CartPage.scss';
import ProductCart from './ProductCart';

interface IAllDataCart extends IDataCart {
  totalPrice: number;
  totalLineItemQuantity: number;
}

const CartPage = () => {
  const dispatch = useAppDispatch();
  const [refresh, setRefresh] = useState(true);
  const { cartId } = useAppSelector((state) => state.auth);
  const [dataCart, setDataCart] = useState<null | IAllDataCart>(null);
  const [countProducts, setCountProducts] = useState(false);

  useEffect(() => {
    if (cartId && refresh) {
      getCartById(cartId).then((res) => {
        setDataCart({
          version: res.body.version,
          items: res.body.lineItems,
          totalLineItemQuantity: res.body.totalLineItemQuantity,
          totalPrice: res.body.totalPrice.centAmount / 100,
        });
      });
      setRefresh(false);
    }
  }, [cartId, refresh]);

  const deleteAllItems = () => {
    deleteAllCart(cartId, dataCart.version);
    setDataCart(null);
  };

  const inc = (productId: string, variant: number) => {
    addItemInCart(cartId, dataCart.version, productId, variant)
      .execute()
      .then(() => {
        setRefresh(true);
        AppNotification({
          msg: `Changed count in cart!`,
          type: NotificationType.success,
        });
      })
      .catch((e) => {
        AppNotification({
          msg: e?.message,
        });
      });
  };

  const dec = (productId: string, count: number) => {
    deleteItemInCart(cartId, dataCart.version, productId, count)
      .execute()
      .then(() => {
        AppNotification({
          msg: `Changed count in cart!`,
          type: NotificationType.warn,
        });

        if (dataCart.items.length === 1 && count === 0) {
          dispatch(changeCartId(''));
          setDataCart(null);
        } else {
          setRefresh(true);
        }
      })
      .catch((e) => {
        AppNotification({
          msg: e?.message,
        });
      });
  };

  const allCountDiscount = useMemo(() => {
    if (dataCart?.items.length) {
      const totalDiscount = dataCart.items.reduce((acc, item) => {
        if (item.price.discounted.discount) {
          acc +=
            (item.price.value.centAmount -
              item.price.discounted.value.centAmount) *
            item.quantity;
        }
        return acc;
      }, 0);

      return totalDiscount / 100;
    }

    return 0;
  }, [dataCart?.totalLineItemQuantity]);

  return (
    <>
      <div className="cartPage">
        <div className="cartWrapper">
          {dataCart?.items.length ? (
            <>
              <h1 className="cartTitle">Cart</h1>
              <div className="cartBox">
                <div className="cartProducts">
                  <div className="cartProductsBox">
                    <>
                      <div className="removeAllCart">
                        <p
                          className="textRemoveAllCart"
                          onClick={deleteAllItems}
                        >
                          remove all
                        </p>
                      </div>
                      {dataCart.items.map((el) => (
                        <ProductCart
                          key={el.id}
                          dec={() => dec(el.id, el.quantity - 1)}
                          deleteAll={() => dec(el.id, 0)}
                          inc={() => inc(el.productId, el.variant.id)}
                          info={el}
                        />
                      ))}
                    </>
                  </div>
                </div>
                <div className="cartInfo">
                  <div className="titleCartInfo">Your order</div>
                  <div className="currentPriceAllCart">
                    Your count products
                    <p className="yourPricesCart">
                      {dataCart.totalLineItemQuantity}
                    </p>
                  </div>
                  {!!allCountDiscount && (
                    <div className="discountPriceAllCart">
                      Discount
                      <p className="yourPricesCart">
                        -{allCountDiscount.toFixed(2)}€
                      </p>
                    </div>
                  )}
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
                    <h3>{dataCart.totalPrice} €</h3>
                  </div>
                </div>
              </div>
            </>
          ) : (
            !!((dataCart && !dataCart.items.length) || !cartId) && (
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
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
