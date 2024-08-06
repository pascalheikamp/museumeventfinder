import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import BookmarkList from "../components/profile/BookmarkList";

export default function ProfileScreen() {
    const data = [
        { id: '1', image: 'https://img.icons8.com/color/70/000000/cottage.png', title: 'Bookmarks' },
        { id: '2', image: 'https://img.icons8.com/color/70/000000/administrator-male.png', title: 'Like' },
        { id: '3', image: 'https://img.icons8.com/color/70/000000/filled-like.png', title: 'Comment' },
        { id: '4', image: 'https://img.icons8.com/color/70/000000/facebook-like.png', title: 'Download' },
        { id: '5', image: 'https://img.icons8.com/color/70/000000/shutdown.png', title: 'Edit' },
    ];

    const [options, setOptions] = useState(data);
    const [showSettings, setShowSettings] = useState(false); // State to manage settings modal visibility

    const openMenuItems = () => {
        // Function to handle opening settings menu
        setShowSettings(true);
    };

    const closeMenuItems = () => {
        // Function to handle closing settings menu
        setShowSettings(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} />
                    <Text style={styles.name}>Jane Doe</Text>
                </View>
            </View>

            <View style={styles.body}>
                <FlatList
                    style={styles.container}
                    enableEmptySections={true}
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={openMenuItems}>
                            <View style={styles.box}>
                                <Image style={styles.icon} source={{ uri: item.image }} />
                                <Text style={styles.title}>{item.title}</Text>
                                <Image style={styles.btn} source={{ uri: 'https://img.icons8.com/customer/office/40' }} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Settings Modal */}
            <Modal visible={showSettings} animationType="slide">
                <View style={styles.settingsContainer}>
                    <TouchableOpacity onPress={closeMenuItems}>
                        <Text style={styles.closeButton}>Close Settings</Text>
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
        backgroundColor: '#E6E6FA',
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
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsContainer: {
        flex: 1,
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: "70%",
        color: 'blue',
        fontSize: 18,
    },
});