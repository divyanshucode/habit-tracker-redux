
import React from 'react';
import {useState} from 'react';
import Box  from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {FormControl , InputLabel, MenuItem, Select,Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import { AppDispatch } from '../store/store';
import { addHabit } from '../store/habit-slice';

//React.FC is a generic type that takes in props
//in tsx file, we will use this type to define the type of our props
const AddHabitForm:React.FC= () => {

    const[name,setName]= useState<string>('');
    const[frequency,setFrequency]= useState<"daily" | "weekly">('daily');

    const dispatch = useDispatch<AppDispatch>();

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        if(name.trim()){ //name.trim() removes any whitespace from the beginning and end of the string
           dispatch(
            addHabit({
                name,
                frequency
            })
           )
           setName('');
        }
    }

    return (
     <div>
        <form onSubmit={handleSubmit}>
            <Box sx={{               //sx is a prop that allows us to add styles to our components
                display:'flex',
                flexDirection:'column',
                gap:2,
            }}>
                <TextField
                  label="Habit Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="Enter habit name"
                  fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select 
                    value={frequency}
                    onChange={(e)=>setFrequency(e.target.value as "daily" | "weekly")}>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
               </FormControl>
               <Button variant="contained" color="primary" type='submit'>Add Habit</Button>
            </Box>
        </form>
     </div>
    )
}

export default AddHabitForm;