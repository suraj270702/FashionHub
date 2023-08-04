import React, { useEffect } from 'react'
import Promotion from './Promotion'
import Collections from './Collections'
import Products from './Products'
import MetaData from '../layout.js/MetaData'
import {useSelector,useDispatch} from "react-redux"
import { getProduct } from '../actions/productsActions'
import {toast} from "react-toastify"

const Home = () => {
  const dispatch = useDispatch()
  const {loading,error,products} = useSelector((state)=>state.products)
  useEffect(()=>{
    if(error){
      toast.error(error)
    }
    dispatch(getProduct())
  },[dispatch,error])
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