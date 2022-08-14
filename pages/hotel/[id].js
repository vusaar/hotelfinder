import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { fetchAPI } from '../../utilities/fetchAPI'
import Link from 'next/link'
import {Button,Box, Card, Typography} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import BedIcon from '@mui/icons-material/Hotel'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { blue } from '@mui/material/colors';

export default function Hotel(props){

  //console.log(props.propertyImages)

  let five = props.propertDescription.data.body.propertyDescription.starRating
  
  let stars  = []
  for(let i=0; i<five; i++){
      stars.push(<StarBorderIcon/>)
  }

  console.log(props.propertDescription)

    return (
        
        <>
          <Box sx = {{display:'flex', flexDirection:'column'}}>

        
           <Box sx={{display:'flex', flexDirection:'row', borderBottom:'1px solid #edf2f7', p:2,m:2,fontWeight:800, fontSize:20 ,fontFamily:'sans-serif', color:blue[400]}}>
           <Link href={{pathname : "/",
                 }}  >
                  <a>
           Hotel <Box sx={{color:'#f542a5'}}>Finder</Box>
           </a>
           </Link>
           </Box>           
       

           <Box sx = {{display:'flex', flexDirection:'row'}}>
          <Card sx={{flex:'1',justifyItems:'center',m:'5px'}}>
         
          {props.propertyImages.hotelImages?
         <Carousel sx={{justifyItems:'center',textAlign: 'center'}} >
             {props.propertyImages.hotelImages.map((hotelImage)=>(
              <Image  src={hotelImage.baseUrl.replace('{size}','z')} width='500px' height={'500px'} key={hotelImage.imageId} ></Image>)
             )}
         </Carousel>
         :
         <>{props.propertyImages.error}</>
          }
           </Card>

           <Card sx={{flex:'1', m:'5px'}}>
            

            <Box sx={{display: 'flex',flexDirection:'column',pl:'10px',ml:'10px'}}>
               <div>
               <Typography sx={{color:'#707070', fontWeight:'900', fontSize:'larger'}}>
                   <h2> {props.propertDescription.data.body.propertyDescription.name}</h2>
                  
                </Typography>

                <Typography sx={{color:'#707070',mt:'0px', pt:'0px', fontSize:'smaller'}}>
               
                <div dangerouslySetInnerHTML={{ __html: props.propertDescription.data.body.propertyDescription.tagline[0] }} />
                </Typography>


                <Box sx={{mt:'15px'}}>
                <Typography sx={{fontSize:'15px', mr:'10px', color:'#707070'}}>
                <LocationOnIcon sx={{fontSize:'18px', mr:'10px', color:'#f542a5'}}/> Physical Address 
                  </Typography> 

                <Typography sx={{color:'#707070',ml:'15px',color:'#42a5f5', fontSize:'smaller'}}>
                    {props.propertDescription.data.body.propertyDescription.address.fullAddress}
                </Typography>
                </Box>
                 
                <Box sx={{mt:'15px'}}>
                <Typography sx={{fontSize:'18px', mr:'10px', color:'#707070'}}>
                <BedIcon sx={{fontSize:'18px', mr:'10px', color:'#f542a5'}}/> Price Room/night 
                  </Typography> 
                <Typography sx={{fontSize:'16px', ml:'15px', color:'#42a5f5'}}>
                 
                
                 ({props.propertDescription.data.body.pdpHeader.currencyCode})
                {props.propertDescription.data.body.propertyDescription.featuredPrice.currentPrice.formatted}.00
                  
  
                </Typography>
                </Box>
                
                <Box sx={{mt:'15px'}}>
                
                <Typography sx={{fontSize:'18px', mr:'10px', color:'#707070'}}>
                  <StarPurple500Icon sx={{fontSize:'18px', mr:'10px', color:'#f542a5'}}/>
                  Rating 
                  </Typography>
                <Typography sx={{fontSize:'9px', ml:'12px', color:'#42a5f5'}}>
                 {stars}
                  
                </Typography>

                </Box>


                <Box sx={{mt:'15px'}}>
                
                <Typography sx={{fontSize:'18px', mr:'10px', color:'#707070'}}>
                  <SentimentVerySatisfiedIcon sx={{fontSize:'18px', mr:'10px', color:'#f542a5'}}/>
                  Freebies </Typography>
                <Typography sx={{fontSize:'15px', ml:'18px', color:'#42a5f5'}}>
                {props.propertDescription.data.body.propertyDescription.freebies}
                  
                </Typography>

                </Box>

                


               </div>
              </Box>
           </Card>
           </Box>


           <Box sx = {{display:'flex', flexDirection:'row'}}>

             <Box sx={{m:'15px'}}>
           <Typography>
                <Typography sx={{fontSize:'18px', mr:'10px', color:'#707070'}}>Amenities </Typography>

                {props.propertDescription.data.body.amenities.map((amenity)=>(
                    <Typography>
                        {amenity.heading}
                          <Typography sx={{display:'flex',fontSize:'10px', flexWrap:'false',flexDirection:'column'}}>
                            {amenity.listItems.map((amenityItem)=>(
                              <Box sx={{display:'flex',flexWrap:'false',flexDirection:'row'}}>
                              <Box sx={{border:'1px solid #d0d0d0', borderRadius:'5px',padding:'3px',m:'1px', color:'#f542a5',backgroundColor:'#F8F8F8', fontWeight:'bold'}}>
                              {amenityItem.heading} 
                              </Box>
                              <Box sx={{border:'1px solid #d0d0d0', borderRadius:'5px',padding:'3px',m:'1px', color:'#42a5f5',backgroundColor:'#F8F8F8', fontWeight:'bolder'}}>
                                 {amenityItem.listItems.map((value,)=>(
                                   value +', '
                              ))}</Box>
                              </Box>
                            ))}
                          </Typography>
                      </Typography>
                ))}
                </Typography>
                </Box>
            </Box>

          </Box>
        
        </>
    )
}



export async function getServerSideProps({ params: { id } }) {
    const imageData = await fetchAPI('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id='+id);

    const hotelData = await fetchAPI('https://hotels4.p.rapidapi.com/properties/get-details?id='+id);
    
    console.log(hotelData);
    
    return {
      props: {
        propertyImages: imageData,
        propertDescription: hotelData,
      },
    };
  }