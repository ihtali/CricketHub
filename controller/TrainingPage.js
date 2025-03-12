import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const players = [
  {
    name: "Babar Azam",
    focus: "Balance, Timing, Bat Angle",
    drills: [
      "Shadow Practice - Repeating cover drive motion without a ball.",
      "Front-Foot Stride Drill - Using cones to perfect foot placement.",
      "Throwdowns & Machine Practice - Practicing cover drives with targeted deliveries.",
    ],
    pattern: [
      "Stays still and balanced before playing the shot.",
      "Transfers weight smoothly onto the front foot.",
      "High elbow and full bat face for maximum control.",
    ],
  },
  {
    name: "Virat Kohli",
    focus: "Wrist Strength, Hand-Eye Coordination",
    drills: [
      "One-Handed Batting Drill - Improves bottom-hand control.",
      "Rubber Ball Reaction Drills - Enhances quick wrist reflexes.",
      "Mid-Wicket Placement Practice - Working on angles of the flick shot.",
    ],
    pattern: [
      "Strong grip with a bottom-hand emphasis.",
      "Quick wrists generate power from full-length balls.",
      "Weight transfer helps maintain shot accuracy.",
    ],
  },
  {
    name: "Joe Root",
    focus: "Late Reaction, Soft Hands",
    drills: [
      "Reaction Ball Drills - To enhance hand-eye coordination.",
      "Back-Foot Placement Drill - Ensuring controlled shots on the back foot.",
      "Tennis Ball Wall Practice - Playing against a wall to develop a late response.",
    ],
    pattern: [
      "Plays the ball late to use pace.",
      "Balanced stance with minimal movement.",
      "Uses soft hands to direct the shot through gaps.",
    ],
  },
  {
    name: "Steve Smith",
    focus: "Footwork, Shot Angles",
    drills: [
      "Shuffle Movement Drills - Practicing his signature movement before the ball is bowled.",
      "Fine-Leg Placement Training - Working on angles to direct the ball.",
      "Bat-Speed Exercises - Enhancing reaction time to play unconventional shots.",
    ],
    pattern: [
      "Unconventional stance with constant movement.",
      "Adjusts footwork to manipulate field placements.",
      "Quick hands to guide the ball to leg-side gaps.",
    ],
  },
];

const TrainingPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Training Resources</Text>
      {players.map((player, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Section title="Training Focus" content={player.focus} />
          <Section title="Drills" content={player.drills} isList />
          <Section title="Pattern & Technique" content={player.pattern} isList />
        </View>
      ))}
    </ScrollView>
  );
};

const Section = ({ title, content, isList = false }) => (
  <View style={styles.section}>
    <Text style={styles.heading}>{title}:</Text>
    {isList ? (
      content.map((item, i) => (
        <Text key={i} style={styles.text}>
          • {item}
        </Text>
      ))
    ) : (
      <Text style={styles.text}>{content}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  playerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 8,
  },
  section: {
    marginTop: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  text: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    lineHeight: 20,
  },
});

export default TrainingPage;