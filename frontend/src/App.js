import React from 'react';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './Login'
import { useCookies} from 'react-cookie'
import Reporting from './Reporting'
import DelivererPortal from './DelivererPortal'
import DeliveryReporting from './DeliveryReporting'
import FreezerPortal from './FreezerPortal'
import DeliveryDriving from './DeliveryDriving'
import ProfilePage from './ProfilePage'

const pageIndex = require('./pageIndexer')

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(0)
  const [cookie, setCookie] = useCookies(["user_level"]);
  
console.log(cookie.user_level)
  
  const [page,setPage] = React.useState(0)
  const resetPage = (newPage)=>(page === newPage? setPage(0) : setPage(newPage))

  
  if(cookie.user_level === undefined || cookie.user_level == null){
    setCookie("user_level", [0,-1], { path: '/' }) 
    return null
  }

  function greeting() {
    var greeting
    var date = new Date()
    var hour = date.getHours()

    if (hour < 12) {
      greeting = "Good Morning"
    } else if (hour < 17) {
      greeting = "Good Afternoon"
    } else {
      greeting = "Good Evening"
    }
    return greeting
  }

  return (
    

    <div className="App" style={{
      backgroundColor: "rgb(239, 230, 215)"
    }}>
      < MainAppBar  setPage = {resetPage} setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level[0]}/>
      {/* ONLY THE LOGIN PAGE IS DISPLAYED IF THE USER LEVEL IS 0 */}
      {/* eslint-disable-next-line*/}
      {cookie.user_level[0]!=0? null: <LoginTab setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level[0]>0} />}
      {page === pageIndex["deliveryreporting"] && cookie.user_level[0]>2 ? <DeliveryReporting/> : null}
      {page === pageIndex["reporting"] && cookie.user_level[0]>2 ? <Reporting/> : null}
      {page === pageIndex["freezerportal"] && cookie.user_level[0]>=2 ? <FreezerPortal user_id = {cookie.user_level[1]}/> : null}
      {page === pageIndex["delivererportal"] && cookie.user_level[0]>=1 ? <DelivererPortal user_id = {cookie.user_level[1]}/> : null}
      {page === pageIndex["profile"] && cookie.user_level[0]>=1 ? <ProfilePage user_id = {cookie.user_level[1]}/> : null}
      {/* {page === pageIndex["base"] && cookie.user_level[0]>=1 ? <DeliveryDriving  delivery_id = {1} />: null}  */}
      
    </div>
  );
}

export default App;
