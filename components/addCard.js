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
import { addCardToDeck } from "../utils/api";
import { connect } from "react-redux";
import { AddCardInDeck } from "../actions";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleChange = (e, name) => {
    this.setState({ [name]: e });
    //console.log(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props);
    const { title } = this.props.route.params;
    const { answer, question } = this.state;
    if (answer !== "" && question !== "") {
      addCardToDeck(title, { answer, question });
      this.props.dispatch(AddCardInDeck(title, { answer, question }));

      this.setState({
        answer: "",
        question: "",
      });

      this.props.navigation.goBack();
    } else {
      alert("plz fill up the form");
    }
  };

  render() {
    const { answer, question } = this.state;
    let btnDiabled = true;
    if (answer !== "" && question !== "") {
      btnDiabled = false;
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={{ fontSize: 40, fontWeight: "600" }}>Add Question</Text>
          <TextInput
            placeholder="Question..."
            style={
              Platform.OS === "ios" ? styles.iosInput : styles.androidInput
            }
            value={this.state.question}
            onChangeText={(e) => {
              this.handleChange(e, "question");
            }}
          />

          <TextInput
            placeholder="Answer..."
            style={
              Platform.OS === "ios" ? styles.iosInput : styles.androidInput
            }
            value={this.state.answer}
            onChangeText={(e) => {
              this.handleChange(e, "answer");
            }}
          />
          <TouchableOpacity
            style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
            onPress={this.handleSubmit}
            disabled={btnDiabled}
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

export default connect()(AddCard);
