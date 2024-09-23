import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchHabits } from "../store/habit-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";
import { Habit } from "../store/habit-slice";


const HabitStats: React.FC = () => {
    //useselector is a hook that allows us to extract data from the redux store state
    const {habits, isLoading , error} = useSelector((state:RootState)=>state.habits);

    //useDispatch is a hook that returns a reference to the dispatch function from the redux store
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(fetchHabits());

    },[])

    const getCompletedToday = () => {
        const today = new Date().toISOString().split('T')[0];
        return habits.filter((habit)=>habit.completedDates.includes(today)).length;
    }

    
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

   
    const getLongestStreak = () => {
        return Math.max(...habits.map(getStreak),0); //Math.max returns the largest number from the array
        //if the array is empty, it returns 0
        

    } 
    


    if(isLoading){
        return <LinearProgress />
    }

    if(error){
        return <Typography color="error" >{error}</Typography>
    }

    return(
        <Paper elevation={2} sx={{p:2, mt:4}}>
            <Typography variant="h6" gutterBottom>
                Habit Statistics
            </Typography>
            <Typography variant="body1">
                Total Habits : {habits.length}
            </Typography>
            <Typography variant="body1">
                Completed Today : {getCompletedToday()}
            </Typography>
            <Typography variant="body1">
                Longest Streak : {getLongestStreak()}
            </Typography>
        </Paper>
    )
 
}

export default HabitStats;