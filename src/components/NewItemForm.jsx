import React from 'react'
import { dataURL, headers } from '../Global'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Select, MenuItem, FormControl } from '@mui/material'

const SubmitButton = styled(Button)({
  backgroundColor: 'paper',
  color: 'white',
  fontSize: '1.5rem',
  border: '1px solid white',
  height: 56,
  width: 100,
})

const NewItemForm = ({onHandleAddItem, categories}) => {
  const navigate = useNavigate();  
  
  const defaultData = {
    "name": "",
    "category_id": "1"
  }

  const [newItem, setNewItem] = React.useState(defaultData)
    
  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let formData = { ...newItem, [key]: value };
    setNewItem(formData);  
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newItem.name === '') {
      alert('Please enter a name')
    } else {
      fetch(dataURL, {
        method: 'POST',
        headers,
        body: JSON.stringify(newItem)
      })
      .then(res => res.json())
      .then(data => {
        onHandleAddItem(data)
        if (data.category_id === 1) { navigate('/travel') }
        else if (data.category_id === 2){ navigate('/lifestyle')} 
        else {navigate('/experience')}    
      })
      .catch(err => console.log(err))
    }
    setNewItem(defaultData) 
  }

  return (
    <div>   
      <Box sx={{display: 'flex', flexWrap: 'wrap', maxWidth: 600,   mb: 1, mt: 1 , backgroundColor: 'primary.main'}}>
        <FormControl sx={{ m: 1, width: 300, mt: 3, bgcolor: 'background.paper'  }}>
          <TextField variant="outlined" label="Enter new item to your list" name="name" placeholder="enter new item" onChange={handleChange} value = {newItem.name}/>
         </FormControl>    
        <FormControl sx={{ m: 1, width: 150, mt: 3, bgcolor: 'background.paper' }}>
          <Select name="category_id" label="Category" onChange={handleChange} value = {newItem.category_id} >
            <MenuItem value={1}>Travel</MenuItem>
            <MenuItem value={2}>LifeStyle</MenuItem>
            <MenuItem value={3}>Experience</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 50, mt: 3 }}>
          <SubmitButton type="submit" variant="contained" color="primary" size="large" onClick={handleSubmit} >Add</SubmitButton>
        </FormControl> 
      </Box>    
    </div>
  )
}

export default NewItemForm