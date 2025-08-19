import React, { useContext } from 'react'
import {UserContext} from "../../context/useContext.jsx";
import Navbar from './Navbar.jsx';

const DashBoardLayout = ({children}) => {

  const {user} = useContext(UserContext);

  return (
    <div>
      <Navbar/>

      {user && <div>{children}</div>}
    </div>
  )
}

export default DashBoardLayout