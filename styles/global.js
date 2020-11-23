
import { StyleSheet, Dimensions } from 'react-native'
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "darkgrey",
    },
    dreamPage:{
        backgroundColor: 'slategrey',
    },
    titleText: {
        fontFamily: 'nunito-black',
        fontSize: 18,
        // color: 'skyblue',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    card: {
        borderRadius: 8,
        elevation: 3,
        shadowOffset: { width :1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 12,
    },
    slide: {
        height: windowHeight*0.7,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    slideImage: { width: windowWidth * 0.9, height: windowHeight * 0.7 },
    slideTitle: { fontSize: 24, color:'blue', marginBottom: 10 },
    slideSubtitle: { fontSize: 18, marginBottom: 30 },
    
    pagination: {
        position: "absolute",
        bottom: 8,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
        marginTop: 10,
    },
    paginationDotActive: { backgroundColor: "lightblue" },
    paginationDotInactive: { backgroundColor: "gray" },
    
    carousel: {
        marginBottom: 25,
    },
})