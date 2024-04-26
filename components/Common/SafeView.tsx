import { StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native'
import React from 'react'


interface SafeViewProps {
    children:  React.ReactNode,
    classname?: string
}
const SafeView: React.FC<SafeViewProps> = (props) => {
    return (
      <SafeAreaView style={styles.container} className={`${props.classname}`}>
        {props.children}
      </SafeAreaView>
    );
};

export default SafeView

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
});