import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { GoalsContext, TaskQueueContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default CurrentTaskItem = (props) => {
    const {taskQueue, setTaskQueue} = useContext(TaskQueueContext)
    const { goals, setGoals } = useContext(GoalsContext)

    const markTaskCompleted = () => {
        var action = {
          type: 'pop',
        }
        var goalIndex = taskQueue.tasks[0].goalIndex
        var milestoneIndex = taskQueue.tasks[0].milestoneIndex
        var taskIndex = goals[goalIndex].milestones[milestoneIndex].tasks.indexOf(taskQueue.tasks[0])
        var goalAction = {
            type: 'MarkTaskCompleted',
            goalIndex: goalIndex,
            milestoneIndex: milestoneIndex,
            taskIndex: taskIndex,
            task: taskQueue.tasks[0]
        }

        setTaskQueue(action)
        setGoals(goalAction)

        AsyncStorage.setItem('VISION_APP::TASKQUEUE', JSON.stringify(taskQueue));
      }
      
    return (
            <View>
                { taskQueue.tasks.length > 0 && <View style={styles.container}>
                <View style={styles.taskRowContainer} >
                    <View style= {{flex:1}}>
                        <Text style={styles.goal}>{taskQueue.tasks[0].name}</Text>
                    </View>
                    <View style={styles.icon}>
                        <TouchableOpacity  >
                            <MaterialIcons  name="schedule" size={18} color='#fff' />
                        </TouchableOpacity>
                        <Text style={styles.time}>{taskQueue.tasks[0].time}min</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.description}>{taskQueue.tasks[0].description}</Text></View>
                    <View style={styles.completeContainer}>
                        <TouchableOpacity style={styles.markComplete} onPress={markTaskCompleted} >
                            <Text style={styles.completeText}>Mark Complete</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                <View
                    style={{
                        borderBottomColor: '#808080',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        paddingTop: 10,
                        marginHorizontal: 28
                    }}
                />
            </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignContent:'flex-start',
        paddingLeft:10,
        height:100,
        backgroundColor:'#02C39A',
        borderRadius:12,
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
    },
    taskRowContainer:{
        paddingTop: 5,
        borderRadius: 12,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    completeContainer:{
        marginTop:'auto',
        borderRadius: 12,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 5,
        marginRight:5
    },
    markComplete:{
        borderRadius: 12,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 5        
    },
    completeText:{
        color:'#02C39A'
    },
    description:{
        color: '#D3D3D3'
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    goal: {
        color: '#fff',
        width: '70%',
        fontSize: 16,
    },
    time: {
        textAlign:'right',
        color: '#fff',
        fontSize: 16,
        paddingLeft:2
    },
    icon: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'flex-end',
       marginRight: 10
    }
});