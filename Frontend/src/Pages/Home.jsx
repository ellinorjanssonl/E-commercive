import React from 'react'
import Bild23 from '../Components/Assets/Bild23.webp'
import './Home.css'
import Card from 'react-bootstrap/Card'
import Bild17 from '../Components/Assets/Bild17.webp'



const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1 className='Intro'>FASHONHUB</h1>
        <p className='Intro'>Shop the latest fashion trends</p>
        </section>
       <section className="featured">
        
        <div className="row">
        <Card className="Cards">
        <Card.Img className ="imagesrow" src={Bild17} alt="Card image" />
        </Card>
        <Card className="Cards">
         <Card.Img className ="imagesrow" src={Bild23} alt="Card image" />
        </Card>
       </div>
     </section>


    </div>
  )
}

export default Home
