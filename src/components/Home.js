import React from 'react'
import '../style/Home.css'
import Product from './Product'
import {useGlobalContext} from '../context'

const Home = () => {
    //Global state product
    const {products} = useGlobalContext()

    
    return (
        <section className = 'home'>
            <div className = 'home_container'>
                <img className = 'home_image' 
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                alt="banner" />

                <div className="home_row">
                    <Product 
                    key = {products[0].id}
                    id = {products[0].id}
                    title = {products[0].title}
                    price = {products[0].price}
                    image = {products[0].image}
                    rating = {products[0].rating}/>
                    <Product 
                    key = {products[1].id}
                    id = {products[1].id}
                    title = {products[1].title}
                    price = {products[1].price}
                    image = {products[1].image}
                    rating = {products[1].rating}/>
                </div>

                <div className="home_row">
                    <Product 
                    id = {products[2].id}
                    title = {products[2].title}
                    price = {products[2].price}
                    image = {products[2].image}
                    rating = {products[2].rating}/>
                    <Product 
                    id = {products[3].id}
                    title = {products[3].title}
                    price = {products[3].price}
                    image = {products[3].image}
                    rating = {products[3].rating}/>
                    <Product 
                    id = {products[4].id}
                    title = {products[4].title}
                    price = {products[4].price}
                    image = {products[4].image}
                    rating = {products[4].rating}/>
                </div>

                <div className="home_row">
                   <Product 
                    id = {products[5].id}
                    title = {products[5].title}
                    price = {products[5].price}
                    image = {products[5].image}
                    rating = {products[5].rating}/>
                </div>
            </div>
        </section>
    )
}

export default Home
