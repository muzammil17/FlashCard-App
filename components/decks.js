import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AppLoading } from "expo";
import { getDecks, removeItems } from "../utils/api";
import { connect } from "react-redux";
import { getAllDecks } from "../actions";

export class Decks extends Component {
  state = {
    decks: {},
    loading: true,
  };
  componentDidMount() {
    getDecks().then((res) => {
      this.props.dispatch(getAllDecks(res));
      // console.log(this.props.decks)
      this.setState({
        decks: this.props.decks,
        loading: false,
      });
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.decks !== state.decks) {
      return {
        decks: props.decks,
      };
    } else return state;
  }

  handleNavigation = (title) => {
    const { navigation } = this.props;
    navigation.navigate("DeckDetail", {
      title,
    });
  };

  render() {
    const { decks, loading } = this.state;

    if (loading) {
      return <AppLoading />;
    }
    let data = Object.keys(decks);
    if (data.length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 30 }}>No deck found</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={Object.keys(decks)}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                marginTop: 3,
                width: "100%",
                backgroundColor: "grey",
              }}
            ></View>
          )}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity
                onPress={() => {
                  this.handleNavigation(decks[item].title);
                }}
              >
                <Text style={styles.title}>{decks[item].title} </Text>
                <Text style={styles.cards}>
                  {decks[item].questions.length} Cards
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    decks: state,
  };
};

export default connect(mapStateToProp)(Decks);

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
  },
  cards: {
    fontSize: 15,
    marginTop: 5,
    color: "grey",
    textAlign: "center",
  },
});
