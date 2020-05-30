import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { AppLoading } from "expo";
import {
  getDeck,
  removeDeck,
  setLocalNotification,
  clearNotifications,
} from "../utils/api";
import { connect } from "react-redux";

import { removeItem } from "../actions";

class DeckDetail extends Component {
  state = {
    deck: null,
    loading: true,
  };

  componentDidMount() {

    const { title } = this.props.route.params;
    getDeck(title)
      .then((res) => {
        // console.log("response : ", res);
        this.setState({
          deck: res,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.deck !== state.deck) {
      return {
        deck: props.deck,
      };
    }
  }

  handleNavigation = (route, title) => {
    this.props.navigation.navigate(route, { title });
  };

  handleRemove = (title) => {
    removeDeck(title);
    this.props.dispatch(removeItem(title));
    this.props.navigation.navigate("Home");
  };

  render() {
    // console.log(this.props);
    const { deck, loading } = this.state;

    if (loading) {
      return <AppLoading />;
    }

    if (deck == null || deck == undefined) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 4, justifyContent: "center" }}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cards}>{deck.questions.length} Cards</Text>
        </View>

        <View style={{ flex: 3, alignItems: "center", width: "100%" }}>
          <TouchableOpacity
            style={
              Platform.OS === "ios" ? styles.iosBtnCard : styles.androidBtnCard
            }
            onPress={() => {
              this.handleNavigation("AddCard", deck.title);
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 17 }}>
              Add Card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              Platform.OS === "ios" ? styles.iosBtnQuiz : styles.androidBtnQuiz
            }
            onPress={() => {
              this.handleNavigation("Quiz", deck.title);
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 17 }}>
              Start Quiz
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.handleRemove(deck.title);
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 17, marginTop: 25 }}>
              Remove Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 45,
    color: "black",
    textAlign: "center",
  },
  cards: {
    fontSize: 20,
    marginTop: 5,
    color: "grey",
    textAlign: "center",
  },
  iosBtnCard: {
    backgroundColor: "black",
    width: "60%",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  },
  androidBtnQuiz: {
    borderWidth: 2,
    borderColor: "#000000",
    width: "50%",
    padding: 15,
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: "black",
  },
  iosBtnQuiz: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#000000",
    width: "60%",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  },
  androidBtnCard: {
    backgroundColor: "white",
    width: "50%",
    padding: 15,
    marginTop: 20,
    borderRadius: 3,
  },
});

const mapStateToProps = (state, props) => {
  let deck = state[props.route.params.title];
  return {
    deck,
  };
};

export default connect(mapStateToProps)(DeckDetail);
