import { Badge, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

function ProductCard({ products = [] }) {
  const navigate = useNavigate()

  if (!products.length) {
    return (
      <Col xs={12}>
        <div className="no-products">
          <span>⌕</span>
          <h3>No products found</h3>
          <p>Try another search term or choose a different category.</p>
        </div>
      </Col>
    )
  }

  return products.map((product) => (
    <Col sm={6} xl={4} key={product.id}>
      <Card className="product-card h-100">
        <div className="product-image-wrap">
          <img src={product.images?.[0]} alt={product.name} className="product-image" />
          {product.isFeatured && <Badge className="featured-badge">Featured</Badge>}
          <span className="image-discount">−{product.discount}%</span>
        </div>
        <Card.Body>
          <div className="product-topline">
            <span className="product-category">{product.category}</span>
            {product.isBestSeller && <span className="seller-badge">Best seller</span>}
          </div>
          <Card.Title>{product.name}</Card.Title>
          <div className="product-brand">{product.brand}</div>
          <p className="product-description">{product.title}</p>
          <div className="product-meta">
            <div className="rating">
              <span>★</span> {product.rating} <small>({product.reviewCount.toLocaleString('en-IN')})</small>
            </div>
            <span className="stock">In stock</span>
          </div>
          <div className="price-line">
            <strong>{formatPrice(product.price)}</strong>
            <del>{formatPrice(product.originalPrice)}</del>
          </div>
          <div className="product-bottom">
            <span>Free delivery</span>
            <button type="button" className="details-button" onClick={() => navigate(`/product/${product.id}`)}>
              View product <b>→</b>
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))
}

export default ProductCard
