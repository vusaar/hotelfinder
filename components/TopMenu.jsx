import Link from 'next/link';
import Box from '@mui/material/Box';

import { blue } from '@mui/material/colors';

import {InputBase,Paper,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const TopMenu =()=>{

     return (
         <>
       
        <Box sx={{display:'flex', flexDirection:'column', borderBottom:'1px solid #edf2f7', p:2,m:2,fontWeight:800, fontSize:20 ,fontFamily:'sans-serif' }}>
        <Link href={{pathname : "/",
                 }}  >

               <a>    
             <>  
             
             <Box sx={{display:'flex', flexDirection:'row' }}>
             <Box sx={{display:'flex',flexDirection:'column',color:blue[400]}}>Hotel</Box> <Box sx={{display:'flex',flexDirection:'column',color:'#f542a5'}}>Finder</Box>
             </Box>
           
           </> 
           </a>
           
           </Link>  
           </Box>
         </>
     )        
    }



    export default TopMenu;