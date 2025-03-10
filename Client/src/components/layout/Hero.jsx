import React from 'react'


import B from '../../assets/B.jpg'
import C from '../../assets/C.jpg'
import login from "../../assets/login.jpg"
import heroNN from "../../assets/heroNN.jpg"
import heroN from "../../assets/heroN.jpg"

import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="position-relative">



<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={B} className="d-block w-100" style={{objectFit: "cover", height: '600px'}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={C} className="d-block w-100" alt="..."  style={{objectFit: "cover", height: '600px'}}/>
    </div>
    <div className="carousel-item">
      <img src={login} className="d-block w-100" alt="..."  style={{objectFit: "cover", height: '600px'}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>



      
      

      <div className="ms-5 position-absolute top-50 start-50 translate-middle   text-center p-3 rounded" style={{ color: '#333'}}>
      <h1 className='display-3'><strong>Vacation <br/> Ready </strong></h1>
      <p>Explore our vacation-ready outfits with fast worldwide shipping.</p>
      <Link to="#" className='p-3 my-3 btn rounded bg-light link-dark text-decoration-none '>
      Shop Now
      </Link>
    </div>
    </section>
  )
}

export default Hero