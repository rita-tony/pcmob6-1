import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";

export default function EditScreen({ navigation, route }) {
  const [title, setTitle] = useState(route.params.title);
  const [content, setContent] = useState(route.params.content);
  const token = useSelector((state) => state.auth.token);

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  /*
  console.log("updating");
  console.log(route);
  console.log("id: " + route.params.id);
  console.log("title: " + title);
  console.log("content: " + content);
  */

  async function updatePost(id) {
    const post = {
      title: title,
      content: content,
    };

    console.log("Updating " + id);
    try {
      const response = await axios.put(API + API_POSTS + `/${id}`, post, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response);
      navigation.navigate("Index", { post: post });

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <Text style={[additionalStyles.label, styles.text]}>Enter Title:</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={[additionalStyles.label, styles.text]}>Enter Content:</Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
        />

        <TouchableOpacity
          style={[styles.button, { margin: 20 }]}
          onPress={() => updatePost(route.params.id)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },
});
