import { useParams } from 'react-router-dom';
import './ProductDetailPage.scss';
import {
  addItemInCart,
  createCart,
  getCartById,
  getProductById,
} from '../../api/methods';
import { useEffect, useMemo, useState } from 'react';
import { ProductData } from '@commercetools/platform-sdk';
import nextImg from '../../shared/assets/icons/right.svg';
import prevImg from '../../shared/assets/icons/left.svg';
import { IDataCart } from '../MainPage/MainPage';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  AppNotification,
  NotificationType,
} from '../../components/Notification/Notification';
import { changeCartId } from '../../store/rootReducer';

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { cartId } = useAppSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);
  const [dataCart, setDataCart] = useState<null | IDataCart>(null);
  const { id } = useParams();
  const [data, setData] = useState<null | ProductData>(null);
  const [param, setParam] = useState<number | null>(null);
  const [popUp, setPopUp] = useState(false);
  const [currentInd, setCurrentInd] = useState<number>(0);

  useEffect(() => {
    if (cartId || refresh) {
      getCartById(cartId).then((res) => {
        if (res.body.lineItems?.length) {
          setDataCart({
            version: res.body.version,
            items: res.body.lineItems,
          });
        }
      });
      setRefresh(false);
    }
  }, [cartId, refresh]);

  const addProductInCart = (cart: string, v: number) => {
    addItemInCart(cart, v, id, param)
      .execute()
      .then(() => {
        setRefresh(true);
        AppNotification({
          msg: `${data?.name.en} add to cart!`,
          type: NotificationType.success,
        });
      })
      .catch((e) => {
        AppNotification({
          msg: e?.message,
        });
      });
  };

  const onClickBtnHandler = () => {
    if (!cartId) {
      createCart().then((res) => {
        dispatch(changeCartId(res.body.id));
        addProductInCart(res.body.id, res.body.version);
      });
    } else {
      addProductInCart(cartId, dataCart.version);
    }
  };

  const getAllInfoProduct = async () => {
    await getProductById(id)
      .then(({ body }) => {
        setData(body.masterData.current);
        setParam(body.masterData.current.variants[0].id);
      })
      .catch(() => setData(null));
  };

  useEffect(() => {
    getAllInfoProduct();
  }, []);

  const onClickHandler = (type: 'left' | 'right') => {
    if (type === 'right') {
      currentInd < data.masterVariant.images.length - 1
        ? setCurrentInd(currentInd + 1)
        : setCurrentInd(0);
    } else {
      currentInd === 0
        ? setCurrentInd(data.masterVariant.images.length - 1)
        : setCurrentInd(currentInd - 1);
    }
  };

  const getPosition = (idx: number) => {
    if (idx === currentInd) {
      return 'activeSlide';
    }
    if (
      idx === currentInd - 1 ||
      (currentInd === 0 && idx === data.masterVariant.images.length - 1)
    ) {
      return 'lastSlide';
    }

    return 'nextSlide';
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
    <>
      {data ? (
        <div className="wrapperProduct">
          <h1>{data?.name.en}</h1>
          <div className={`popup ${popUp ? 'active' : ''}`}>
            <div className="popupBgColor" onClick={() => setPopUp(false)}></div>
            <div className="popupCard">
              <div className="exitPopUp" onClick={() => setPopUp(false)}></div>
              <img
                className="imgPopupCard"
                src={prevImg}
                onClick={() => onClickHandler('left')}
              />
              <div className="windowPopUp">
                <div className="allPagesContainer">
                  {data.masterVariant.images.map((el, idx) => (
                    <div className={getPosition(idx)} key={idx}>
                      <img className="imgAllPagesContainer" src={el.url} />
                    </div>
                  ))}
                </div>
              </div>
              <img
                className="imgPopupCard"
                src={nextImg}
                onClick={() => onClickHandler('right')}
              />
            </div>
          </div>
          <div className="boxProduct">
            <div className="sidebarProduct">
              {data.masterVariant.images.map((el, idx) => {
                return (
                  <div
                    className={`cardSidebarProduct ${
                      idx === currentInd ? 'active' : ''
                    }`}
                    key={`imgProduct-${idx}`}
                    onClick={() => {
                      setCurrentInd(idx);
                    }}
                  >
                    <img
                      src={el.url}
                      alt="image product"
                      className="imgSidebar"
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="imgProduct"
              onClick={() => {
                setPopUp(true);
              }}
            >
              <img
                className="imageProduct"
                src={data.masterVariant.images[currentInd].url}
                alt="image product"
              />
            </div>
            <div className="infoProduct">
              <div className="textInfoProduct">
                <div className="aboutProduct">
                  <h3 className="subTitleText">Product information</h3>
                  <div className={`partText`}>{data?.description.en}</div>
                </div>
                <div className="typeProduct">
                  <h4>Size:</h4>
                  <div className="blockTypeProduct">
                    {data.variants.map((el) => (
                      <div
                        className={`btnTypeProduct ${
                          param === el.id ? 'active' : ''
                        }`}
                        key={`param-${el.id}`}
                        onClick={() => setParam(el.id)}
                      >
                        {el.attributes[0].value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="buyProduct">
                <div className="priceProduct">
                  <div className="currentPrice">
                    {data.masterVariant.prices[0].discounted.discount
                      ? data.masterVariant.prices[0].discounted.value
                          .centAmount / 100
                      : data.masterVariant.prices[0].value.centAmount /
                        100}{' '}
                    €
                  </div>
                  {!!data.masterVariant.prices[0].discounted.discount && (
                    <div className="discountPrice">
                      {data.masterVariant.prices[0].value.centAmount / 100} €
                    </div>
                  )}
                </div>
                <div
                  className={`addCartProduct ${inCart ? 'inCart' : ''}`}
                  onClick={inCart ? undefined : onClickBtnHandler}
                >
                  {' '}
                  {inCart ? 'Added' : 'Add to cart'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
};
export default ProductDetailPage;
