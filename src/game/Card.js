import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Card = ({ isTurnedOver, onPress, children }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isTurnedOver ? styles.cardTurnedOver : styles.cardFaceDown,
      ]}
      onPress={onPress}
      disabled={isTurnedOver}
    >
      <Text style={styles.cardText}>{isTurnedOver ? children : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cardFaceDown: {
    backgroundColor: "#2c3e50",
  },
  cardTurnedOver: {
    backgroundColor: "#27ae60",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Card;
