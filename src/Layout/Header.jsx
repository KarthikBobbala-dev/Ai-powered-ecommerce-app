import { useEffect, useState } from 'react';
import { Badge, Button, Container, Form, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchedValue } from '../Slices/search';

function Header() {
  const cartItems = useSelector((state) => state.cartReducer.cartList);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearchValue] = useState('');
  const [isInputSearch, setIsInputSearch] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const handleNavigateCartList = () => {
    navigate('/cart');
  };

  // Text search
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  // Send search value to Redux
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchedValue(search));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, dispatch]);

  // Voice search
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice search is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      console.log('Voice:', transcript);

      // Put voice result into same search state
      setSearchValue(transcript);

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(
        'Voice recognition error:',
        event.error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Toggle search mode
  const handleToggleSearch = () => {
    setIsInputSearch((prev) => !prev);
    setIsListening(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <>
      {/* Announcement */}
      <div className="announcement-bar">
        <span>Free shipping on orders over ₹500</span>

        <span className="announcement-center">
          New season. Smarter choices.
        </span>

        <span>Easy 30-day returns</span>
      </div>

      <Navbar className="store-header">
        <Container fluid className="header-inner">

          {/* Logo */}
          <Navbar.Brand
            onClick={() => navigate('/')}
            className="shop-brand"
          >
            <span className="shop-logo">S</span>

            <span>
              <strong>ShopEase</strong>
              <small>smart essentials</small>
            </span>
          </Navbar.Brand>


          {/* Search */}
          <Form
            className="header-search"
            onSubmit={(e) => e.preventDefault()}
          >

            <span className="search-icon">
              ⌕
            </span>

            <Form.Control
              value={search}
              onChange={handleSearchValue}
              placeholder={
                isListening
                  ? 'Listening...'
                  : isInputSearch
                  ? 'Search products, brands and more...'
                  : 'Try: mobiles under 20000'
              }
              aria-label="Search products"
            />

            {/* Clear */}
            {search && (
              <button
                className="clear-search"
                type="button"
                aria-label="Clear search"
                onClick={handleClearSearch}
              >
                ×
              </button>
            )}


            {/* Text search */}
            {isInputSearch ? (
              <>
                <Button
                  type="submit"
                  className="search-button"
                >
                  Search
                </Button>

                {/* Switch to voice */}
                <Button
                  type="button"
                  className="voice-toggle"
                  onClick={handleToggleSearch}
                  title="Switch to voice search"
                >
                  🎤
                </Button>
              </>
            ) : (
              <>
                {/* Voice button */}
                <Button
                  type="button"
                  className={
                    isListening
                      ? 'voice-button listening'
                      : 'voice-button'
                  }
                  onClick={handleVoiceSearch}
                  title="Start voice search"
                >
                  {isListening ? '🔴' : '🎤'}
                </Button>

                {/* Switch back to text */}
                <Button
                  type="button"
                  className="text-toggle"
                  onClick={handleToggleSearch}
                  title="Switch to text search"
                >
                  ⌨️
                </Button>
              </>
            )}

          </Form>


          {/* Cart */}
          <Button
            variant="link"
            className="cart-button"
            aria-label="Shopping cart"
            onClick={handleNavigateCartList}
          >
            <span className="cart-symbol">
              ♧
            </span>

            <Badge>
              {cartItems.length}
            </Badge>

            <span className="cart-label">
              <small>Your bag</small>
              <strong>Cart</strong>
            </span>
          </Button>

        </Container>
      </Navbar>
    </>
  );
}

export default Header;