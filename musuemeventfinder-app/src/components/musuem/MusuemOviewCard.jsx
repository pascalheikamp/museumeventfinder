import {StyleSheet, Image, Text, View, Button, Pressable} from "react-native";
import HeaderImage from '../../../assets/rijksmusuem.jpg'

const MusuemOviewCard = ({title, navigate, id, events}) => {

    return(
        <View style={styles.DetailCard}>
            <View style={styles.DetailCardHeader}>
                <Image style={styles.ImageHeader} source={HeaderImage}/>
            </View>
            <Text style={styles.HeaderTitle}>{title}</Text>
            <View style={styles.ButtonContainer}>
                <Pressable style={styles.NavigateButton} onPress={() => {alert("Hello")}}><Text style={styles.ButtonText}>Show on maps</Text></Pressable>
                <Pressable style={styles.NavigateButton} onPress={() => {navigate.navigate("events", {id: id})}}><Text style={styles.ButtonText}>Check events</Text></Pressable>
            </View>
        </View>
    )
}

export default MusuemOviewCard;

const styles = StyleSheet.create({
    DetailCard: {
        width:"auto",
        marginTop:30,
        marginRight: 10,
        marginLeft:10,
        backgroundColor:"#E5F0F1",
        height: 200
    },
    ButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
        flexDirection:"row"
    },
    NavigateButton: {
        paddingTop:"2%",
        paddingBottom:"2%",
        backgroundColor:"#002D62",
        height:"50%",
        width: '40%',
        marginTop:"15%",
        marginLeft:"4%",
        marginRight:"4%"
    },
    ButtonText: {
      color:"white",
      fontSize:"18%",
      textAlign:"center"
    },
    DetailCardHeader: {
        width:"auto",
        backgroundColor:"black",
        height:60
    },
    HeaderTitle: {
      fontSize: 23,
        backgroundColor:"black",
        textAlign:"center",
        opacity:0.8,
        color:"white"
    },
    ImageHeader: {
        width:"auto",
        height:100,
    }
})