import React from 'react'
import Bild23 from '../Components/Assets/Bild23.webp'
import './Css/Home.css'
import Card from 'react-bootstrap/Card'
import Bild17 from '../Components/Assets/Bild17.webp'
import Bild8 from '../Components/Assets/8.webp'

/* Här är min komponent för Home.jsx. Här visar jag min startsida för min webbshop.
Jag använder en Hero section för att visa en stor rubrik och en undertext.
Jag använder också en Featured section för att visa några utvalda produkter. */
const Home = () => {
  return (
      <div className='home'>
       <div className="banner">
       <div className="banner-text">
    
        Sale now on! Check out our new arrivals and vast selection of clothing for men and women. &nbsp; Sale now on! Check out our new arrivals and vast selection of clothing for men and women.
       
        </div>
        </div>
        <section className="hero">
          <h1 className='Intro-h1'>FASHIONHUB</h1>
          <p className='Intro-p'>Shop the latest fashion trends</p>
          </section>
          <section className="featured">
          <div className="row">
          <Card className="Cards">
          <Card.Img className="imagesrow" src={Bild17} alt="Card image" />
          </Card>
          <Card className="Cards">
          <Card.Img className="imagesrow" src={Bild23} alt="Card image" />
          </Card>
          <Card className="Cards">
          <Card.Img className="imagesrow" src={Bild8} alt="Card image" />
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Home;
