const config = {
    URL: import.meta.env.DEV ? 'http://localhost:5000/' : 'https://placeholderURL.com/',
    productsURI: 'api/products/',
    checkoutURI: 'api/checkout/',
    registerURI: 'api/register/',
    loginURI:    'api/login/',
  };
  
  export default config;