import { StyleSheet, Dimensions } from 'react-native';

export const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export const coltsBlue = '#002C5F';
export const coltsGray = '#A2AAAD';
export const raidSilver = '#A5ACAF';

export const globalStyles = StyleSheet.create({
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
        flex: 0.4,
        alignContent: 'center',
        fontSize: 20,
        height: windowHeight * 0.3,
        width: windowWidth * 0.97,
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
        fontSize: 40,
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
        backgroundColor: coltsBlue,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: windowWidth * 0.75,
        paddingLeft: 14,
        paddingTop: 32,
        paddingRight: 14,
        paddingBottom: 16,
        marginLeft: 4,
    },
    
    textInput: {
        width:100,
        height: 100,
    },
    todoErrorText: {
        width: windowWidth * 0.75,
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center', 
    },
    addTodoButton: {
        padding: 16,
        width: windowWidth * 0.2,
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
        width: windowWidth * 0.99,
        borderRadius: 3,
        elevation: 5,
        padding: 15,
        backgroundColor: coltsBlue,
        shadowOffset: { width :1, height: 1 },
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
    todoCompleted: {
        textDecorationLine: 'line-through',
        opacity: 0.4,
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
        width: windowWidth * 0.99,
    },
    journalBorder: {
        margin: 10,
        alignSelf: 'center',
        borderRadius: 18,
        borderWidth: 10,
        borderColor: coltsGray,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 350,
        shadowOffset: {
          width: 0,
          height: 0,
        },   
        width: windowWidth * 0.92,
    },
    journalCard: {   
        backgroundColor: coltsBlue,
        alignSelf: 'center',
        width: windowWidth * 0.85,
        marginBottom: 1,
        borderRadius: 7,
    },
    journalTitle: {
        fontFamily: 'nunito-black',
        fontSize: 20,
        color: coltsGray,
        marginBottom: 10,
    },
    journalText: {
        fontFamily: 'nunito-black',
        color: coltsGray,
    },
    journalDate: {
        marginTop: 35,
        margin: 5,
        color: coltsGray,
    },
    addJournalContainer: {
        flex: 0.92, 
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
    visionPage: {
        backgroundColor: coltsGray,
        flex: 1,
    },
    visionButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
    },
    visionDeleteButton: {
        borderRadius: 13,
        justifyContent: 'center',
        backgroundColor: coltsGray,
        margin: 4,
        height: 50,
        width: 400,
    },
    uploadButton: {
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: coltsBlue,
        width: 225,
        height: 70,
        margin: 5,
    },
    slideContainer: {
        width: windowWidth ,
        height: windowHeight * 0.88,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },

    slideCarousel: {
        width: windowWidth ,
        flex: 1,
    },

    slideImage: { 
        width: windowWidth * 0.98, 
        height: windowHeight * 0.6,  
    },
    slideTitle: { 
        alignSelf: 'center',
        justifyContent: 'center', 
        fontSize: 32, 
        color:coltsBlue, 
        marginBottom: 20,
        marginTop: 20 
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
    paginationDotActive: {
         backgroundColor: coltsBlue
    },
    paginationDotInactive: {
         backgroundColor: "gray" 
    },
    modalToggle: {
        marginTop:25,
        marginBottom: 30,   
        borderWidth: 1,
        borderColor: coltsGray,
        color: coltsGray,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    closeModalContainer: {
        flex: 1,
        marginTop: 95,
        marginBottom: 30,
        justifyContent: 'flex-end',
        borderColor: coltsBlue,
        color: coltsBlue,
    },
    modalClose: {    
        position: 'absolute',
        borderColor: coltsBlue,
        color: coltsBlue,
    },
    modalContent: {
        flex: 1,
        backgroundColor: coltsGray,
        height: windowHeight, 
    }
});