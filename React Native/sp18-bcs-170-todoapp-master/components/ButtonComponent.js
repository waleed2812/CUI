import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const CustomButton = (props) => {
    
    let disabled = props.disabled || false;

    let bgcolor = 'blue';

    if(disabled) bgcolor = 'red';


    return(
        
            <TouchableOpacity
            onPress = {props.onPress}
            style={{...styles.buttonContainer, backgroundColor: bgcolor}}
            activeOpacity={0.5}
            disabled={disabled}
            >
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },

    buttonText: {
        color: 'white',
        fontSize: 20,
    },
})

export default CustomButton;