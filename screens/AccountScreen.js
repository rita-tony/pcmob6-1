import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, Switch, TouchableOpacity, Animated, TouchableWithoutFeedback, ScrollView } from "react-native";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { useSelector, useDispatch } from "react-redux";
import { changeModeAction, deletePicAction } from "../redux/ducks/accountPref";
import { logOutAction } from "../redux/ducks/blogAuth";


export default function AccountScreen({ navigation }) {
  const picSize = new Animated.Value(0);
  const sizeInterpolation = {
    inputRange: [0, 0.5, 1],
    outputRange: [100,150,100]
  };

  const token = useSelector((state) => state.auth.token);
  const currUserName = useSelector((state) => state.auth.currentUserName);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const profilePicture = useSelector((state) => state.accountPrefs.profilePicture);
  const dispatch = useDispatch();

  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  function signOut() {
    console.log("signing out now");
    dispatch(logOutAction());
    navigation.navigate("SignInSignUp");
  }

  function switchMode() {
    dispatch(changeModeAction());
  }

  function deletePicture() {
    dispatch(deletePicAction());
  }

  function changePicSize() {
    Animated.loop(
      Animated.timing(picSize, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false
      }),
    ).start()
  }

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}>
        {" "}
        Hello {currUserName} !
      </Text>

      <View style={{height: profilePicture == null ? 0 : 150, justifyContent: "center"}}>
        {profilePicture && (
          <TouchableWithoutFeedback onPress={changePicSize}>
            <Animated.Image
              source={{ uri: profilePicture }}
              style={{ width: picSize.interpolate(sizeInterpolation), height: picSize.interpolate(sizeInterpolation), borderRadius: 200 }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}>
          {profilePicture == null ? "No profile picture. Click to take one" : " Change profile picture"}
        </Text>
      </TouchableOpacity>

      {profilePicture && (
      <TouchableOpacity onPress={() => deletePicture()}>
        <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}>
          Remove profile picture
        </Text>
      </TouchableOpacity>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
        <Switch value={isDark} onChange={switchMode} />
      </View>
      <TouchableOpacity style={[styles.button]} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
