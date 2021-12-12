import React from 'react';
import dateFormat from 'dateformat';
import './footer.css'
var now = new Date();


const Footer=()=>{
    return(
        
        <div className="container text-center">
           <div className="footer">
                <p>{dateFormat(now, "dddd, mmmm dS")}  &copy; Mady By Alamin</p>
           </div>
        </div>       
    )
}
export default Footer