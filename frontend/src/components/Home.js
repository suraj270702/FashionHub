import React from 'react'
import Promotion from './Promotion'
import Collections from './Collections'
import Products from './Products'
import MetaData from '../layout.js/MetaData'

const Home = () => {
  return (
    <>
    <MetaData title="FashionDestination" />
    <Promotion />
    <Collections />
    <Products />
    </>
  )
}

export default Home