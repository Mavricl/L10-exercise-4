import { StatusBar } from 'expo-status-bar';
import {
    SectionList, ToastAndroid,
    Image, FlatList, StyleSheet,
    Text, TouchableOpacity, View,
} from 'react-native';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, {useState} from 'react';
import {TextInput} from "react-native";
import { Picker } from '@react-native-picker/picker';



const App = () =>{

    const [newName, setNewName] = useState("");
    const [newCode, setNewCode] = useState("");
    const [newType, setNewType] = useState("Mage");

    const [datasource, setDatasource] = useState([
        {
            data:[
                {key:'Akali', code: "abbd173df157f943496abb0638add119f753e3b2"},
                {key:'Azir', code: '1636aeb5f8d604f7d3336428918146cac62c28e7'},
                {key:'Ryze', code:'e6b174c92f96fb06842f4aac2e417d0e27707c27'}
            ],
            title:"Mage",
            icon:"wand-magic",
            bgcolor:"lightblue",
        },

        {
            data:[
                {key:'Irelia', code: "baa25073a0560dbfffa5fafa9eeebe3bd27c4206"},
                {key:'Camille', code: '78114603ab0495a965c63da0b1d8d9b1cdced67c'}
            ],
            title:"Top",
            icon:"shield",
            bgcolor:"#a70eec",
        },

        {
            data:[
                {key:'Lee Sin', code: "ce638264ec40c028d3355852192d8feeb969880e"},
                {key:'Wu Kong', code: '769013a96f93d25ba79f5c9c9c2ee2caf7160a04'}
            ],
            title:"Jungle",
            icon:"leaf",
            bgcolor:"green",
        },
    ]);

    const addChampion = () => {
        if (!newName || !newCode){
            ToastAndroid.show("Please fill in both fields! ", ToastAndroid.SHORT);
            return;
        }
        const newChampion = {
            key: newName , code: newCode,
        };

        const updated = datasource.map(section => {
            if(section.title === newType){
                return{
                    ...section,
                    data: [...section.data,newChampion]
                };
            }
            return section;
        });
        setDatasource(updated);

        setNewName("");
        setNewCode("");
    };


    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/9eb028de391e65072d06e77f06d0955f66b9fa2c-736x316.png?auto=format&fit=fill&q=80&w=552" }}
                style={styles.logo}
            />
            <TextInput
                placeholder="Enter Champion Name"
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
            />

            <TextInput
                placeholder="Enter Champion Code"
                style={styles.input}
                value={newCode}
                onChangeText={setNewCode}
            />

            <View style = {styles.pickerWrapper}>
                <Picker
                    selectedValue={newType}
                    onValueChange={(value) => setNewType(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Mage" value="Mage" />
                    <Picker.Item label="Top" value="Top" />
                    <Picker.Item label="Jungle" value="Jungle" />
                </Picker>
            </View>

            <TouchableOpacity
                style = {styles.buttonStyle}
                onPress={addChampion}
            >
                <Text style={styles.buttonText}>
                    ADD CHAMPION
                </Text>
            </TouchableOpacity>

            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader = {sectionHeader}
            />
            <StatusBar style="auto" />
        </View>
    );
};


const styles = StyleSheet.create({

    logo: {
        width: 200,
        height: 80,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20,
    },


    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 50,
        textAlign: 'center',
        flex: 1,
        color:"#cf9816"
    },

    headerText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        color: '#05071e'
    },

    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 10,
    },

    opacityStyle: {
        borderWidth: 1,
        borderColor: "#cf9816",
        backgroundColor: '#05071e',
    },

    buttonStyle: {
        backgroundColor: '#1d86e2',
        padding: 2,
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: 'darkblue',
    },

    buttonText: {
        fontSize:20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },

    container : {
        flex: 1,
        backgroundColor: "black",
        gap: 12,
    },

    image: {
        width: 120,
        height: 180,
        resizeMode: 'contain',
        marginLeft:10,
        borderWidth:2,
        borderColor:"#cf9816"
    },

    pickerWrapper: {
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 20,
        marginTop: 10,
    },

    picker: {
        height: 50,
        width: "100%",
    },

});

const handler = () => {
    ToastAndroid.show('Akali is selected!', ToastAndroid.SHORT);
}


const renderItem = ({item}) => {
    let cardimg = "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/" + item.code + "-496x560.jpg?auto=format&fit=fill&q=80&w=486"
    return(
        <TouchableOpacity style={styles.opacityStyle} onPress={handler}>
            <View style={{ margin: 10, flexDirection: 'row' }}>
                <Text style={styles.textStyle}>{item.key}</Text>
                <Image source={{ uri: cardimg }} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
};

const sectionHeader = ({section: {title, bgcolor, icon}}) => {
    return(
        <Text style={[styles.headerText, {backgroundColor: bgcolor}]}>
            <FontAwesome6 name = {icon} size={20} color="#05071e" /> {title}
        </Text>
    );
};


export default App;
