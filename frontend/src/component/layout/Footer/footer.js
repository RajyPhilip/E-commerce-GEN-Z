import React from "react" ;
import './footer.css'

import playstore from '../../../images/playstore.png'
import appstore from '../../../images/appstore.png'


const Footer=()=>{
    return(
        <footer id="footer">

            <div className="leftFooter" >
                <h4>DOWNLOAD OUR APP </h4>
                <p>Download our App for Androrid and IOS mobile phone</p>
                <img src={playstore} alt='Playstore' />
                <img src={appstore} alt='Appstore' />

            </div>

            <div className="midFooter" >
                <h1>GEN-Z</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights 2021 &copy; RajyPhilip</p>
            </div>

            <div className="rightFooter" >
                <h4>Follow Us</h4>
                <a href="#">     
                    <img src="https://cdn-icons-png.flaticon.com/512/3955/3955024.png"/>
                </a>
                <a href=""> 
                    <img src="https://cdn-icons-png.flaticon.com/128/3670/3670147.png"/>
                </a>
                <a href="">
                    <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"/> 
                </a>

            </div>

        </footer>
    )
}

export default Footer ;