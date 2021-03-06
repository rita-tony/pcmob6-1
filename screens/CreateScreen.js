import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { lightStyles, commonStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_CREATE } from "../constants/API";
import { useSelector } from "react-redux";

export default function CreateScreen({ navigation }) {
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function savePost() {
    const post = {
      title: title,
      content: content,
      userid: currentUserId,
    };

    try {
      console.log("Create Post");
      //console.log(token);
      const response = await axios.post(API + API_CREATE, post, {
        headers: { Authorization: `JWT ${token}` },
      });
      //console.log(response.data);
      navigation.navigate("Index", { post: post });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
      <Text style={[additionalStyles.label, styles.text]}>User Id: {currentUserId}</Text>
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
          onPress={savePost}
        >
          <Text style={styles.buttonText}>Save</Text>
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