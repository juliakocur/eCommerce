import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.scss';
import { routes } from '../../routes/AppRouter';
import { Product } from '@commercetools/platform-sdk';
import { addItemInCart, createCart } from '../../api/methods';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';
import { changeCartId } from '../../store/rootReducer';
import { useMemo, useState } from 'react';
import { IDataCart } from '../../pages/MainPage/MainPage';

export interface IProps {
  info: Product;
  setRefresh: () => void;
  dataCart: null | IDataCart;
}
const ProductCard = ({
  info: {
    masterData: { current },
    id,
  },
  dataCart,
  setRefresh,
}: IProps) => {
  const [param, setParam] = useState<number | null>(current.variants[0].id);
  const dispatch = useAppDispatch();
  const { cartId } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const currentDataPrice =
    current.masterVariant.prices[0].value.centAmount / 100;
  const isHasDiscount = !!current.masterVariant.prices[0].discounted.discount;

  const addProductInCart = (cart: string, v: number) => {
    addItemInCart(cart, v, id, param)
      .execute()
      .then(() => {
        setRefresh();
        AppNotification({
          msg: `${current.name.en} add to cart!`,
          type: NotificationType.success,
        });
      })
      .catch((e) => {
        AppNotification({
          msg: e?.message,
        });
      });
  };

  const onClickHandler = () => {
    if (!cartId) {
      createCart().then((res) => {
        dispatch(changeCartId(res.body.id));
        addProductInCart(res.body.id, res.body.version);
      });
    } else {
      addProductInCart(cartId, dataCart.version);
    }
  };

  const inCart = useMemo(
    () =>
      dataCart
        ? !!dataCart.items.find(
            (el) => el.productId === id && el.variant.id === param
          )
        : false,
    [dataCart, param]
  );

  return (
    <div className="wrapperCard">
      <div
        className="wrapperImg"
        onClick={() => navigate(`../${routes.product.path}/${id}`)}
      >
        <img
          className="imgSneakers"
          src={current.masterVariant.images[0].url}
          alt=""
        />
      </div>
      <Link className="nameModel" to={`../${routes.product.path}/${id}`}>
        {current.name.en}
      </Link>
      <div className="descriptionSneakers">{current.description.en}</div>
      <div className="allSize">
        {current.variants.map((el) => (
          <div
            className={`btnSize ${param === el.id ? 'active' : ''}`}
            key={`param-${el.id}`}
            onClick={() => setParam(el.id)}
          >
            {el.attributes[0].value}
          </div>
        ))}
      </div>
      <div className="wrapperPrice">
        <div className="price">
          {isHasDiscount
            ? current.masterVariant.prices[0].discounted.value.centAmount / 100
            : currentDataPrice}{' '}
          €
        </div>
        {isHasDiscount && <div className="oldPrice">{currentDataPrice} €</div>}
      </div>
      <div
        className={`basket ${inCart ? 'inCart' : ''}`}
        onClick={inCart ? undefined : onClickHandler}
      >
        {inCart ? 'Added' : 'Add to cart'}
      </div>
    </div>
  );
};

export default ProductCard;
