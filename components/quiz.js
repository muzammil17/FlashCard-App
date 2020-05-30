import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  getDeck,
  clearNotifications,
  setLocalNotification,
} from "../utils/api";
import { AppLoading } from "expo";

export class Quiz extends Component {
  state = {
    deck: null,
    loading: true,
    totalQuestion: 0,
    points: 0,
    currentQuestion: 0,
    showAnswer: false,
  };

  componentDidMount() {
    const { title } = this.props.route.params;
    getDeck(title).then((res) => {
      this.setState({
        deck: res,
        loading: false,
        totalQuestion: res.questions.length,
      });
    });
  }

  static getDerievedStateFromProps = (state, props) => {
    if (state.deck !== props.deck) {
      return {
        deck: props.deck,
        loading: state.loading,
      };
    }
  };

  nextQuestion = (correct) => {
    clearNotifications().then(setLocalNotification);
    const { currentQuestion, totalQuestion } = this.state;
    if (currentQuestion < totalQuestion) {
      if (correct) {
        this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          points: this.state.points + 1,
          showAnswer: false,
        });
      } else {
        this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          showAnswer: false,
        });
      }
    }
  };

  retakeQuiz = () => {
    this.setState({
      points: 0,
      currentQuestion: 0,
    });
  };

  toggleAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  };

  render() {
    //  console.log(this.props);
    const {
      deck,
      loading,
      currentQuestion,
      totalQuestion,
      showAnswer,
      points,
    } = this.state;
    console.log(this.state);
    if (loading) {
      return <AppLoading />;
    }

    if (deck.questions.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 30, textAlign: "center", padding: 20 }}>
            You have zero cards in the deck. Add card to start quiz.
          </Text>
        </View>
      );
    }

    let question = currentQuestion < totalQuestion ? true : false;

    return (
      <View style={{ flex: 1 }}>
        {question === true ? (
          <View style={{ flex: 1 }}>
            <Text style={{ marginLeft: 5, fontSize: 20 }}>
              {currentQuestion + 1}/{totalQuestion}{" "}
            </Text>
            <View style={styles.questionSection}>
              {showAnswer === true ? (
                <View>
                  <Text style={styles.questionText}>
                    {deck.questions[currentQuestion].answer}
                  </Text>

                  <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={this.toggleAnswer}
                  >
                    <Text style={styles.optionText}>Question</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={styles.questionText}>
                    {deck.questions[currentQuestion].question}
                  </Text>

                  <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={this.toggleAnswer}
                  >
                    <Text style={styles.optionText}>Answer</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#009900" }]}
                onPress={() => {
                  this.nextQuestion(true);
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Correct
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "red", marginTop: 15 },
                ]}
                onPress={() => {
                  this.nextQuestion(false);
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Incorrect
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.questionSection}>
            <Text style={{ fontSize: 30 }}>Your Quiz score is</Text>
            <Text
              style={{
                fontSize: 35,
                marginTop: 10,
                fontWeight: "600",
                color: "red",
              }}
            >
              {Math.floor((points / totalQuestion) * 100)}%
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#009900", marginTop: 35 },
              ]}
              onPress={this.retakeQuiz}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Start Again
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red", marginTop: 35 }]}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>Exit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { title } = props.route.params;
  return {
    deck: state[title],
  };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  questionSection: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 30,
    textAlign: "center",
  },
  optionText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    width: "70%",
    padding: 15,
    borderRadius: 5,
  },
});
