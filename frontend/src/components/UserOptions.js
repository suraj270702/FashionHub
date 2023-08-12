import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { ToastContainer, toast } from 'react-toastify';
import { Logout } from '../actions/LoginActions';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './UserOptions.css'
const UserOptions = ({user}) => {
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dashboard =()=>{
        navigate("/dashboard")
    }
    const orders =()=>{
        navigate("/orders")
    }
    const account =()=>{
        navigate("/account")
    }
    const logout =()=>{
        dispatch(Logout())
        toast.success("Logout Successfully")
        window.location.href="/"
    }
    const options = [
        {icon : <ListAltIcon />,name : "Orders",func : orders},
        {icon : <PersonIcon />,name : "Person",func : account},
        {icon : <ExitToAppIcon />,name : "Logout",func : logout}

    ]
    if(user.role === "admin"){
        options.unshift({icon : <DashboardIcon />,name : "Dashboard",func : dashboard})
    }

    
  return (
    
    <>
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    icon={
        <img className='speedDialIcon' src={user.avatar.url} />
    }
    direction='down'
    className='speedDial'
    >
{options.map((item)=>(
    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} tooltipOpen={window.innerWidth <= 600 ? true : false} onClick={item.func}/>
))}
    </SpeedDial>
    <ToastContainer />
    </>
  )
}

export default UserOptions