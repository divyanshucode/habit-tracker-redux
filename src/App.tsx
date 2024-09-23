import {Provider} from 'react-redux'
import store from './store/store'
import './App.css'
import { Box, Container, Typography } from '@mui/material'
import AddHabitForm from './components/add-habit-form'
import HabitList from './components/add-habit-list'
import HabitStats from './components/habit-stats'

function App() {
  

  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Box sx={{my:4}}>
        <Typography component='h1' variant='h2' align='center'>
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
        </Box>
      </Container>
    </Provider>
  )
}

export default App
