import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.scss';
import { routes } from '../../routes/AppRouter';
import { Product } from '@commercetools/platform-sdk';

interface IProps {
  info: Product;
}
const ProductCard = ({
  info: {
    masterData: { current },
    id,
  },
}: IProps) => {
  const navigate = useNavigate();
  const currentDataPrice =
    current.masterVariant.prices[0].value.centAmount / 100;
  const isHasDiscount = !!current.masterVariant.prices[0].discounted.discount;

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
      <div className="wrapperPrice">
        <div className="price">
          {isHasDiscount
            ? current.masterVariant.prices[0].discounted.value.centAmount / 100
            : currentDataPrice}{' '}
          €
        </div>
        {isHasDiscount && <div className="oldPrice">{currentDataPrice} €</div>}
      </div>
      <div className="basket">Add basket</div>
    </div>
  );
};

export default ProductCard;
