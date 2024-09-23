import React from 'react';
import {useSelector} from 'react-redux';
import { RootState } from '../store/store';
import {Box,Paper,Grid,Typography,Button, LinearProgress} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {AppDispatch} from '../store/store';
import { Habit, removeHabit, toggleHabit } from '../store/habit-slice';


const HabitList : React.FC = () => {
    const {habits} = useSelector((state:RootState)=>state.habits);
    const today = new Date().toISOString().split('T')[0];

    const dispatch = useDispatch<AppDispatch>();

    const getStreak = (habit:Habit) => {
        let streak = 0;
        const currentDate = new Date();
        
        //logic to calculate streak
        //if the current date is in the completedDates array, increment the streak
        //if not, break out of the loop
        while(true){
            const dateString = currentDate.toISOString().split('T')[0];
            if(habit.completedDates.includes(dateString)){
                streak++;
                currentDate.setDate(currentDate.getDate()-1);//decrement the date by 1
                //if the date is less than 1, while loop becomes false
            }else{
                break;
            }
        }
        return streak;
    }

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2,
            mt:4,
        }}>
            {habits.map((habit)=>{
                return <Paper key={habit.id}  elevation={2}  sx={{p:2}}>
                    <Grid container alignItems="center">
                        <Grid xs={12} sm={6}>
                            <Typography variant="h6">{habit.name}</Typography>
                            <Typography
                             variant="body2"
                             color="text.secondary"
                            // sx={{textTransform: "capitalize" }}
                            >
                            {habit.frequency}</Typography>
                        </Grid>
                    
                    <Grid xs={12} sm={6}>
                        <Box sx={{display:"flex" , justifyContent:"flex-end" , gap:1}}>
                            <Button
                             variant='outlined'
                             color={
                                habit.completedDates.includes(today)
                                ? "success"
                                : "primary"
                             }
                             startIcon={<CheckCircleIcon />}
                             //function to add or remove date from completedDates array
                             onClick={()=>
                                dispatch(toggleHabit({id:habit.id,date:today}))
                               }

                             >                                
                             {habit.completedDates.includes(today)
                             ? "Completed"
                             : "Mark Completed"
                             }
                             
                             
                             </Button>
                             <Button
                               variant='outlined'
                               color='error'
                               startIcon={<DeleteIcon />}
                               onClick={()=>{
                                  dispatch(removeHabit(habit.id))
                               }}
                             
                             >
                                    Remove
                             </Button>
                        </Box>
                    </Grid>
                    </Grid>
                    <Box sx={{mt:2}}>
                        <Typography variant='body2'>
                            Current Streak : {getStreak(habit)} days
                            <LinearProgress
                             variant='determinate'
                             value={(getStreak(habit)/7)*100} //determine progress bar value with respect to 7 days
                             sx={{mt:1}}
                            />
                        </Typography>
                    </Box>
                </Paper>
            })}
        </Box>
    )
}
export default HabitList;