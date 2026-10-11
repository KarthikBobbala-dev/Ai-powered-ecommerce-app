import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Components/Home'
import ProductById from './Components/ProductById'
import CartList from './Components/CartList'
import Header from './Layout/Header'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesSelect, setCategoriesSelected] = useState('')

  useEffect(() => {
    const loadCatalog = async () => {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch('/assets/mock/Products.json'),
        fetch('/assets/mock/Category.json'),
      ])
      const [productsData, categoriesData] = await Promise.all([
        productsResponse.json(),
        categoriesResponse.json(),
      ])
      setProducts(productsData.products)
      setCategories(categoriesData.categories)
    }

    loadCatalog()
  }, [])

  const filteredProducts = categoriesSelect
    ? products.filter((product) => product.category === categoriesSelect.name)
    : products

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <Home
              products={filteredProducts}
              categories={categories}
              categoriesSelect={categoriesSelect}
              setCategoriesSelected={setCategoriesSelected}
            />
          )}
        />
        <Route path="/product/:id" element={<ProductById products={products} />} />
        <Route path="/cart" element={<CartList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
