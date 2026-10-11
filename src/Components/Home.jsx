import { useMemo, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Categories from './Categories'
import ProductCard from './ProductCard'

function Home({ products = [], categories = [], categoriesSelect, setCategoriesSelected }) {
  const [sortOption, setSortOption] = useState('')
  const searchedValue = useSelector((state) => state.searchedValueReducer.searchedValue)

  const listOfProducts = useMemo(() => {
    const searchTerm = searchedValue.trim().toLowerCase()
    const filtered = searchTerm
      ? products.filter((product) =>
          [product.name, product.brand, product.category, product.title].some(
            (value) => value?.toLowerCase().includes(searchTerm),
          ),
        )
      : products

    if (sortOption === 'Low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sortOption === 'High') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [products, searchedValue, sortOption])

  return (
    <main className="catalog-page">
      <section className="shop-hero">
        <Container>
          <div className="hero-content">
            <span className="hero-eyebrow">CURATED TECH · DELIVERED FAST</span>
            <h1>Better tech for<br /><em>everyday life.</em></h1>
            <p>Discover standout devices, thoughtful essentials, and smart upgrades—all selected to make your day work better.</p>
            <div className="hero-actions">
              <a href="#collection" className="hero-primary">Shop the collection <span>→</span></a>
              <span className="hero-note"><strong>4.8/5</strong> from 12k+ happy shoppers</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />
            <div className="hero-product-card">
              <span>DEAL OF THE WEEK</span>
              <strong>Up to 20% off</strong>
              <small>on selected essentials</small>
            </div>
            <div className="hero-floating-pill">✦ AI-powered picks</div>
          </div>
        </Container>
      </section>

      <Container fluid className="catalog-shell">
        <Row className="catalog-row">
          <Col lg={2} className="sidebar-column">
            <Categories
              categories={categories}
              categoriesSelect={categoriesSelect}
              setCategoriesSelected={setCategoriesSelected}
            />
          </Col>
          <Col lg={10} className="products-column" id="collection">
            <div className="collection-heading">
              <div>
                <span className="blue-kicker">HANDPICKED FOR YOU</span>
                <h2>Explore our collection</h2>
                <p>Fresh finds, trusted brands, and prices worth smiling about.</p>
              </div>
              <div className="heading-actions">
                <Form.Select aria-label="Sort products" value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
                  <option value="">Recommended</option>
                  <option value="Low">Price: Low to high</option>
                  <option value="High">Price: High to low</option>
                </Form.Select>
                <span className="product-count">{listOfProducts.length} products</span>
              </div>
            </div>
            <Row className="products-grid g-4">
              <ProductCard products={listOfProducts} />
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Home
