import { useMemo } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart } from '../Slices/cartSlice'

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

function CartList() {
  const cartItems = useSelector((state) => state.cartReducer.cartList || [])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems],
  )
  const savings = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0),
    [cartItems],
  )

  return (
    <main className="cart-page">
      <Container>
        <button type="button" className="back-to-shop cart-back" onClick={() => navigate('/')}>← Continue shopping</button>
        <div className="cart-heading">
          <div>
            <span className="blue-kicker">YOUR SHOPPING BAG</span>
            <h1>Shopping cart</h1>
            <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready for checkout</p>
          </div>
          <div className="secure-checkout"><span>✓</span> Secure checkout</div>
        </div>

        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is feeling light</h2>
            <p>Add something you love and it will appear here.</p>
            <Button className="primary-product-button" onClick={() => navigate('/')}>Start shopping</Button>
          </section>
        ) : (
          <Row className="cart-layout g-4">
            <Col lg={8}>
              <section className="cart-items-panel">
                <div className="cart-panel-header"><h2>Cart items</h2><span>{cartItems.length} products</span></div>
                {cartItems.map((item, index) => (
                  <article className="cart-item" key={`${item.id}-${index}`}>
                    <div className="cart-item-image"><img src={item.images?.[0]} alt={item.name} /></div>
                    <div className="cart-item-info">
                      <span className="product-category">{item.category}</span>
                      <h3>{item.name}</h3>
                      <p>{item.brand} · {item.title}</p>
                      <button type="button" className="remove-item" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                    </div>
                    <div className="cart-item-price">
                      <strong>{formatPrice(item.price)}</strong>
                      <del>{formatPrice(item.originalPrice)}</del>
                      <div className="cart-quantity"><button type="button">−</button><span>1</span><button type="button">+</button></div>
                    </div>
                  </article>
                ))}
              </section>
              <div className="cart-benefits">
                <div><span>✓</span><div><strong>Free delivery</strong><small>On orders above ₹500</small></div></div>
                <div><span>↻</span><div><strong>Easy returns</strong><small>30-day return policy</small></div></div>
                <div><span>🔒</span><div><strong>Safe payments</strong><small>100% secure checkout</small></div></div>
              </div>
            </Col>
            <Col lg={4}>
              <aside className="order-summary">
                <div className="summary-title"><h2>Order summary</h2><span>{cartItems.length} items</span></div>
                <div className="summary-line"><span>Subtotal</span><strong>{formatPrice(total)}</strong></div>
                <div className="summary-line"><span>Delivery</span><strong className="free-label">FREE</strong></div>
                <div className="summary-line"><span>Discount</span><strong className="saving-label">-{formatPrice(savings)}</strong></div>
                <div className="summary-divider" />
                <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
                <div className="promo-box"><span>％</span><input placeholder="Promo code" aria-label="Promo code" /><button type="button">Apply</button></div>
                <Button className="checkout-button">Proceed to checkout <span>→</span></Button>
                <p className="checkout-note">Taxes and shipping calculated at checkout</p>
              </aside>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  )
}

export default CartList
