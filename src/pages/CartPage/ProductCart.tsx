import { LineItem } from '@commercetools/platform-sdk';

interface IProps {
  info: LineItem;
  inc: () => void;
  dec: () => void;
  deleteAll: () => void;
}
const ProductCart = ({ info, inc, dec, deleteAll }: IProps) => {
  const isHasDiscount = !!info.price.discounted.discount;

  return (
    <div className="cartProductsItem">
      <div className="propertyItemCart">
        <div className="aboutItemCart">
          <div className="imgItemCart">
            <img
              className="imageItemCart"
              src={info.variant.images[0].url}
              alt="image product"
            />
          </div>
          <div className="textItemCart">
            <div className="titleItemCart">{info.name.en}</div>
            <div className={`btnSize`}>{info.variant.attributes[0].value}</div>
            <div className="subtitleItemCart">
              {isHasDiscount
                ? info.price.discounted.value.centAmount / 100
                : info.price.value.centAmount / 100}
              €
            </div>
          </div>
        </div>
        <div className="countProductCart">
          <div className="prevCountProductCart" onClick={dec}>
            -
          </div>
          <div className="numbCountProductCart">{info.quantity}</div>
          <div className="nextCountProductCart" onClick={inc}>
            +
          </div>
        </div>
      </div>
      <div className="priceItemCart">
        <div className="currentPriceItemCart yourPricesCart">
          {info.totalPrice.centAmount / 100}
        </div>
        {isHasDiscount && (
          <div className="discountPriceItemCart yourPricesCart">
            {(info.price.value.centAmount * info.quantity) / 100}
          </div>
        )}
        <div className="removeItemCart" onClick={deleteAll}></div>
      </div>
    </div>
  );
};

export default ProductCart;
