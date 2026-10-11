import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import Footer from './Layout/Footer.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <Footer />
    </StrictMode>
  </Provider>
)
