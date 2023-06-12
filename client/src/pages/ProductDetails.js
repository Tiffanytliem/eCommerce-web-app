import { useEffect, useState } from 'react';
import { fetchProduct } from '../lib/api';
import { Link, useParams } from 'react-router-dom';
import '../styles.css';

export default function ProductDetails() {
  const { productId } = useParams();
  console.log(useParams());
  console.log(productId);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {productId}: {error.message}
      </div>
    );
  }
  if (!product) return null;
  const { name, images, price, description } = product;
  return (
    <div className="container">
      <div className="row">
        <div className="img-col-2-thrd">
          <div className="row">
            <img src={images[0]} alt={name} className="image" />
          </div>
          {/* <div className="row">
            <div className="img-col-1-fifth">
              <img src={images[1]} alt={name} className="image" />
            </div>
            <div className="img-col-1-fifth">
              <img src={images[2]} alt={name} className="image" />
            </div>
            <div className="img-col-1-fifth">
              <img src={images[3]} alt={name} className="image" />
            </div>
            <div className="img-col-1-fifth">
              <img src={images[4]} alt={name} className="image" />
            </div>
          </div> */}
        </div>
        <div className="desc-col-1-thrd">
          <div className="row">
            <h2>{name}</h2>
          </div>
          <div className="row">
            <p className="detail-price">{price}</p>
          </div>
          <div className="row">
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div className="row">
            <p className="detail-desc">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}