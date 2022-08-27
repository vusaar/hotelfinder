import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
 
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',

  },
}));

export default function Footer(props) {
  const classes = useStyles();



  return (
    <footer sx={{ mt:"30px", borderTop:'2px solid #edf2f7'}}>
      <Container maxWidth="lg" sx={{ mt:"30px", borderTop:'2px solid #edf2f7'}}>
          
        <Box pt={6} display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" className={classes.rootBox}>

          <Link href="https://www.linkedin.com/in/vusaar" color="inherit" underline="none">
            <Box sx = {{display:'flex', flexDirection:'row'}}>
          <img src='/img/linkedin-48.png' alt="" width='22' />
          <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>linkedin.com/in/vusaar</Typography>
            </Box>
          </Link>
             
          <Link href="https://www.github.com/vusaar/hotelfinder" color="inherit" underline="none" ml='20px'>
          <Box sx = {{display:'flex', flexDirection:'row'}}>
          <img src='/img/github-24.png' alt="" width='22' />
          <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>github.com/vusaar/hotelfinder</Typography>
          </Box>
          </Link>
            
          <Link href="#" color="inherit" underline="none" ml='20px'>
          <Box sx = {{display:'flex', flexDirection:'row'}}>
          <img src='/img/gmail-logo-48.png' alt="" width='22'/>
          <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>vusaar@gmail.com</Typography>
          </Box>
          </Link>
         
        </Box>

        <Box py={4} display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" className={classes.rootBox}>
        <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}> © 2022</Typography>
          </Box>
        

       
      </Container>
    </footer>
  );
}