import { useParams } from 'react-router-dom';
import './ProductDetailPage.scss';
import { getProductById } from '../../api/methods';
import { useEffect, useState } from 'react';
import { ProductData } from '@commercetools/platform-sdk';
import nextImg from '../../shared/assets/icons/right.svg';
import prevImg from '../../shared/assets/icons/left.svg';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<null | ProductData>(null);
  const [param, setParam] = useState<number | null>(null);
  const [countProduct, setCountProduct] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [currentInd, setCurrentInd] = useState<number>(0);

  const getAllInfoProduct = async () => {
    await getProductById(id)
      .then(({ body }) => setData(body.masterData.current))
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
                    {data.variants
                      .sort(
                        (a, b) => a.attributes[0].value - b.attributes[0].value
                      )
                      .map((el) => (
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
                <div className="countProduct">
                  <div
                    className="prevCountProduct"
                    onClick={() => {
                      if (countProduct <= 1) setCountProduct(1);
                      else setCountProduct(countProduct - 1);
                    }}
                  >
                    -
                  </div>
                  <div className="numbCountProduct">{countProduct}</div>
                  <div
                    className="nextCountProduct"
                    onClick={() => {
                      setCountProduct(countProduct + 1);
                    }}
                  >
                    +
                  </div>
                </div>
                <div className="addCartProduct">Add basket</div>
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
