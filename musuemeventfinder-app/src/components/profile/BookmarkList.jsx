import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableHighlight,
    ImageBackground,
    Button,
    Pressable,
    TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState, useMemo, useCallback} from "react";
import {useFocusEffect, useTheme} from "@react-navigation/native";
import DeleteIcon from '../../../assets/delete-icon.png';
import DeleteIconDarkMode from '../../../assets/deleteicon-darkmode.png';

function BookmarkList({navigation}) {
    const [events, setEvents] = useState([]);
    const [totalEvents, setTotalEvents] = useState({});
    const [duplicateEvents, setDuplicateEvents] = useState([]);

    useFocusEffect(
        useCallback(() => {
            //loading the events from async storage and make this an object so I can use it for other functionalities like removing an event
            const loadEvents = async () => {
                const stringifiedEvents = await AsyncStorage.getItem("events");
                const parsedEvents = JSON.parse(stringifiedEvents);
                if (!parsedEvents || !Array.isArray(parsedEvents)) return;

                setEvents(parsedEvents);
                countEventNames(parsedEvents);
            };

            loadEvents();

            return () => {
                console.log('Screen is unfocused');
            };
        }, [])
    );
    //this function will remove all events in async storage
    const removeList = async () => {
        try {
            await AsyncStorage.removeItem("events");
            setEvents([]);
            setDuplicateEvents([]);
            setTotalEvents({});
        } catch (exception) {
            console.log(exception);
        }
    }
    //this function will remove an event from the async storage
    const removeItem = async (item) => {
        try {
            let updatedProducts = [...events];
            const index = updatedProducts.indexOf(item);

            if (index !== -1) {
                updatedProducts.splice(index, 1);
                await AsyncStorage.setItem("events", JSON.stringify(updatedProducts));
                setEvents(updatedProducts);
                countEventNames(updatedProducts);
            }
        } catch (exception) {
            console.log(exception);
        }
    }
    //this function will check if event is duplicate and show only event with that specific name using the filter method
    const countEventNames = (products) => {
        const counts = products.reduce((acc, product) => {
            acc[product.title] = (acc[product.title] || 0) + 1;
            return acc;
        }, {});

        setTotalEvents(counts);

        const duplicates = products.filter((product, index, self) =>
            counts[product.title] > 0 && self.findIndex(p => p.title === product.title) === index
        );

        setDuplicateEvents(duplicates);

        const total = products.reduce((sum, product) => {
            return sum + product.price;
        }, 0);

        setTotalPrice(total);
    }
    const {dark, colors} = useTheme();

    const renderItem = useMemo(
        () => ({item}) => (
            <TouchableHighlight>
                <View style={dark ? {
                    backgroundColor: '#1A1D2EFF', flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    marginVertical: 5
                } : {
                    backgroundColor: colors.background, flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    marginVertical: 5
                }}>
                    <Text style={{color:colors.text}}>{item.title}</Text>
                    <TouchableOpacity onPress={() => removeItem(item)}>
                        <Image source={dark? DeleteIconDarkMode : DeleteIcon}/>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>
        ),
        [totalEvents]
    );

    return (
        <View>
            <Pressable style={styles.deleteShoppingList} onPress={removeList}>
                <Text style={styles.deleteShoppingListText}>Verwijder lijst</Text>
            </Pressable>
        <View style={dark ? {
            backgroundColor: '#393e46'
        } : {backgroundColor: colors.background}}>
            <FlatList style={styles.ShoppingListBackGround}
                      className={"mt-3"}
                      data={duplicateEvents}
                      horizontal={false}
                      renderItem={renderItem}
            />
        </View>
        </View>
    );
}

export default BookmarkList;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginTop: "10%",
        padding: 10,
    },
    ShoppingListHeader: {
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    ShoppingListTitle: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
    },
    List: {
        backgroundColor: "white",
        height: "auto"
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    IconContainer: {
        marginLeft: "10%",
        marginRight: "2%"
    },
    ShoppingListDescription: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    ShoppingListDescriptionText: {
        fontWeight: "bold",
        fontSize: 18
    },
    ShoppingList: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white",
        marginVertical: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    ProductColumn: {
        flex: 2,
        justifyContent: "center",
    },
    CountColumn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ButtonColumn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    PriceColumn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    AddButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 2,
    },
    RemoveButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 2,
    },
    ButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    deleteShoppingList: {
        backgroundColor: '#EF0107',
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    deleteShoppingListText: {
        color: "white",
        fontWeight: "bold",
    },
    TotalPriceContainer: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    TotalPriceText: {
        fontWeight: "bold",
        fontSize: 18,
    }
});
