import React from 'react';
import { createContext, useReducer } from 'react'
import { StyleSheet } from 'react-native';
import HomePage from './components/HomePage/index.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GoalPage from './components/GoalPage/index.js'
import AddGoalPage from './components/AddGoalPage/index.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddMilestonePage from './components/AddMilestonePage/index.js';
import MilestonePage from './components/MilestonePage/index.js';
import AddTaskPage from './components/AddTaskPage/index.js';
import TaskPage from './components/TaskPage/index.js';
import TaskQueuePage from './components/TaskQueuePage/index.js';



const Stack = createNativeStackNavigator();
export const GoalsContext = createContext();
export const TaskQueueContext = createContext();

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function goalsReducer(state, action) {
  const update = [...state];
  switch (action.type){
    case 'hydrate':
        return action.goals
    case 'add':
        return [...state, action.goal];
    case 'delete':
        update.splice(action.index, 1);
        return update;
    case 'update':
        update[action.index] = action.goal
        return update;
    case 'AddMilestone':
        update[action.index].milestones = [... update[action.index].milestones, action.milestone]
        return update;
    case 'AddTask':
      const milestoneTasks = update[action.index].milestones[action.milestoneIndex].tasks
      update[action.index].milestones[action.milestoneIndex].tasks = [... milestoneTasks, action.task]
      return update;
    case 'DeleteMilestone':
      update[action.index].milestones.splice(action.milestoneIndex, 1);
      return update;
    case 'DeleteTask':
      update[action.index].milestones[action.milestoneIndex].tasks.splice(action.taskIndex,1)
      return update;
    case 'MarkTaskCompleted':
      var goalIndex = action.goalIndex
      var milestoneIndex = action.milestoneIndex
      update[goalIndex].milestones[milestoneIndex].tasks.splice(action.taskIndex, 1)
      update[goalIndex].milestones[milestoneIndex].completedTasks.push(action.task)
      return update;
    default:
      return state;
  }
  
}
function taskQueueReducer(state, action) {
  switch (action.type){
    case 'hydrate':
        return {
          freeTime: action.value.freeTime,
          tasks: action.value.tasks
        }
    case 'generate':
      var tasks = []
        action.goals.map((goal, index) =>{
          goal.milestones.map((milestone, milestoneIndex) => {
            milestone.tasks.map((task) => {
              if(task.time != null && task.time <= action.freeTime){
                task.goalIndex = index
                task.milestoneIndex = milestoneIndex
                tasks.push(task)
              }
            })
          })
        })
        return {
          freeTime: action.freeTime,
          tasks: shuffle(tasks)
        }
    case 'pop':
        var update = state
        update.tasks.shift()
        return {
          freeTime: update.freeTime,
          tasks: update.tasks
        }

    case 'clear':
      return {
        freeTime: state.freeTime,
        tasks: []
      }
    default:
      return state;
  }
  
}

export default function App() {
  const [goals, setGoals] = useReducer(goalsReducer, []);
  const [taskQueue, setTaskQueue] = useReducer(taskQueueReducer, {
      freeTime: 30,
      tasks: []
  });

  React.useEffect(() => {
    async function fetchData() {
      AsyncStorage.getItem('VISION_APP::GOALS').then((value) => {
        if (value) {
          action = {
            type: 'hydrate',
            goals: JSON.parse(value)
          }
          setGoals(action);
        }
      });
      AsyncStorage.getItem('VISION_APP::TASKQUEUE').then((value) => {
        if (value) {
          action = {
            type: 'hydrate',
            value: JSON.parse(value)
          }
          setTaskQueue(action);
        }
      });
    }
    fetchData()
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem('VISION_APP::GOALS', JSON.stringify(goals));
    AsyncStorage.setItem('VISION_APP::TASKQUEUE', JSON.stringify(taskQueue));

  }, [goals])
    
  return (
    <GoalsContext.Provider value={{ goals, setGoals }}>
      <TaskQueueContext.Provider value={{ taskQueue, setTaskQueue }}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen
              name="Home"
              styles={styles.heading}
              component={HomePage}
              options={{title: 'Your Goals', headerStyle:{backgroundColor: '#02C39A'}, headerTitleStyle:{ color:"white"}}}
            />
            <Stack.Screen
              name="Goals"
              styles={styles.heading}
              component={GoalPage}
              options={{title: 'Goal Details', headerStyle:{backgroundColor: '#02C39A'}, headerTitleStyle:{ color:"white"}, headerTintColor: 'white', headerBackTitleVisible: false}}
            />
            <Stack.Screen 
              name="Milestones"
              styles={styles.heading}
              component={MilestonePage}
              options={{title: 'Milestone Details', headerStyle:{backgroundColor: '#5E7CE2'}, headerTitleStyle:{ color:"white"}, headerTintColor: 'white', headerBackTitleVisible: false}}
            />
            <Stack.Screen
              name="Tasks"
              styles={styles.heading}
              component={TaskPage}
              options={{title: 'Task Details', headerStyle:{backgroundColor: '#53AFFF'}, headerTitleStyle:{ color:"white"}, headerTintColor: 'white', headerBackTitleVisible: false }}
            />
            <Stack.Screen
              name="AddGoal"
              styles={styles.heading}
              component={AddGoalPage}
              options={{title: 'New Goal', headerStyle:{backgroundColor: '#02C39A'}, headerTitleStyle:{ color:"white"},  headerBackTitle: 'Cancel', headerTintColor: 'white'}}
            />
            <Stack.Screen
              name="AddMilestone"
              styles={styles.heading}
              component={AddMilestonePage}
              options={{title: 'New Milestone', headerStyle:{backgroundColor: '#5E7CE2'}, headerTitleStyle:{ color:"white"},  headerBackTitle: 'Cancel', headerTintColor: 'white'}}
            />
            <Stack.Screen
              name="AddTask"
              styles={styles.heading}
              component={AddTaskPage}
              options={{title: 'New Task', headerStyle:{backgroundColor: '#53AFFF'}, headerTitleStyle:{ color:"white"}, headerBackTitle: 'Cancel', headerTintColor: 'white'}}
            />
            <Stack.Screen
              name="TaskQueue"
              styles={styles.heading}
              component={TaskQueuePage}
              options={{title: 'Task Queue', headerStyle:{backgroundColor: '#02C39A'}, headerTitleStyle:{ color:"white"}, headerTintColor: 'white', headerBackTitleVisible: false}}
            />
          </Stack.Navigator>
      </NavigationContainer>
      </TaskQueueContext.Provider>
    </GoalsContext.Provider> 
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    color: '#02C39A',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
});
 