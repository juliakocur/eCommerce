import { useParams } from 'react-router-dom';
import './ProductDetailPage.scss';
import { getProductById } from '../../api/methods';
import { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
import nextImg from '../../shared/assets/icons/right.svg';
import prevImg from '../../shared/assets/icons/left.svg';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<null | Product>(null);
  const [imgOnBoard, setImgOnBoard] = useState<string>(null);
  const [imgProduct, setImgProduct] = useState<number | null>(0);
  const [param, setParam] = useState<number | null>(null);
  const [countProduct, setCountProduct] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [currentInd, setCurrentInd] = useState<number>(0);

  const getAllInfoProduct = async () => {
    await getProductById(id)
      .then(({ body }) => setData(body))
      .catch(() => setData(null));
  };

  useEffect(() => {
    getAllInfoProduct();
  }, []);
  type TParam = {
    size?: string;
    urlImage?: string;
    id: number;
  };

  if (data != null) {
    const parameters: TParam[] = [];
    const sidebarImages: TParam[] = [];
    const parametersObj = data?.masterData.current;

    parametersObj.variants.forEach((el) => {
      const objSize: TParam = {
        size: el.key,
        id: el.id,
      };
      parameters.push(objSize);
    });
    parametersObj.masterVariant.images.forEach((el, ind) => {
      const objImg: TParam = {
        urlImage: el.url,
        id: ind,
      };
      sidebarImages.push(objImg);
    });
    if (imgOnBoard === null) setImgOnBoard(sidebarImages[0].urlImage);
    const centCount =
      data?.masterData.staged.variants[imgProduct].prices[0].discounted.value;
    return (
      <>
        <div className="wrapperProduct">
          <h1>{data?.masterData.current.name.en}</h1>
          <div className={`popup ${popUp ? 'active' : ''}`}>
            <div className="popupCard">
              <div
                className="exitPopUp"
                onClick={() => {
                  setPopUp(false);
                }}
              ></div>
              <img
                src={prevImg}
                onClick={() => {
                  setCurrentInd(currentInd - 1);
                }}
              />
              <div className="windowPopUp">
                <div className="allPagesContainer">
                  {sidebarImages.map((imageObj, imageIndex) => {
                    const { id, urlImage } = imageObj;
                    let position = 'nextSlide';
                    if (imageIndex === currentInd) {
                      position = 'activeSlide';
                    }
                    if (
                      imageIndex === currentInd - 1 ||
                      (currentInd === 0 &&
                        imageIndex === sidebarImages.length - 1)
                    ) {
                      position = 'lastSlide';
                    }

                    const lastIndex = sidebarImages.length - 1;
                    if (currentInd < 0) {
                      setCurrentInd(lastIndex);
                    }
                    if (currentInd > lastIndex) {
                      setCurrentInd(0);
                    }

                    return (
                      <div className={position} key={id}>
                        <img src={urlImage} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <img
                src={nextImg}
                onClick={() => {
                  setCurrentInd(currentInd + 1);
                }}
              />
            </div>
          </div>
          <div className="boxProduct">
            <div className="sidebarProduct">
              {sidebarImages?.map((el) => {
                return (
                  <div
                    className={`cardSidebarProduct ${
                      el.id === imgProduct ? 'active' : ''
                    }`}
                    key={`imgProduct-${el.id}`}
                    onClick={() => {
                      setImgProduct(el.id);
                      setImgOnBoard(el.urlImage);
                    }}
                  >
                    <img src={el.urlImage} alt="image product" />
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
              <img src={imgOnBoard} alt="image product" />
            </div>
            <div className="infoProduct">
              <div className="textInfoProduct">
                <div className="aboutProduct">
                  <h3>Product information</h3>
                  <div className={`partText ${open ? 'open' : ''}`}>
                    {data?.masterData.current.description.en}
                  </div>
                </div>
                <div className="typeProduct">
                  <h4>Size:</h4>
                  <div className="blockTypeProduct">
                    {parameters.map((el) => (
                      <div
                        className={`btnTypeProduct ${
                          el.id === param ? 'active' : ''
                        }`}
                        key={`param-${el.id}`}
                        onClick={() => setParam(el.id)}
                      >
                        {el.size}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="buyProduct">
                <div className="priceProduct">
                  {centCount.centAmount / 100} {centCount.currencyCode}
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
                <div className="addCartProduct">Add to cart</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <div className="loading">Loading...</div>;
};

export default ProductDetailPage;
