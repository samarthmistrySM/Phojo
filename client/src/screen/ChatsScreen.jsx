import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const botImage = require("../assets/images/phoji.png")
const backImage = require("../assets/images/lessthan.png")
const ChatsScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.goBackButton}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image style={styles.backButton} source={backImage} />
                    <Text style={{ fontSize: 18 }}> back</Text>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Search Not Working :)'
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={{ color: "#0000EE" }}>Filter</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.chats}>
                    <TouchableOpacity style={styles.chat} onPress={() => { navigation.navigate("Phoji") }}>
                        <Image style={styles.chatUserIcon} source={botImage} />
                        <View style={styles.userInfo}>
                            <Text style={styles.user}>Phoji</Text>
                            <Text style={styles.lastChat}>Sent Something related to something</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    goBackButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    backButton: {
        tintColor: "#000",
        width: 15,
        height: 15,
        marginHorizontal: 6,
    },
    inputContainer: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        width: '80%',
        color: "#0000EE"
    },
    filterButton: {
        paddingRight: 15,
    },
    chats: {
        paddingTop: 20,
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    chatUserIcon: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    userInfo: {
        paddingLeft: 15,
    },
    user: {
        fontSize: 17,
        fontWeight: 600,
        marginBottom: 5,
    },

})