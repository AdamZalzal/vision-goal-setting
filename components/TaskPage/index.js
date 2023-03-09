import React, {useContext, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { GoalsContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';


const TaskPage = ({route, navigation}) => {
    const { goals, setGoals } = useContext(GoalsContext)
    const [ task, setTask ] = useState(
      goals[route.params.goalIndex].milestones[route.params.milestoneIndex].tasks[route.params.index]
      )
    const deleteTask = () =>{
      action = {
        type: 'DeleteTask',
        index: route.params.goalIndex,
        milestoneIndex: route.params.milestoneIndex,
        taskIndex: route.params.index,
        task: task
      }
      setGoals(action)
      AsyncStorage.setItem('VISION_APP::GOALS', JSON.stringify(goals));
      navigation.navigate('Milestones',{
        goalIndex: route.params.goalIndex,
        index: route.params.milestoneIndex
      })
    }

    const markTaskCompleted = () => {
      var goalIndex = route.params.goalIndex
      var milestoneIndex = route.params.milestoneIndex
      var goalAction = {
          type: 'MarkTaskCompleted',
          goalIndex: goalIndex,
          milestoneIndex: milestoneIndex,
          taskIndex: route.params.index,
          task: task
      }

      setGoals(goalAction)
      navigation.navigate('Milestones', {
        goalIndex: route.params.goalIndex,
        index: route.params.milestoneIndex
      })
    }

    React.useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Text size={18} style={styles.delete} onPress={deleteTask}>Delete</Text>
        )
      })
      navigation.setOptions({
        headerLeft: () => (
          <MaterialIcons style={styles.delete} name="arrow-back-ios" size={24} color='#fff' onPress={()=>{
            navigation.navigate('Milestones', {
              goalIndex: route.params.goalIndex,
              index: route.params.milestoneIndex
            })
          }} />
          )
      })
    })

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{task.name}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <TouchableOpacity 
          style={styles.addTask}
          onPress={()=> markTaskCompleted()}
        >
          <Text style={styles.goalButton}>Mark task as completed!</Text>
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    heading: {
      color: '#53AFFF',
      fontSize: 20,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 5,
      marginLeft: 16,
    },
    description: {
      paddingLeft: 18,
      color: '#808080'
    },
    delete:{
      color:'white'
    },
    addTask: {
      borderColor: '#fff',
      backgroundColor: '#53AFFF',
      borderWidth: 1,
      marginHorizontal: 20,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      position: 'absolute',
      bottom: 40 ,
  },
  goalButton: {
      color: '#fff',
      height: 50,
      flex: 1,
      textAlign: 'center',
      paddingTop:16
  },
  });
  

export default TaskPage