import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="store-footer">
      <Container>
        <div className="footer-brand">
          <span className="shop-logo">S</span>
          <div><strong>ShopEase</strong><p>Better products. Brighter days.</p></div>
        </div>
        <div className="footer-links">
          <a href="/">Shop</a>
          <a href="#collection">New arrivals</a>
          <a href="#collection">Best sellers</a>
          <a href="mailto:hello@shopease.example">Support</a>
        </div>
        <div className="footer-meta">
          <span>Secure payments · Easy returns</span>
          <span>© 2026 ShopEase</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
