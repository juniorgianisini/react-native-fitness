import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageEditor,
    TouchableOpacity,
    Image
} from "react-native";
import { ImagePicker } from "expo";

class UdacityImagePicker extends Component {
    state = {
        iamge: null
    }

    pickImage = () => {
        ImagePicker.launchImageLibraryAsync({
            allowEditing: true,
            aspect: [2,1]
        }).then((result) => {
            if(result.canceled){
                return
            }

            
            ImageEditor.cropImage(result.uri, {
                offset: {x: 0, y: 0},
                size: {width: result.width, height: result.height},
                displaySize: { width: 200, height: 100},
                resizeMode: 'contain'
                }, (uri) =>  this.setState(() => ({image: uri})),
                () => console.log('ERROR'))
        })
    }

    render() {
        const {image} = this.state
        return <View style={styles.container}>
                    <TouchableOpacity onPress={this.pickImage}>
                        <Text>Open Camera Roll</Text>
                    </TouchableOpacity>

                    {image && (
                            <Image style={styles.img} source={{uri: image}}/>
                        )}
               </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    img: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        backgroundColor: 'black',
    }
})

export default UdacityImagePicker;
