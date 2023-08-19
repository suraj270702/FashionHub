import React,{useEffect, useState} from 'react'
import {Doughnut,Line } from "react-chartjs-2"
import { Bar } from 'react-chartjs-2';
import {BarElement ,CategoryScale,LinearScale,Chart as ChartJs ,LineElement, PointElement,Tooltip,Legend,ArcElement} from 'chart.js';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { adminProducts } from '../actions/productsActions';
import { adminAllOrders } from '../actions/ordersAction';
import { adminAllUsers } from '../actions/LoginActions';
const DashBoard = () => {

  ChartJs.register(
    PointElement,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
  )
  const dispatch = useDispatch()
  const {loading,products} = useSelector((state)=>state.products)
  const {orders} = useSelector((state)=>state.adminallorders)
  const {users} = useSelector((state)=>state.allusers)
  useEffect(()=>{
    dispatch(adminProducts())
    dispatch(adminAllOrders())
    dispatch(adminAllUsers())
  },[dispatch])
  let outOfStock =0;
  products.forEach((item)=>{
    if(item.stock === 0) outOfStock++;
  })

  const totalOrderPrice = orders && orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const Doughnutdata = {
    labels: [
      'Out Of Stock',
      'In Stock'
      
    ],
    datasets: [{
      label: 'Stock Status',
      data: [outOfStock, products.length-outOfStock],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  const data = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'Total Amount',
        data: [0, totalOrderPrice],
        backgroundColor: 'blue',
        hoverBackgroundColor: 'red',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true, // Use point style (for circle marker) in legend labels
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => !prevState);
    };
  return (
    <>
    
    <div class="bg-white text-white shadow w-full p-2 flex items-center justify-between">
        <div class="flex items-center">
            
            <div class="md:hidden flex items-center"> 
                <button id="menuBtn" onClick={handleMenuToggle}>
                    <i class="fas fa-bars text-gray-500 text-lg"></i> 
                </button>
            </div>
        </div>

        
        
    </div>

    
    <div class="flex-1 flex flex-wrap">
        
        <div class={`p-2 bg-white w-full md:w-60 ${isMenuOpen ? 'md:flex' : 'hidden md:flex'}`} id="sideNav">
            <nav>
                <Link class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" to="/dashboard">
                    <i class="fas fa-home mr-2"></i>DashBoard
                </Link>
                <Link class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" to="/admin/products">
                    <i class="fas fa-file-alt mr-2"></i>Products
                </Link>
                <Link class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" to="/admin/orders">
                <i class="fas fa-store mr-2"></i>  Orders
                </Link>
                <Link class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" to="/admin/users">
                    <i class="fas fa-users mr-2"></i>Users
                </Link>
                <Link class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" to="/admin/reviews">
                    <i class="fas fa-exchange-alt mr-2"></i>Reviews
                </Link>
            </nav>

            
            

            
            

        </div>

        
        <div class="flex-1 p-4 w-full md:w-1/2">
           
            

                 
        <div class="mt-8 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">

<div class="flex-1 bg-white p-4 shadow rounded-lg">
    <h2 class="text-gray-500 text-lg font-bold pb-1">Products</h2>
    <div class="my-1"></div>
    <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
    <div class="chart-container" style={{ minWidth: '100%', maxWidth: '100%' }}>
        <h1 style={{fontSize : 50}}>{products && products.length}</h1>
    </div>
</div>

<div class="flex-1 bg-white p-4 shadow rounded-lg">
    <h2 class="text-gray-500 text-lg font-semibold pb-1">Orders</h2>
    <div class="my-1"></div>
    <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
    <div class="chart-container" style={{ minWidth: '100%', maxWidth: '100%' }}>
    <h1 style={{fontSize : 50}}>{orders && orders.length}</h1>
    </div>
</div>

<div class="flex-1 bg-white p-4 shadow rounded-lg">
    <h2 class="text-gray-500 text-lg font-semibold pb-1">Users</h2>
    <div class="my-1"></div>
    <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
    <div class="chart-container" style={{ minWidth: '100%', maxWidth: '100%' }}>
    <h1 style={{fontSize : 50}}>{users && users.length}</h1>
    </div>
</div>
<div class="flex-1 bg-white p-4 shadow rounded-lg">
    <h2 class="text-gray-500 text-lg font-semibold pb-1">Total Amount</h2>
    <div class="my-1"></div>
    <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
    <div class="chart-container" style={{ minWidth: '100%', maxWidth: '100%' }}>
    <h1 style={{fontSize : 50}}>&#8377;{ totalOrderPrice}</h1>
    </div>
</div>
</div>


            
            <div class="mt-8 bg-white p-4 shadow rounded-lg">
                <h2 class="text-gray-500 text-lg font-semibold pb-4">Orders Sales Graph </h2>
                <div class="my-1"></div> 
                <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                <Line data={data}  options={options}/>
                
                
            </div>

            
            <div class="mt-8 bg-white p-4 shadow rounded-lg">
                <div class="bg-white p-4 rounded-md mt-4">
                    <h2 class="text-gray-500 text-lg font-semibold pb-4">Stocks Pie Chart</h2>
                    <div class="my-1"></div> 
                    <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                    <div className='w-96 m-auto'>
                    <Doughnut  data={Doughnutdata} options={options} />
                    </div>
                </div>
            </div>
        </div>
    </div>





    </>
  )
}

export default DashBoard