import React, { useEffect } from 'react'
import { Fragment } from 'react'
import SiteNavbar from './SiteNavbar'
import { useSelector } from 'react-redux';

const Layout = (props) => {

 
  return (
   <Fragment >
    <SiteNavbar/>
    <main>{props.children}</main>
   </Fragment>
  )
}

export default Layout
