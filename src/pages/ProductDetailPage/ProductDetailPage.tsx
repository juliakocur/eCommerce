import { useParams } from 'react-router-dom';
import './ProductDetailPage.scss';
import { getProductById } from '../../api/methods';
import { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<null | Product>(null);

  const getAllInfoProduct = async () => {
    await getProductById(id)
      .then(({ body }) => setData(body))
      .catch(() => setData(null));
  };

  useEffect(() => {
    getAllInfoProduct();
  }, []);

  return (
    <>
      {!!data && (
        <h1>
          Product page, id: {id}, name: {data.masterData.current.name.en}
        </h1>
      )}
    </>
  );
};

export default ProductDetailPage;
