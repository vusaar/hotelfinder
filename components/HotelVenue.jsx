import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'


import {Button,Box,Card, Typography} from '@mui/material'

import StarBorderIcon from '@mui/icons-material/StarBorder'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const HotelVenue=(props)=>{
  
  let five = props.hotel.starRating
  let id = props.hotel.id
  
  let stars  = []
  for(let i=0; i<five; i++){
      stars.push(<StarBorderIcon key={i}/>)
  }
  

  return(

    <Link href={{pathname : "/hotel/"+id,
                 }} >

    <a>              
   <Card sx={{display: 'flex', flexDirection:'row',width:'495px',alignItems:'center',m:2,p:1}}>

     <Box sx={{display: 'flex', pr:1}}>
     <Image src={props.hotel.optimizedThumbUrls?props.hotel.optimizedThumbUrls.srpDesktop:''} width='100%' height='100%'/>
     </Box>

     <Box sx={{display: 'flex',flexDirection:'column'}}>
     <div>
      <Typography sx={{color:'#707070', fontWeight:'900'}}>
        {props.hotel.name}
      </Typography></div>
     <div>
       <Typography sx={{fontSize:'13px', mt:'4'}}>
      {props.hotel.address.streetAddress} | {props.hotel.address.locality} | {props.hotel.address.countryName}
      </Typography>
      </div>
      
      <div>
      <Typography sx={{fontSize:'13px', mt:'2'}}>
        {props.hotel.ratePlan.price.info} | {props.hotel.ratePlan.price.current}
        </Typography>
        </div>
      
       <div>
       <Typography sx={{fontSize:'9px', mt:'10px', color:'#f542a5'}}>
          {stars}
          </Typography>
        </div>
     </Box>
     
           
   </Card>
   </a>
   </Link>
)}

export default HotelVenue;