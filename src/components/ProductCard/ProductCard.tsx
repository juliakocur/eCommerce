import { Link } from 'react-router-dom';
import { IProductItem } from '../../shared/mock';
import './ProductCard.scss';
import { routes } from '../../routes/AppRouter';
interface IProps {
  info: IProductItem;
}
const ProductCard = ({ info }: IProps) => {
  return (
    <div className="wrapperCard">
      <div className="wrapperImg">
        <img className="imgSneakers" src={info.photo} alt="" />
      </div>
      <Link className="nameModel" to={`../${routes.product.path}/${info.name}`}>
        {info.name}
      </Link>
      <div className="wrapperPrice">
        <div className="price">{info.price}</div>
        <div className="oldPrice">{info.oldPrice}</div>
      </div>
      <div className="basket">Add basket</div>
    </div>
  );
};

export default ProductCard;
