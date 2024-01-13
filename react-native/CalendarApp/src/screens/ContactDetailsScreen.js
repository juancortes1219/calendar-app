// ContactDetailsScreen.js
import React from "react";
import { View, Text } from "react-native";

export default function ContactDetailsScreen({ route }) {
  const { contact } = route.params;

  const formatDateString = (dateObject) => {
    if (dateObject.year) {
      return `${dateObject.month + 1}/${dateObject.day}/${dateObject.year}`;
    } else {
      return `${dateObject.month + 1}/${dateObject.day}`;
    }
  };

  //   let anniversaryDate = "";
  let spiritualBirthday = "";

  const spiritualDate = () => {
    for (let i = 0; i < contact.dates.length; i++) {
      //   if (contact.dates[i].label === "anniversary") {
      //     anniversaryDate = "Anniversary: " + formatDateString(contact.dates[i]);
      //   } else if (contact.dates[i].label === "spirthday") {
      //     spiritualBirthday = "Spirthday: " + formatDateString(contact.dates[i]);
      //   }
      if (contact.dates[i].label === "spirthday") {
        spiritualBirthday = "spirthday: " + formatDateString(contact.dates[i]);
      }
    }
  };

  spiritualDate();

  return (
    <View>
      <Text>Name: {contact.name}</Text>
      <Text>birthday: {formatDateString(contact.birthday)}</Text>
      <Text>{spiritualBirthday}</Text>
    </View>
  );
}
