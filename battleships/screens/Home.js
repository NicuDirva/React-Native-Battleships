import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

function UserDataField({ label, value }) {
  return (
    <View style={styles.userDataField}>
      <Text style={styles.fieldLabel}>{label}: </Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function Home({ route }) {
  const navigate = useNavigation();
  const [userData, setUserData] = useState('');
  const { user } = route.params;
  const token = user.accessToken;

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://malamute-enabled-yak.ngrok-free.app/user/details/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      console.log(result)
      setUserData(result);
    } catch (error) {
      console.error("Error in fetch user: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = () => {
    user.accessToken = null;
    navigate.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <UserDataField label="Email" value={user.email} />
      <UserDataField label="Currently Games Playing" value={userData.currentlyGamesPlaying} />
      <UserDataField label="Games Lost" value={userData.gamesLost} />
      <UserDataField label="Games Played" value={userData.gamesPlayed} />
      <UserDataField label="Games Won" value={userData.gamesWon} />

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  userDataField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  fieldValue: {
    flex: 1,
  },
  signOutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
