import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {Button,Box} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination'; 


import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';
import NavBar  from '../components/NavBar'
import SearchResults from '../components/SearchResults'
import { fetchAPI } from '../utilities/fetchAPI'
import HotelVenue  from '../components/HotelVenue'
import { useState,useEffect } from "react";


export default function Home(props) {

  
  const [searchResults, setSearchResults] = useState(props.results);

  const [searchQuery, setSearchQuery] = useState('Bulawayo');

  const [searchError, setSearchError] = useState('');

  const [searching, setSearching] = useState(false);

  const [currentPage, setCurrentPage]= useState(1);
 

  const [searchResultPages, setSearchResultPages]= useState(0);

  const [pageSize, setPageSize]= useState(15);


   
  useEffect(() => {
    doSearch();
  },[currentPage]);

  

  if(props.results.error){
      setSearchError(props.results.error);
  }

  let  doSearch=async()=>{
    
    /*
      reset previous error, if there was any
    */
    setSearchError('');
    setSearching(true);

    const data = await fetchAPI(encodeURI('https://hotels4.p.rapidapi.com/locations/v2/search?query='+searchQuery+'&locale=en_US&currency=USD'));


     if (data.hasOwnProperty('error')){
        
          setSearchResultPages(0);
          setSearching(false);
          setSearchError(data.error);
          return;
     }
    

    const results = data.suggestions?data.suggestions.reduce((suggestion)=>{
       if(suggestion.group=='CITY_GROUP')
         return suggestion;
    }):(()=>{return null});
 
    let mySearchResults = [];

    if(results.entities.length>0){
 

      let search_url = encodeURI('https://hotels4.p.rapidapi.com/properties/list?destinationId='+results.entities[0].destinationId+'&pageNumber='+currentPage+'&pageSize='+pageSize+'&checkIn=2022-10-08&checkOut=2022-10-18&adults1=1&sortOrder=STAR_RATING_HIGHEST_FIRST&locale=en_US&currency=USD');
     let hotels = await fetchAPI(search_url);

    console.log(search_url);

    if (hotels.error){
        
        setSearching(false);
        setSearchResultPages(0);
        setSearchError(hotels.error);
        return;
     }

     console.log(currentPage);
     console.log(hotels);
    mySearchResults = hotels.data.body.searchResults.results;

    let pageCount = Math.ceil(hotels.data.body.searchResults.totalCount/pageSize);

    setSearchResultPages(pageCount);

    }
    console.log(mySearchResults);
    setSearching(false);
    setSearchResults(mySearchResults);
  }

  return (
    
      <Box sx = {{ flexDirection:'column',width:'98%'}}>

      <TopMenu />
      
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} doSearch={doSearch} />
        
        {searching?
          <>
           <Box sx={{ display: 'flex',flexDirection:'row',justifyContent: 'center',pt:'20px',}}>
               
               <CircularProgress />
               
           </Box>
           <Box sx={{ display: 'flex',flexDirection:'row',justifyContent: 'center',p:'5px',}}>
               
           <h3>Loading...</h3>
           
       </Box>
       </>
        :
        <>
           
        {searchError==''?
        
        (searchResults.length>0?
          <Box sx={{display:'flex', flexDirection:'row', justifyItems:'center',ml:'10%',mr:'10%' ,flexWrap:'wrap'}}>
          {searchResults.map(item=><HotelVenue hotel={item} key={item.id}/>)}
          </Box>:
        <Box sx={{display:'flex', flexDirection:'row' ,flexWrap:'wrap',justifyContent: 'center'}}><Alert severity="info" sx={{flexGrow:1,m:'12px'}}>
        <AlertTitle>Info</AlertTitle>
        <strong>No hotels found</strong>
      </Alert></Box>):
         <Box sx={{display:'flex', flexDirection:'row' ,flexWrap:'wrap',justifyContent: 'center'}}><Alert severity="error" sx={{flexGrow:1,m:'12px'}}>
         <AlertTitle>error</AlertTitle>
         <strong>{searchError}</strong>
       </Alert></Box>
        }
        
        
     </>
        }

        <>
        {searchResultPages>0?
           <Stack
           direction="row"
           justifyContent="center"
            alignItems="center"
           spacing={2}
           >
            <Pagination page={currentPage} count={searchResultPages} variant="outlined" color="primary" onChange={(_, page) => {
                 // Always need safety check for page !== null
                   if (page !== null) {
                        
                        setCurrentPage(page);                        
                        
                     }
                 }} key={currentPage}/>
          </Stack>
          :
          ''
        }
        
        
       
        </>
        
         <Footer />
      
        </Box>
    
    
  )
}


export async function getServerSideProps() {
  // Fetch data from external API
  const data = await fetchAPI('https://hotels4.p.rapidapi.com/locations/v2/search?query=BULAWAYO&locale=en_US&currency=USD');


    /*
      if an error is returned , dont proceed, return error
    */
   console.log(data);
   if(data.error){
       return data;
   }

   const results = data.suggestions.reduce((suggestion)=>{
      if(suggestion.group=='CITY_GROUP')
        return suggestion;
   });

   // console.log(results);

   let searchResults = {results:[]};

   if(results.entities.length>0){

    const hotels = await fetchAPI(encodeURI('https://hotels4.p.rapidapi.com/properties/list?destinationId='+results.entities[0].destinationId+'&pageNumber=1&pageSize=10&checkIn=2022-10-08&checkOut=2022-10-18&adults1=1&sortOrder=STAR_RATING_HIGHEST_FIRST&locale=en_US&currency=USD'));


    /*
      if an error is returned , dont proceed, return error
    */
   if(hotels.error){
       return hotels;
    }

    searchResults = hotels.data.body.searchResults;

   }
   

   console.log(searchResults);
  // Pass data to the page via props

  return { props: searchResults}
}



