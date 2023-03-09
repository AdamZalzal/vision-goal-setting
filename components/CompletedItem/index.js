import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default CompletedItem = (props) => {
    
    return (
            <View style={styles.goalContainer}>
                <Text style={styles.goal}>{props.item.name}</Text>
                {
                    props.isTask && <View style={styles.icon}>
                        <TouchableOpacity  >
                            <MaterialIcons  name="schedule" size={18} color='#fff' />
                        </TouchableOpacity>
                        <Text style={styles.time}>{props.item.time}min</Text>
                    </View>
                }
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    goalContainer: {
        backgroundColor: '#D3D3D3',
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