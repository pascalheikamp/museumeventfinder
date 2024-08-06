import {
    FlatList,
    Image, Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import MusuemOviewCard from "../musuem/MusuemOviewCard";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookmarkList () {

    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const [totalProducts, setTotalProducts] = useState({});
    const [duplicateEvents, setDuplicateEvents] = useState([]);
    const data = [
        { id: '1', image: 'https://img.icons8.com/color/70/000000/cottage.png', title: 'Bookmarks' },
        { id: '2', image: 'https://img.icons8.com/color/70/000000/administrator-male.png', title: 'Like' },
        { id: '3', image: 'https://img.icons8.com/color/70/000000/filled-like.png', title: 'Comment' },
        { id: '4', image: 'https://img.icons8.com/color/70/000000/facebook-like.png', title: 'Download' },
        { id: '5', image: 'https://img.icons8.com/color/70/000000/shutdown.png', title: 'Edit' },
    ];

    const [options, setOptions] = useState(data);

    useEffect(() => {
        const loadProducts = async () => {
            const stringifiedProducts = await AsyncStorage.getItem("events");
            const parsedProducts = JSON.parse(stringifiedProducts);
            if (!parsedProducts || !Array.isArray(parsedProducts)) return;

            countProductNames(parsedProducts);
            setBookmarkedEvents(parsedProducts);
        };

        loadProducts();
    }, []);

    const countProductNames = (products) => {
        const counts = products.reduce((acc, product) => {
            acc[product.title] = (acc[product.title] || 0) + 1;
            return acc;
        }, {});

        setTotalProducts(counts);

        const duplicates = products.filter((product, index, self) =>
            counts[product.title] > 0 && self.findIndex(p => p.title === product.title) === index
        );

        setDuplicateEvents(duplicates);

    }

    const removeList = async () => {
        try {
            await AsyncStorage.removeItem("products");
            setBookmarkedEvents([]);
            setDuplicateEvents([]);
            setTotalProducts({});
        } catch (exception) {
            console.log(exception);
        }
    }


    console.log(bookmarkedEvents)

    return (
        <>
            <SafeAreaView>
                <View style={styles.Container}>
                    <Text>Bookmarks</Text>
                    <FlatList
                        style={styles.container}
                        enableEmptySections={true}
                        data={duplicateEvents}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={styles.box}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <Pressable style={styles.deleteShoppingList} onPress={removeList}>
                    <Text style={styles.deleteShoppingListText}>Verwijder lijst</Text>
                </Pressable>
            </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex:1,
        marginTop:"10%",
        display: "flex",
        justifyContent: "center",
    },
    List: {
        backgroundColor: "white",
        height: "auto"
    },
    box: {
        padding: 10,
        marginBottom: 2,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
