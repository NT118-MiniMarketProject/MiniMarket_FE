import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Colors } from '../styles'

const Separator = (props: any) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['transparent', Colors.placeholder, 'transparent']}
                start={{x: 0, y: 0}} end={{x:1, y:0}}
                style={styles.separator}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.label}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        position: 'relative',
        height: 60,
        justifyContent: 'center'
    },
    separator: {
        height: 1,
        alignSelf: 'stretch'
    },
    textContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        backgroundColor: Colors.white,
        paddingHorizontal: 8,
        color: Colors.placeholder
    }
});

export default Separator;