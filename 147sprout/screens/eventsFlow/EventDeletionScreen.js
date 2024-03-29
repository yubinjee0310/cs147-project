import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView} from 'react-native';
import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import USER from "../../consts/user";

export default function EventDeletionScreen({ route, navigation }) {
  const [confirm, setConfirm] = useState(false);
  const { eventData } = route.params;

  const cancelEvent = async () => {
    const eventRef = doc(db, "events", eventData.id);
    await updateDoc(eventRef, {
      status: "cancelled"
    });
    const eventSnap = await getDoc(eventRef);
    console.log("update performed")
    navigation.navigate("Events")
  }

  return (
    <SafeAreaView style={styles.container}>

    <Text style={{fontSize: 20}}>
      Are you sure you'd like to cancel your event?
    </Text>
    <Text style={{fontSize: 20}}>
      You can undo this actiom from your "Manage Events" page.
    </Text>

    {confirm ?
      <View>
        <Text style={{fontSize: 20}}>
          Cancellation confirmed
        </Text>
        <Pressable onPress={() => cancelEvent()}>
          <Text style={{fontSize: 20}}>
            Cancel
          </Text>
        </Pressable>
      </View>
      :
      <View>
        <Pressable onPress={() => setConfirm(true)}>
          <Text style={{fontSize: 20}}>
            Confirm cancellation
          </Text>
        </Pressable>
        <Text style={{fontSize: 20}}>
          Cancel
        </Text>
      </View>
    }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  textInput: {
    width: '80%',
    height: 30,
    padding: 8,
    margin: 2,
    backgroundColor: '#ddd',
  }
});
