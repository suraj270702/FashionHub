import React, { useEffect } from 'react'
import Promotion from './Promotion'
import Collections from './Collections'
import Products from './Products'
import MetaData from '../layout.js/MetaData'
import {useSelector,useDispatch} from "react-redux"
import { getProduct } from '../actions/productsActions'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])
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