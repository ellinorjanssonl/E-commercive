import './Footer.css'

const Footer = () => {
    const year = new Date().getFullYear();
    const name = 'FASHONHUB';
    const author = 'Ellinor Jansson Lande';
  return (
      <footer className='Footer'>
          <p className='Footerp'>{name} &copy; {year} by {author}</p>
          <p className='Footerp'> Stockholm, Sweden</p>
          <p className='Footerp'>Phone: 08-123 456 78</p>
          <p className='Footerp'>Email:  Ellinor_jansson@hotmail.com
          </p>
      </footer>
  )
}

export default Footer