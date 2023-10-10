// ios 1067276246859-vrqa0cjr2vjam36es534mad67o3ojr1a.apps.googleusercontent.com
// android 1067276246859-2itpg3tig69jh3fbddaqr75j1po0o0cd.apps.googleusercontent.com

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1067276246859-2itpg3tig69jh3fbddaqr75j1po0o0cd.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      console.log("Tilbage fra Google " + response.authentication.accessToken);
    }
  });

  const [userData, setUserData] = useState(null);

  async function getUserData(){
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}`},
    });
    userInfoResponse.json()
    .then(data =>{
      console.log(data);
      setUserData(data); // Set user data
    })
  }

  return (
    <View style={styles.container}>
      <Text>Vi arbejder på Google login</Text>
      <Button title="Google Login" onPress={() => promptAsync()} />
      <StatusBar style="auto" />
      <Button title="Get User Data" onPress={getUserData} />
      <StatusBar style="auto" />
      {userData && (
        <View style={styles.userInfo}>
          <Image source={{ uri: userData.picture }} style={styles.userImage} />
          <Text style={styles.userInfoText}>Name: {userData.name}</Text>
          <Text style={styles.userInfoText}>Email: {userData.email}</Text>
          <Text style={styles.userInfoText}>ID: {userData.id}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4", // Light gray background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333", // Dark gray text
  },
  button: {
    backgroundColor: "#4285F4", // Google blue color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  userInfo: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333", // Dark gray text
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#4285F4", // Google blue border
  },
});

