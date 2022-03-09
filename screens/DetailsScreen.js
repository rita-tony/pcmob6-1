import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_POST } from "../constants/API";
import { useSelector } from "react-redux";

export default function ShowScreen({ navigation, route }) {
  const [post, setPost] = useState({ title: "", content: "" });
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editPost} style={{ marginRight: 10 }}>
          <FontAwesome name="pencil-square-o" size={30} color={styles.headerTint} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    //console.log(route.params.post)
    getPost();
  }, [])

  async function getPost() {
    const id = route.params.id
    console.log(id)
    try {
      const response = await axios.get(API + API_POST + "/" + id, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error = "Invalid token") {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  function editPost() {
    navigation.navigate("Edit", post);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.content, styles.text, { margin: 20 }]}>id: {post.id}</Text>
      <Text style={[styles.title, styles.text, { margin: 40 }]}>{post.title}</Text>
      <Text style={[styles.content, styles.text, { margin: 20 }]}>{post.content}</Text>
    </View>
  );
}
