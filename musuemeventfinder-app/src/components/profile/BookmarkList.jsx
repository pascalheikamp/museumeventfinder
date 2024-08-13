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
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState({});
    const [duplicateProducts, setDuplicateProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useFocusEffect(
        useCallback(() => {
            const loadProducts = async () => {
                const stringifiedProducts = await AsyncStorage.getItem("events");
                const parsedProducts = JSON.parse(stringifiedProducts);
                if (!parsedProducts || !Array.isArray(parsedProducts)) return;

                setProducts(parsedProducts);
                countProductNames(parsedProducts);
            };

            loadProducts();

            return () => {
                console.log('Screen is unfocused');
            };
        }, [])
    );

    const removeList = async () => {
        try {
            await AsyncStorage.removeItem("events");
            setProducts([]);
            setDuplicateProducts([]);
            setTotalProducts({});
            setTotalPrice(0);
        } catch (exception) {
            console.log(exception);
        }
    }

    const removeItem = async (item) => {
        try {
            let updatedProducts = [...products];
            const index = updatedProducts.indexOf(item);

            if (index !== -1) {
                updatedProducts.splice(index, 1);
                await AsyncStorage.setItem("events", JSON.stringify(updatedProducts));
                setProducts(updatedProducts);
                countProductNames(updatedProducts);
            }
        } catch (exception) {
            console.log(exception);
        }
    }

    const addItem = async (item) => {
        try {
            const updatedProducts = [...products, {...item}];
            await AsyncStorage.setItem("events", JSON.stringify(updatedProducts));
            setProducts(updatedProducts);
            countProductNames(updatedProducts);
        } catch (exception) {
            console.log(exception);
        }
    }

    const countProductNames = (products) => {
        const counts = products.reduce((acc, product) => {
            acc[product.title] = (acc[product.title] || 0) + 1;
            return acc;
        }, {});

        setTotalProducts(counts);

        const duplicates = products.filter((product, index, self) =>
            counts[product.title] > 0 && self.findIndex(p => p.title === product.title) === index
        );

        setDuplicateProducts(duplicates);

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
        [totalProducts]
    );

    return (
        <View style={dark ? {
            backgroundColor: '#393e46'
        } : {backgroundColor: colors.background}}>
            <FlatList style={styles.ShoppingListBackGround}
                      className={"mt-3"}
                      data={duplicateProducts}
                      horizontal={false}
                      renderItem={renderItem}
            />
            <Pressable style={styles.deleteShoppingList} onPress={removeList}>
                <Text style={styles.deleteShoppingListText}>Verwijder lijst</Text>
            </Pressable>
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
