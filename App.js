// ios 1067276246859-vrqa0cjr2vjam36es534mad67o3ojr1a.apps.googleusercontent.com
// android 1067276246859-2itpg3tig69jh3fbddaqr75j1po0o0cd.apps.googleusercontent.com

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

export default function App() {

  const[request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:"1067276246859-2itpg3tig69jh3fbddaqr75j1po0o0cd.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === 'success') {
      console.log("Tilbage fra Google " + response.authentication.accessToken);
    }
  })

  return (
    <View style={styles.container}>
      <Text>Vi arbejder på Google login</Text>
      <Button
      title="Google Login"
      onPress={() => promptAsync()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
