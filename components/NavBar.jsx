import Link from 'next/link';
import Box from '@mui/material/Box';

import { blue } from '@mui/material/colors';

import {InputBase,Paper,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const NavBar =(props)=>{

     return (
         <>
      
          <Box sx ={{display:'flex',backgroundColor:'#E7EBF0',justifyContent:'center', width:'98%',p:2,m:2}}>

          <Paper 
          component="form"
          sx={{ p: '2px 4px', display: 'flex', width:'60%' }}
          >

          <IconButton sx={{ p: '10px' }} aria-label="menu">        
          </IconButton>
         
           <InputBase
             sx={{ ml: 1, flex: 1,width:'60%',input: { fontSize: '30px', color:'gray' } }}
             placeholder="Search City or Hotel..."
             inputProps={{ 'aria-label': 'search google maps',fontSize:'24px' }} 
             value={props.searchQuery}
             onChange={(event)=>{props.setSearchQuery(event.target.value)}}           
           />
           <IconButton 
               type="button"
                sx={{ p: '20px' }}
                 aria-label="search"
                 onClick={()=>props.doSearch()}
                 >
           <SearchIcon />
           </IconButton>
           </Paper>
          </Box>
          </>
    )
     };



export default NavBar;