import './ProductCard.scss';

const ProductCard = () => {
  return (
    <>
      <div className="wrapperCard">
        <div className="wrapperImg">
          <img
            className="imgSneakers"
            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/89bd904a-dfae-4f50-930e-768e016750e0/jumpman-mvp-mens-shoes-gzmjDz.png"
            alt=""
          />
        </div>
        <div className="nameModel">Jumpman MVP</div>
        <div className="wrapperPrice">
          <div className="price">$165</div>
          <div className="oldPrice">$200</div>
        </div>
        <div className="basket">Add basket</div>
      </div>
    </>
  );
};

export default ProductCard;
