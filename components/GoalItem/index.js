import React from 'react';
import { StyleSheet, Text, View} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default GoalItem = (props) => {

    return (
            <View style={styles.goalContainer}>
                <Text style={styles.goal}>{props.goal.name}</Text>
                <View>
                    <MaterialIcons style={styles.delete} name="arrow-forward-ios" size={18} color='#fff' />
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
        backgroundColor: '#02C39A',
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
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
    },
});