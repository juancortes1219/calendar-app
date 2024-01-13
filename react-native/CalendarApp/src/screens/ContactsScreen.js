// ContactsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Birthday, Contacts.Fields.Dates],
        });

        // Filter contacts with birthdays
        const filteredContacts = data.filter((contact) => contact.dates);

        // Sort contacts alphabetically by last name
        const sortedContacts = filteredContacts.sort((a, b) => {
          const lastNameA = a.lastName || "";
          const lastNameB = b.lastName || "";
          return lastNameA.localeCompare(lastNameB);
        });

        if (data.length > 0) {
          // console.log(JSON.stringify(sortedContacts, null, 2));
          setContacts(sortedContacts);
        } else {
          setError("No contacts found.");
        }
      } else {
        setError("Permission to access contacts denied.");
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ContactDetails", { contact: item })}
    >
      <View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
