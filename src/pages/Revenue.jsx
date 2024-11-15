import React, { useEffect } from 'react'
import UserList from '../components/Revenue/UserList'
import RevenueChart from '../components/Revenue/RevenueChart'

const Revenue = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.title = "BCT - Revenue";
    };
    scrollToTop()
  }, []);

  return (
    <div>
      <RevenueChart/>
      <UserList/>
    </div>
  )
}

export default Revenue
