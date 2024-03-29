import { StyleSheet, Pressable, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";

import EventList from "../../components/EventList";

// provided in route a list of events, display to take up entire screen.
export default function EventsDisplayScreen({ navigation, route }) {
  const { eventList, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text> {title} </Text>
      <EventList events={eventList} />
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
