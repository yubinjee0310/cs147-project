import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import EventList from "../../components/EventList";

import USER from "../../consts/user";

export default function ManageEventsScreen({ navigation }) {
  const [allUserEvents, setAllUserEvents] = useState([])
  const [userHostingLive, setUserHostingLive] = useState([])
  const [userHostingReview, setUserHostingReview] = useState([])
  const [userHostingRejected, setUserHostingRejected] = useState([])
  const [userHostingCancelled, setUserHostingCancelled] = useState([])

  const getAllUserEvents = async () => {
    let ls = []
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("host", "==", USER.id));
    const queryResults = await getDocs(q);
    queryResults.forEach((doc) => { ls = [...ls, doc.data()] });
    console.log("read collection query performed.")
    setAllUserEvents(ls)
  };

  const getUserEvents = () => {
    setUserHostingLive(allUserEvents.filter(item => item.status === "live"))
    setUserHostingReview(allUserEvents.filter(item => item.status === "pending"))
    setUserHostingRejected(allUserEvents.filter(item => item.status === "rejected"))
    setUserHostingCancelled(allUserEvents.filter(item => item.status === "cancelled"))
  };

  useEffect(() => {
    navigation.addListener(
          'focus',
          payload => {
              getAllUserEvents();
          }
      );
    }, [])

  useEffect(() => {
    getUserEvents();
  }, [allUserEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Your Hosting Events </Text>
        <EventList events={userHostingLive} />
      </View>

      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Your Pending Events </Text>
        <EventList events={userHostingReview} />
      </View>

      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Your Rejected Events </Text>
        <EventList events={userHostingRejected} />
      </View>

      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Your Cancelled Events </Text>
        <EventList events={userHostingCancelled} />
      </View>
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
  }
});
