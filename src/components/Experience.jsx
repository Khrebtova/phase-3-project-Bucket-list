import React from 'react'
import Item from './Item'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const Experience = ({list, onHandleDelete, onHandleEditItem}) => {
  const displayList = list.filter(item => item.category.name === 'experience')
  
  return (
    <Box sx={{maxWidth: 600, backgroundColor: 'success.light', mb: 1 }}>
      <Grid >
        <Typography sx={{ ml: 10, mt: 4, mb: 4, color: "background.paper"}} variant="h3" component="div">
          Experience
        </Typography>
        <List sx={{ ml: 10, mb: 10, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
          {displayList.map(item => <Item key= {item.id} item ={item} onHandleDelete={onHandleDelete} onHandleEditItem={onHandleEditItem}/>)}
        </List>        
      </Grid>
    </Box>
  )
}

export default Experience