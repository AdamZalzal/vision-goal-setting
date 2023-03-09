import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default TaskItem = (props) => {

    return (
            <View style={styles.goalContainer}>
                <Text style={styles.goal}>{props.task.name}</Text>
                <View style={styles.icon}>
                    <TouchableOpacity  >
                        {
                            !props.editMode && <MaterialIcons style={styles.delete} name="schedule" size={18} color='#fff' />
                        }
                        {
                            props.editMode && <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' onPress={() =>  props.deleteTask(props.task, props.taskIndex)}/>
                        }
                    </TouchableOpacity>
                        {
                            !props.editMode && <Text style={styles.time}>{props.task.time}min</Text>
                        }
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    goalContainer: {
        backgroundColor: '#5E7CE2',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
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
       justifyContent: 'flex-end' 
    }
});