import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Modal,
    StatusBar,
    Switch,
    useColorScheme
} from 'react-native';
import BookmarkList from "../components/profile/BookmarkList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DarkTheme, DefaultTheme, useTheme} from "@react-navigation/native";

export default function ProfileScreen({setColorTheme}) {
    const data = [
        {id: '1', image: 'https://img.icons8.com/color/70/000000/cottage.png', title: 'Bookmarks'},
    ];

    const [options, setOptions] = useState(data);
    const [showSettings, setShowSettings] = useState(false); // State to manage settings modal visibility
    const {dark} = useTheme();
    const {colors} = useTheme();

    const openMenuItems = () => {
        // Function to handle opening settings menu
        setShowSettings(true);
    };

    const closeMenuItems = () => {
        // Function to handle closing settings menu
        setShowSettings(false);
    };
    const toggleTheme = async () => {
        console.log(dark);
        if (dark) {
            console.log("turn to light")
            setColorTheme(DefaultTheme)
        } else {
            console.log("turn to dark")
            setColorTheme(DarkTheme)
        }
        try {
            await AsyncStorage.setItem('colorTheme', JSON.stringify(!dark));
        } catch (e) {
            console.error('Failed to save theme to AsyncStorage:', e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar3.png'}}/>
                    <Text style={styles.name}>Jane Doe</Text>
                    <View style={[styles.container, {backgroundColor: dark === true ? '#121212' : '#FFFFFF'}]}>
                        <StatusBar barStyle={dark === false ? 'light-content' : 'dark-content'}/>
                        <Text style={[styles.text, {color: dark === true ? '#FFFFFF' : '#000000'}]}>Dark Mode</Text>
                        <Switch value={dark} onValueChange={toggleTheme}/>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <FlatList
                    style={styles.container}
                    enableEmptySections={true}
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={openMenuItems}>
                            <View style={dark ? {backgroundColor: '#1A1D2EFF', padding: 10,
                                marginBottom: 2,
                                flexDirection: 'row',
                                alignItems: 'center',} : {backgroundColor: 'white',  padding: 10,
                                marginBottom: 2,
                                flexDirection: 'row',
                                alignItems: 'center',}}>
                                <Image style={styles.icon} source={{uri: item.image}}/>
                                <Text style={{
                                    color: colors.text, fontSize: 18,
                                    marginLeft: 4,
                                }}>{item.title}</Text>
                                <Image style={styles.btn} source={{uri: 'https://img.icons8.com/customer/office/40'}}/>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Settings Modal */}
            <Modal visible={showSettings} animationType="slide">
                <View style={{backgroundColor:colors.background,  flex: 1,
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',}}>
                    <TouchableOpacity onPress={closeMenuItems}>
                        <Text style={{color:colors.text, marginTop: "70%", fontSize: 18,}}>Close Settings</Text>
                    </TouchableOpacity>
                    <BookmarkList/>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#1A1D2EFF',
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    name: {
        color: 'white',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: '#FF6347',
        marginBottom: 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 18,
        color: '#EE82EE',
        marginLeft: 4,
    },
    btn: {
        marginLeft: 'auto',
        width: 40,
        height: 40,
    },
    body: {
        flex: 1,
        padding: 10,
    },
    box: {
        padding: 10,
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsContainer: {
        flex: 1,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
});