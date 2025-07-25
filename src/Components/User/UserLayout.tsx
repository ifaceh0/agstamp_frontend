import { Outlet } from "react-router-dom"
import Header from "../Header/Heder"
import Footer from "../Footer/Footer"
import ScrollToTop from "../Scroll/ScrollToTop"

const UserLayout = () => {
  return (
    <>
        <Header/>
        <ScrollToTop/>
        <div className="h-24.5"/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default UserLayout