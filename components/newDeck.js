import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { saveDeckTitle } from "../utils/api";
import { connect } from "react-redux";
import { addNewDeck } from "../actions";

class NewDeck extends Component {
  state = {
    title: "",
  };

  handleChange = (e) => {
    this.setState({ title: e });
    //console.log(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    // console.log(this.state);
    if (title !== "") {
      saveDeckTitle(title);
      this.props.dispatch(addNewDeck(title));
      this.setState({ title: "" });
      this.props.navigation.navigate("DeckDetail", { title });
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={{ fontSize: 40, fontWeight: "600" }}>Deck Title ?</Text>
          <TextInput
            placeholder="Title..."
            style={
              Platform.OS === "ios" ? styles.iosInput : styles.androidInput
            }
            value={this.state.title}
            onChangeText={this.handleChange}
          />
          <TouchableOpacity
            style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
            onPress={this.handleSubmit}
            disabled={this.state.title === "" ? true : false}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Submit
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iosInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: "80%",
    marginTop: 30,
    borderRadius: 10,
  },
  androidInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: "80%",
    marginTop: 30,
    borderRadius: 2,
  },

  iosBtn: {
    backgroundColor: "black",
    width: "70%",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  },
  androidBtn: {
    backgroundColor: "black",
    width: "70%",
    padding: 15,
    marginTop: 20,
    borderRadius: 3,
  },
});

export default connect()(NewDeck);
