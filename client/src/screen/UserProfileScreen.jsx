import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../services/UserServices';
import ProfileHeader from '../components/ProfileHeader';
import PostCard from '../components/PostCard';
import AuthContext from '../context/AuthContext';

const UserProfileScreen = ({ route }) => {
    const [user, setUser] = useState({});
    const { userId } = route.params;
    const {loggedUser, reload} = useContext(AuthContext)
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUser(userId);
            setUser(res.user);
        }
        fetchUser();
    }, [reload])

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.goBackButton}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Text>{'<'} back</Text>
                </TouchableOpacity>

                <ProfileHeader user={user} />

                {user.posts?.map((post,index)=>(
                    <PostCard post={post} key={index} user={user}/>    
                ))}
            </View>
        </SafeAreaView>
    );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container:{
        flex:1,
    },
    goBackButton:{
        paddingLeft:10,
    }
});
