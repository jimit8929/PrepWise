
import {LuPlus} from "react-icons/lu";
import {CARD_BG} from "../../utils/data.js";
import toast from "react-hot-toast";

import DashBoardLayout from '../../components/Layouts/DashBoardLayout.jsx';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const navigate = useNavigate();
  
  const [openCreateModal , setOpenCreateModal] = useState(false);
  const [sessions , setSessions] = useState([]);

  const [openDeleteALert , setOpenDeleteAlert] = useState({open:false , data:null});


  const fetchAllSessions = async() => {

  }

  const deleteSession = async(sessionData) => {

  };

  useEffect(() => {
    fetchAllSessions();
  },[]);

  return (
    <DashBoardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">

        </div>

        <button className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20" onClick={() => setOpenCreateModal(true)}>
          <LuPlus className="text-2xl text-white"/>
          Add New 
        </button>
      </div>
    </DashBoardLayout>
  )
}

export default Dashboard