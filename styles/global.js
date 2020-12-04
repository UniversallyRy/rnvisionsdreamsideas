import { StyleSheet, Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const coltsBlue = '#002C5F';
const coltsGray = '#A2AAAD';
const raidSilver = '#A5ACAF';

export const globalStyles = StyleSheet.create({
    visionPage: {
        backgroundColor: coltsGray,
        flex: 1,
    },
    uploadButton: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        margin: 20,
    },
    tDetailsButton : {
        backgroundColor: coltsGray,
        margin: 20,
    },
    tDetailsContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: windowHeight,
        backgroundColor: coltsGray,
    },
    todoDetails:{
        flex: .4,
        alignContent: 'center',
        fontSize: 20,
        height: windowHeight * .3,
        width: windowWidth * .97,
        alignSelf: 'center',
        fontWeight: 'bold',
        backgroundColor: coltsBlue,
    },
    todoButtons: {
        alignContent: 'center',
        flexDirection: 'row',
        margin: 10,
        fontSize: 30,
    },
    navbar: {
        color: coltsBlue,
        fontSize: 20,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    // CSS for Todos
    todoScreenContainer: {
        flex: 1,
        backgroundColor: coltsGray,
    },
    todoListContainer: {
        flex: 7,
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: coltsGray
    },
    addTodoForm: {
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    todoInput: {
        height: 35,
        width: windowWidth * .75,
        padding: 4,
        marginLeft: 4,

    },
    todoErrorText:{
        width: windowWidth * .75,
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center', 
    },
    addTodoButton: {
        width: windowWidth * .2,
        borderRadius: 2,
        borderColor: 'black',
        backgroundColor: '#A2AAAD',
        shadowColor: "black",
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowOpacity: 7.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    addTodoButtonText: {
        color: '#002C5F',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    },
    todoList: {
        color: coltsGray,
    },
    todoCard: {
        alignItems: 'center',
        width: windowWidth * .99,
        borderRadius: 3,
        elevation: 5,
        padding: 15,
        backgroundColor: coltsBlue,
        shadowOffset: { width :1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 0,
        marginVertical: 6,
    },
    todoText: {
        color: coltsGray,
        fontFamily: 'nunito-black',
        padding: 5,
    },
    todoContainer: {
        padding: 10,
        alignItems: 'center',
    },
    jDetailsText: {
        padding: 7,
        marginTop: 50,
        marginVertical: 18,
        lineHeight: 20,
        color: coltsGray,
    },
    jDetailsTitle: {
        fontFamily: 'nunito-black',
        fontSize: 18,
        color: raidSilver,
        padding: 10,
    },
    jDetailsButton: {
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
    jDetailsContainer: {
        flexDirection: 'row',
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        backgroundColor: coltsGray,
        
    },
    jDetailsCard: {
        alignSelf: 'center',
        backgroundColor: coltsBlue,
        width: windowWidth * .99,
    },
    journalCard: {
        alignSelf: 'center',
        backgroundColor: coltsBlue,
        width: windowWidth * .99,
    },
    journalTitle: {
        fontFamily: 'nunito-black',
        color: coltsGray,
        marginBottom: 10,
    },
    journalText:{
        fontFamily: 'nunito-black',
        color: coltsGray,
    },
    addJournalContainer: {
        flex: .92, 
        backgroundColor: '#A2AAAD', 
        padding: 10, 
    },
    addJournalForm: {

    },
    addJournalTitle: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: coltsBlue,
        padding: 20,
        fontSize: 18,
        borderRadius: 2,
    },
    slideContainer: {
        backgroundColor: 'transparent',
        height: windowHeight*0.7,
        width: windowWidth ,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },

    slideCarousel: {
        marginBottom: 25,
    },

    slideImage: { width: windowWidth * 0.98, height: windowHeight * 0.55, marginTop: 6 },
    slideTitle: { alignContent: 'center', fontSize: 32, color:coltsBlue, marginBottom: 10,marginTop: 20 },
    
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
        alignItems: 'center',
    },
    modalClose: {
        marginTop: 25,
        marginBottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
    },
})