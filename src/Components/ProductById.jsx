import { useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../Slices/cartSlice'
import { getProductSummary } from '../api/ai.service'

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

function SummaryContent({ summary }) {
  const lines = summary.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)

  return (
    <div className="ai-summary-sections">
      <div className="ai-summary-section">
        <h3>Quick overview</h3>
        {lines.map((line) => <p key={line}>{line.replace(/^[-*•]\s*/, '')}</p>)}
      </div>
    </div>
  )
}

function ProductById({ products = [] }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedProduct = products.find((item) => item.id === Number(id))
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  if (!selectedProduct) {
    return (
      <main className="product-details-page">
        <Container className="empty-product">
          <div className="empty-product-icon">?</div>
          <h1>Product not found</h1>
          <p>We could not find the product you are looking for.</p>
          <Button className="primary-product-button" onClick={() => navigate('/')}>Back to shop</Button>
        </Container>
      </main>
    )
  }

  const images = selectedProduct.images || []

  const handleGetAISummary = async () => {
    try {
      setLoading(true)
      setSummary(await getProductSummary(selectedProduct))
    } catch {
      setSummary('Unable to generate an AI summary right now. Configure VITE_GEMINI_API_KEY and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="product-details-page">
      <Container>
        <button type="button" className="back-to-shop" onClick={() => navigate('/')}>← Back to products</button>
        <div className="product-detail-card">
          <Row className="g-0">
            <Col lg={6} className="product-gallery">
              <div className="detail-image-frame">
                <img src={images[selectedImage]} alt={selectedProduct.name} />
                {selectedProduct.isFeatured && <Badge className="detail-featured-badge">Featured</Badge>}
              </div>
              <div className="thumbnail-row">
                {images.map((image, index) => (
                  <button
                    type="button"
                    className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                    key={image}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${selectedProduct.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            </Col>
            <Col lg={6} className="product-detail-content">
              <div className="detail-category">{selectedProduct.category}</div>
              <div className="detail-title-row">
                <div>
                  <h1>{selectedProduct.name}</h1>
                  <p className="detail-brand">by {selectedProduct.brand}</p>
                </div>
                {selectedProduct.isBestSeller && <span className="detail-seller-badge">Best seller</span>}
              </div>
              <div className="detail-rating">
                <span>★</span> {selectedProduct.rating}{' '}
                <small>({selectedProduct.reviewCount.toLocaleString('en-IN')} reviews)</small>
              </div>
              <p className="detail-description">{selectedProduct.description}</p>
              <div className="detail-price-row">
                <strong>{formatPrice(selectedProduct.price)}</strong>
                <del>{formatPrice(selectedProduct.originalPrice)}</del>
                <span>{selectedProduct.discount}% off</span>
              </div>
              <div className="detail-divider" />
              <div className="option-block">
                <strong>Color: <span>{selectedColor}</span></strong>
                <div className="color-options">
                  {selectedProduct.colors.map((color) => (
                    <button
                      type="button"
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      key={color}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="option-block quantity-block">
                <strong>Quantity</strong>
                <div className="quantity-control">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}>+</button>
                </div>
                <span className="detail-stock">{selectedProduct.stock} left in stock</span>
              </div>
              <div className="detail-actions">
                <Button className="add-cart-button" onClick={() => dispatch(addToCart(selectedProduct))}>Add to cart</Button>
                <Button className="buy-now-button">Buy now</Button>
                <Button className="Ai-summary" onClick={handleGetAISummary} disabled={loading}>
                  {loading ? 'Generating...' : '🤖 Get AI Summary'}
                </Button>
              </div>
              <div className="delivery-notes">
                <div><span>✓</span><strong>Free delivery</strong><small>On orders over ₹500</small></div>
                <div><span>↻</span><strong>Easy returns</strong><small>30-day return policy</small></div>
              </div>
            </Col>
          </Row>
        </div>

        {summary && (
          <section className="ai-summary-card" aria-live="polite">
            <div className="ai-summary-header">
              <div className="ai-summary-icon">✦</div>
              <div>
                <span className="blue-kicker">POWERED BY AI</span>
                <h2>Product summary</h2>
                <p>A quick, easy-to-understand guide to help you decide.</p>
              </div>
              <span className="ai-summary-status">AI generated</span>
            </div>
            <SummaryContent summary={summary} />
          </section>
        )}

        <section className="product-information">
          <div className="information-heading">
            <span className="blue-kicker">PRODUCT DETAILS</span>
            <h2>Everything you need to know</h2>
          </div>
          <Row className="g-4">
            <Col lg={7}>
              <div className="features-panel">
                <h3>Key features</h3>
                <div className="feature-grid">
                  {selectedProduct.features.map((feature) => <div key={feature}><span>✓</span>{feature}</div>)}
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="reviews-panel">
                <h3>Customer reviews</h3>
                {selectedProduct.reviews.slice(0, 2).map((review) => (
                  <div className="review-item" key={review.user}>
                    <div><strong>{review.user}</strong><span>★★★★★</span></div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  )
}

export default ProductById
