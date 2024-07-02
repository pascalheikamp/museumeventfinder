import {Image, StyleSheet, Text, View} from "react-native";
import Calendar from '../../../assets/calendar.png';
import Time from '../../../assets/time.png';

function EventOverviewCard({title, img, description, date, begin, end}) {

    console.log(date)

    return (
        <View style={[styles.EventCard, styles.shadowProp]}>
            <Text style={styles.EventTitle}>{title}</Text>
            <Image style={styles.EventImage} source={{uri:img}}/>
            <View style={styles.InfoContainer}>
                <View style={styles.Wrapper}>
                    <Image  source={Calendar}/>
                    <Text>{begin}</Text>
                </View>
                <View style={styles.Wrapper}>
                    <Image source={Time} />
                    <Text>Hello</Text>
                </View>
            </View>
            <View style={styles.InfoContainer}>
            </View>
            <Text style={styles.EventDescription}>{description}</Text>
        </View>
    )
}

const styles =  StyleSheet.create({
    EventCard: {
        paddingBottom:"5%",
        marginTop:"10%",
        paddingLeft:"5%",
        paddingRight:"5%",
        justifyContent:"center",
        display:"flex",
        backgroundColor:"white",
        height:"auto%"
    },
    Wrapper: {
        display:"flex",
        flexDirection:"column"
    },
    InfoContainer: {
        justifyContent:"space-around",
        display:"flex",
        flexDirection:"row"
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    EventImage:{
      width:"auto",
        marginTop:"5%",
      height:"65%"
    },
    EventTitle: {
        fontSize:"20%",
        textAlign:"center"
    },
    EventDescription: {
        marginTop:"5%"
    }
})


export default EventOverviewCard;