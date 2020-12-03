import { StyleSheet, Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const coltsBlue = '#002C5F';
const coltsGray = '#A2AAAD';
const raidSilver = '#A5ACAF';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: coltsGray,
    },
    visionPage: {
        backgroundColor: coltsGray,
        opacity: 1,
        flex: 1,
    },
    uploadButton: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        margin: 20,
    },
    backButton: {
        fontSize: 40,    
        backgroundColor: coltsGray,
        color:'blue' ,
        shadowColor: coltsBlue,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,

        elevation: 1,
    },
    todoDetails:{
        fontSize: 20,
        alignSelf: 'center',
        paddingBottom: 30,
        fontWeight: 'bold',
    },
    todoButtons: {
        alignContent: 'center',
        flexDirection: 'row',
        margin: 10,
        fontSize: 30,
    },
    titleText: {
        fontFamily: 'nunito-black',
        fontSize: 18,
        color: raidSilver,
        padding: 10,
    },
    navbar: {
        color: coltsBlue,
        fontSize: 20,
    },
    paragraph: {
        padding: 7,
        marginTop: 50,
        marginVertical: 18,
        lineHeight: 20,
        color: coltsGray,
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
        alignItems: 'center',
        borderRadius: 1,
        elevation: 3,
        padding: 25,
        color: coltsGray,
        backgroundColor: coltsBlue,
        shadowOffset: { width :1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 0,
        marginVertical: 6,
    },
    todoList: {
        color: coltsGray,
    },
    slide: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        backgroundColor: coltsBlue,
        opacity: 1,
    },
    slideImage: { borderRadius: 10 , width: windowWidth * 0.9, height: windowHeight * 0.5, marginTop: 6 },
    slideTitle: { fontSize: 32, color:coltsBlue, marginBottom: 10,marginTop: 20 },
    
    slideCarousel: {
        borderRadius: 10,
        alignSelf: 'center',
        height: windowHeight * 0.9,
        width: windowWidth *0.9,
        marginBottom: 20,
        backgroundColor: coltsGray,
    },
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
    paginationDotActive: { backgroundColor: coltsBlue },
    paginationDotInactive: { backgroundColor: "gray" },
    
    modalToggle: {
        marginTop:10,
        marginBottom: 10,   
        borderWidth: 1,
        borderColor: coltsBlue,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 25,
        marginBottom: 20,
    },
    todoFormContainer: {
        backgroundColor: coltsGray
    }
})