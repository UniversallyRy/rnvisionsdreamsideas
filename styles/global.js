
import { StyleSheet, Dimensions } from 'react-native'
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// Colts colors
// SPEED BLUE - HEX COLOR: #002C5F
// GRAY - HEX COLOR: #A2AAAD;

// RAIDERS SILVER - HEX COLOR: #A5ACAF;

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#A2AAAD",
    },
    visionPage:{
        backgroundColor: '#A2AAAD',
        opacity: 1,
        flex: 1,
    },
    uploadButton:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        marginBottom: 10,
    },
    titleText: {
        fontFamily: 'nunito-black',
        fontSize: 18,
        color: '#A5ACAF',
        padding: 10,
    },
    navbar: {
        color: '#002C5F',
        fontSize: 20,
    },
    paragraph: {
        padding: 7,
        marginTop: 50,
        marginVertical: 18,
        lineHeight: 20,
        color: '#A2AAAD',
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
        backgroundColor: '#002C5F',
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
        marginBottom:1,
        backgroundColor: "#002C5F",
        opacity: 1,
    },
    slideImage: { width: windowWidth * .97, height: windowHeight * 0.5, marginTop: 6 },
    slideTitle: { fontSize: 24, color:'#002C5F', marginBottom: 10 },
    slideSubtitle: { fontSize: 18, marginBottom: 1 },
    
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
    paginationDotActive: { backgroundColor: "#002C5F" },
    paginationDotInactive: { backgroundColor: "gray" },
    
    slideCarousel: {
        marginBottom: 25,
        backgroundColor: "#A2AAAD",
    },
    modalToggle: {
        marginTop:10,
        marginBottom: 10,   
        borderWidth: 1,
        borderColor: '#002C5F',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 25,
        marginBottom: 20,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#A2AAAD'
    }
})