import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'


//store is responsible for data flow in our app
//create a file named store

//we can have multiple reducers in our app
//reducers are functions that take in the current state and an action and return a new state
//they basically handle state changes in response to actions
//we will only use one to track our habits

//we will need to wrap our app in a provider
//provider is a component that will provide the store to all the components in our app
//provider requires props, one of them is store


//slice is used in redux-toolkit
//it organizes thre reducer, action, and action creator in one file
//it takes an object with a name and an initial state
//it also takes a reducers object and action creators object


//dispatch is basically a function that sends an action to the store
//it triggers action from our state
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
