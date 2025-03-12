import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function ScoringPage({ route, navigation }) {
  const {
    team1,
    team2,
    team1Players,
    team2Players,
    tossWinner,
    tossDecision,
    striker,
    nonStriker,
    bowler,
    isSecondInnings = false,
    targetRuns = 0,
  } = route.params;

  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [currentStriker, setCurrentStriker] = useState(striker);
  const [currentNonStriker, setCurrentNonStriker] = useState(nonStriker);
  const [currentBowler, setCurrentBowler] = useState(bowler);

  // Batsmen statistics
  const [batsmenStats, setBatsmenStats] = useState(
    team1Players.reduce((acc, player) => {
      acc[player] = { runs: 0, balls: 0, fours: 0, sixes: 0, out: false, dismissedBy: '' };
      return acc;
    }, {})
  );

  // Bowler statistics
  const [bowlerStats, setBowlerStats] = useState(
    team2Players.reduce((acc, player) => {
      acc[player] = { overs: 0, balls: 0, runs: 0, wickets: 0, batsmenDismissed: [] };
      return acc;
    }, {})
  );

  // Fall of wickets
  const [fallOfWickets, setFallOfWickets] = useState([]);

  // Function to add runs
  const addRun = (runs) => {
    setScore(score + runs);
    setBalls(balls + 1);

    // Update batsman's stats
    setBatsmenStats((prevStats) => ({
      ...prevStats,
      [currentStriker]: {
        ...prevStats[currentStriker],
        runs: prevStats[currentStriker].runs + runs,
        balls: prevStats[currentStriker].balls + 1,
        fours: runs === 4 ? prevStats[currentStriker].fours + 1 : prevStats[currentStriker].fours,
        sixes: runs === 6 ? prevStats[currentStriker].sixes + 1 : prevStats[currentStriker].sixes,
      },
    }));

    // Update bowler's stats
    setBowlerStats((prevStats) => ({
      ...prevStats,
      [currentBowler]: {
        ...prevStats[currentBowler],
        runs: prevStats[currentBowler].runs + runs,
        balls: prevStats[currentBowler].balls + 1,
      },
    }));

    // Switch strike on odd runs
    if (runs % 2 !== 0) {
      const temp = currentStriker;
      setCurrentStriker(currentNonStriker);
      setCurrentNonStriker(temp);
    }

    // Check if over is completed
    if (balls + 1 === 6) {
      setOvers(overs + 1);
      setBalls(0);

      // Update bowler's overs
      setBowlerStats((prevStats) => ({
        ...prevStats,
        [currentBowler]: {
          ...prevStats[currentBowler],
          overs: prevStats[currentBowler].overs + 1,
          balls: 0,
        },
      }));

      // Prompt user to choose the next bowler
      chooseNextBowler();
    }
  };

  // Function to add a dot ball
  const addDotBall = () => {
    setBalls(balls + 1);

    // Update batsman's stats
    setBatsmenStats((prevStats) => ({
      ...prevStats,
      [currentStriker]: {
        ...prevStats[currentStriker],
        balls: prevStats[currentStriker].balls + 1,
      },
    }));

    // Update bowler's stats
    setBowlerStats((prevStats) => ({
      ...prevStats,
      [currentBowler]: {
        ...prevStats[currentBowler],
        balls: prevStats[currentBowler].balls + 1,
      },
    }));

    // Check if over is completed
    if (balls + 1 === 6) {
      setOvers(overs + 1);
      setBalls(0);

      // Update bowler's overs
      setBowlerStats((prevStats) => ({
        ...prevStats,
        [currentBowler]: {
          ...prevStats[currentBowler],
          overs: prevStats[currentBowler].overs + 1,
          balls: 0,
        },
      }));

      // Prompt user to choose the next bowler
      chooseNextBowler();
    }
  };

  // Function to add a wicket
  const addWicket = () => {
    setWickets(wickets + 1);
    setBalls(balls + 1);

    // Update batsman's stats
    setBatsmenStats((prevStats) => ({
      ...prevStats,
      [currentStriker]: {
        ...prevStats[currentStriker],
        out: true,
        dismissedBy: currentBowler,
      },
    }));

    // Update bowler's stats
    setBowlerStats((prevStats) => ({
      ...prevStats,
      [currentBowler]: {
        ...prevStats[currentBowler],
        wickets: prevStats[currentBowler].wickets + 1,
        batsmenDismissed: [...prevStats[currentBowler].batsmenDismissed, currentStriker],
      },
    }));

    // Add to fall of wickets
    setFallOfWickets((prev) => [
      ...prev,
      {
        batsman: currentStriker,
        bowler: currentBowler,
        runs: batsmenStats[currentStriker].runs,
      },
    ]);

    // Prompt user to choose the next batsman
    chooseNextBatsman();
  };

  // Function to add extras (Wide, No Ball, Bye, Leg Bye)
  const addExtra = (type, runs = 0) => {
    setScore(score + runs + (type === 'wide' || type === 'noBall' ? 1 : 0));
    if (type !== 'wide') {
      setBalls(balls + 1);
    }

    // Update bowler's stats
    setBowlerStats((prevStats) => ({
      ...prevStats,
      [currentBowler]: {
        ...prevStats[currentBowler],
        runs: prevStats[currentBowler].runs + runs + (type === 'wide' || type === 'noBall' ? 1 : 0),
      },
    }));

    // Check if over is completed
    if (balls + 1 === 6) {
      setOvers(overs + 1);
      setBalls(0);

      // Update bowler's overs
      setBowlerStats((prevStats) => ({
        ...prevStats,
        [currentBowler]: {
          ...prevStats[currentBowler],
          overs: prevStats[currentBowler].overs + 1,
          balls: 0,
        },
      }));

      // Prompt user to choose the next bowler
      chooseNextBowler();
    }
  };

  // Function to choose the next bowler
  const chooseNextBowler = () => {
    Alert.alert(
      'Choose Bowler',
      'Select the bowler for the next over:',
      team2Players.map((player) => ({
        text: player,
        onPress: () => setCurrentBowler(player),
      }))
    );
  };

  // Function to choose the next batsman
  const chooseNextBatsman = () => {
    const remainingBatsmen = team1Players.filter(
      (player) => !batsmenStats[player].out && player !== currentNonStriker
    );
    Alert.alert(
      'Choose Batsman',
      'Select the next batsman:',
      remainingBatsmen.map((player) => ({
        text: player,
        onPress: () => setCurrentStriker(player),
      }))
    );
  };

  // Function to finish the innings
  const finishInnings = () => {
    Alert.alert(
      'Finish Innings',
      'Are you sure you want to finish this innings?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Finish',
          onPress: () => {
            navigation.replace('ScoringPage', {
              team1: team2,
              team2: team1,
              team1Players: team2Players,
              team2Players: team1Players,
              tossWinner,
              tossDecision: tossDecision === 'Batting' ? 'Bowling' : 'Batting',
              isSecondInnings: true,
              targetRuns: score + 1,
              striker: team2Players[0],
              nonStriker: team2Players[1],
              bowler: team1Players[0],
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Live Scoring</Text>

      {isSecondInnings && (
        <Text style={styles.targetText}>Target: {targetRuns} runs</Text>
      )}

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}/{wickets}</Text>
        <Text style={styles.scoreText}>Overs: {overs}.{balls}</Text>
      </View>

      <View style={styles.playerContainer}>
        <Text style={styles.playerText}>Striker: {currentStriker}</Text>
        <Text style={styles.playerText}>Non-Striker: {currentNonStriker}</Text>
        <Text style={styles.playerText}>Bowler: {currentBowler}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => addRun(1)}>
          <Text style={styles.buttonText}>+1 Run</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addRun(4)}>
          <Text style={styles.buttonText}>+4 Runs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addRun(6)}>
          <Text style={styles.buttonText}>+6 Runs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={addDotBall}>
          <Text style={styles.buttonText}>Dot Ball</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addWicket}>
          <Text style={styles.buttonText}>Wicket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addExtra('wide')}>
          <Text style={styles.buttonText}>Wide</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => addExtra('noBall')}>
          <Text style={styles.buttonText}>No Ball</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addExtra('bye', 1)}>
          <Text style={styles.buttonText}>Bye</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addExtra('legBye', 1)}>
          <Text style={styles.buttonText}>Leg Bye</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={finishInnings}>
          <Text style={styles.buttonText}>Finish Innings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Batsmen Statistics</Text>
        {team1Players.map((player) => (
          <View key={player} style={styles.statsRow}>
            <Text style={styles.statsText}>{player}</Text>
            <Text style={styles.statsText}>
              {batsmenStats[player].runs} ({batsmenStats[player].balls}) - {batsmenStats[player].fours} 4s, {batsmenStats[player].sixes} 6s
              {batsmenStats[player].out && ` - Out (${batsmenStats[player].dismissedBy})`}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Bowler Statistics</Text>
        {team2Players.map((player) => (
          <View key={player} style={styles.statsRow}>
            <Text style={styles.statsText}>{player}</Text>
            <Text style={styles.statsText}>
              {bowlerStats[player].overs}.{bowlerStats[player].balls} - {bowlerStats[player].runs} R, {bowlerStats[player].wickets} W
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Fall of Wickets</Text>
        {fallOfWickets.map((wicket, index) => (
          <View key={index} style={styles.statsRow}>
            <Text style={styles.statsText}>
              {wicket.batsman} - {wicket.runs} (b {wicket.bowler})
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  targetText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  playerContainer: {
    marginBottom: 20,
  },
  playerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D47A1',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statsText: {
    fontSize: 16,
    color: '#333',
  },
});