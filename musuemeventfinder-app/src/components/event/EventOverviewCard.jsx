import {Button, Image, Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import Calendar from '../../../assets/calendar.png';
import Time from '../../../assets/time.png';
import Bookmark from '../../../assets/bookmark.png';
import Heart from '../../../assets/heart.png';
import BookmarkedFilled from '../../../assets/bookmark-filled.png'
import useFetch from "../../hooks/useFetch";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookmarkedDarkMode from '../../../assets/bookmark-darkmode.png'
import {useTheme} from "@react-navigation/native";

function EventOverviewCard({title, img, description, date, begin, end}) {

    // this object will be saved as bookmark
    const event = {
        title: title,
        description: description,
        date: date,
        begin: begin,
        end: end
    }
    const {colors, dark} = useTheme();

    //this function will add an event to the async storage so its possible to save bookmarks
    async function addToBookmarkAsync() {
        try {
            let storage = await AsyncStorage.getItem("events")
            let parsedList = JSON.parse(storage)
            if (storage == null) {
                parsedList = []
            }
            parsedList.push(event);
            let stringifiedList = JSON.stringify(parsedList);
            await AsyncStorage.setItem("events", stringifiedList);
            alert("Succesvol toegevoegd aan bookmarks")
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <View style={{
            backgroundColor: colors.background, paddingBottom: "5%"
        }}>
            <Text style={{
                color: colors.text, fontSize: "20%",
                marginTop: "7%",
                textAlign: "center"
            }}>{title}</Text>
            <Image style={styles.EventImage} source={{uri: img}}/>
            <View style={styles.InfoContainer}>
                <View style={styles.Wrapper}>
                    <Image source={Calendar}/>
                    <Text style={{color:colors.text}}>{date}</Text>
                </View>
                <View style={styles.Wrapper}>
                    <Image source={Time}/>
                    <Text style={{color:colors.text}}>{begin} - {end}</Text>
                </View>
            </View>
            <View style={styles.InfoContainer}>
            </View>
            <Text style={{color:colors.text}}>{description}</Text>
            <View style={styles.BottomSection}>
                <Pressable onPress={addToBookmarkAsync}><Image
                    source={dark ? BookmarkedDarkMode : Bookmark}/></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    EventCard: {
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        justifyContent: "center",
    },
    BottomSection: {
        display: "flex",

        justifyContent: "flex-end"
    },
    Wrapper: {
        display: "flex",
        flexDirection: "row",
    },
    InfoContainer: {
        marginTop: "5%",
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row"
    },
    InfoItem: {
        paddingLeft: "5%"
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    EventImage: {
        width: "auto",
        marginTop: "5%",
        height: "50%"
    },
    EventTitle: {
        fontSize: "20%",
        marginTop: "7%",
        textAlign: "center"
    },
    EventDescription: {
        marginTop: "5%"
    }
})


export default EventOverviewCard;