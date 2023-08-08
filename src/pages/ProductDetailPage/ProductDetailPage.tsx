import { useParams } from 'react-router-dom';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Product page, id: {id}</h1>
    </>
  );
};

export default ProductDetailPage;
