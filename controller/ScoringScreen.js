import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList, Alert } from 'react-native';

export default function ScoringScreen({ navigation, route }) {
  const {
    teamAName,
    teamBName,
    teamAPlayers,
    teamBPlayers,
    striker,
    nonStriker,
    bowler,
    battingTeamName,
    bowlingTeamName,
    targetRuns,
    currentInnings,
    startFresh,
  } = route.params;

  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [legalBalls, setLegalBalls] = useState(0);
  const [extras, setExtras] = useState({ wides: 0, noBalls: 0, byes: 0, legByes: 0 });

  const [currentStriker, setCurrentStriker] = useState(striker);
  const [currentNonStriker, setCurrentNonStriker] = useState(nonStriker);
  const [currentBowler, setCurrentBowler] = useState(bowler);

  const [battingStats, setBattingStats] = useState({});
  const [bowlingStats, setBowlingStats] = useState({});
  const [fallOfWickets, setFallOfWickets] = useState([]);
  const [overHistory, setOverHistory] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [currentPartnership, setCurrentPartnership] = useState({
    batsman1: striker,
    batsman2: nonStriker,
    runs: 0,
    balls: 0
  });

  const [bowlerModalVisible, setBowlerModalVisible] = useState(false);
  const [newBatsmanModalVisible, setNewBatsmanModalVisible] = useState(false);
  const [dismissalModalVisible, setDismissalModalVisible] = useState(false);
  const [extraTypeModalVisible, setExtraTypeModalVisible] = useState(false);

  const [dismissalType, setDismissalType] = useState('');
  const [fielder, setFielder] = useState('');
  const [extraType, setExtraType] = useState('');

  const maxOvers = 20;

  // Initialize stats
  useEffect(() => {
    if (startFresh) {
      const players = battingTeamName === teamAName ? teamAPlayers : teamBPlayers;
      const bowlers = bowlingTeamName === teamAName ? teamAPlayers : teamBPlayers;
      
      const initialBattingStats = {};
      const initialBowlingStats = {};

      players.forEach(player => {
        initialBattingStats[player] = { runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false };
      });

      bowlers.forEach(player => {
        initialBowlingStats[player] = { ballsBowled: 0, runsConceded: 0, wickets: 0, maidens: 0, wides: 0, noBalls: 0 };
      });

      setBattingStats(initialBattingStats);
      setBowlingStats(initialBowlingStats);
      setCurrentPartnership({
        batsman1: striker,
        batsman2: nonStriker,
        runs: 0,
        balls: 0
      });
    }
  }, [startFresh]);

  // Update partnership and over history
  useEffect(() => {
    setCurrentPartnership(prev => ({
      ...prev,
      runs: runs - (partnerships.reduce((sum, p) => sum + p.runs, 0)),
      balls: balls - (partnerships.reduce((sum, p) => sum + p.balls, 0))
    }));

    updateOverHistory();
  }, [runs, balls, legalBalls]);

  // Handle wicket fall
  useEffect(() => {
    if (wickets > 0 && wickets !== partnerships.length) {
      setPartnerships(prev => [...prev, currentPartnership]);
      setCurrentPartnership({
        batsman1: currentStriker,
        batsman2: currentNonStriker,
        runs: 0,
        balls: 0
      });
    }
  }, [wickets]);

  const updateOverHistory = () => {
    const overNumber = Math.floor(legalBalls / 6);
    const ballsInOver = legalBalls % 6;
    
    if (ballsInOver === 0 && overNumber > 0) {
      const prevOverRuns = overHistory.length > 0 ? overHistory[overHistory.length - 1].totalRuns : 0;
      const prevOverWickets = overHistory.length > 0 ? overHistory[overHistory.length - 1].totalWickets : 0;
      
      setOverHistory(prev => [
        ...prev,
        {
          over: overNumber,
          bowler: currentBowler,
          runs: runs - prevOverRuns,
          wickets: wickets - prevOverWickets,
          totalRuns: runs,
          totalWickets: wickets
        }
      ]);

      // Check for maiden over
      const lastOverRuns = runs - prevOverRuns;
      if (lastOverRuns === 0) {
        const updatedBowler = { ...bowlingStats[currentBowler] };
        updatedBowler.maidens += 1;
        setBowlingStats({ ...bowlingStats, [currentBowler]: updatedBowler });
      }
    }
  };

  const oversFormatted = `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`;

  const updateScore = (run, type = 'normal') => {
    if (type === 'normal') {
      const updatedBatsman = { ...battingStats[currentStriker] };
      updatedBatsman.runs += run;
      updatedBatsman.balls += 1;
      if (run === 4) updatedBatsman.fours += 1;
      if (run === 6) updatedBatsman.sixes += 1;
      setBattingStats({ ...battingStats, [currentStriker]: updatedBatsman });

      const updatedBowler = { ...bowlingStats[currentBowler] };
      updatedBowler.ballsBowled += 1;
      updatedBowler.runsConceded += run;
      setBowlingStats({ ...bowlingStats, [currentBowler]: updatedBowler });

      setLegalBalls(prev => prev + 1);
      if (run % 2 !== 0) swapBatsmen();
      if ((legalBalls + 1) % 6 === 0) setBowlerModalVisible(true);
    } else if (type === 'wide') {
      const updatedBowler = { ...bowlingStats[currentBowler] };
      updatedBowler.runsConceded += 1;
      updatedBowler.wides += 1;
      setBowlingStats({ ...bowlingStats, [currentBowler]: updatedBowler });
      setExtras(prev => ({ ...prev, wides: prev.wides + 1 }));
    } else if (type === 'no ball') {
      const updatedBowler = { ...bowlingStats[currentBowler] };
      updatedBowler.runsConceded += 1;
      updatedBowler.noBalls += 1;
      setBowlingStats({ ...bowlingStats, [currentBowler]: updatedBowler });
      setExtras(prev => ({ ...prev, noBalls: prev.noBalls + 1 }));
      
      // No ball counts as a ball faced by batsman but not counted in bowler's over
      const updatedBatsman = { ...battingStats[currentStriker] };
      updatedBatsman.balls += 1;
      setBattingStats({ ...battingStats, [currentStriker]: updatedBatsman });
    } else if (type === 'bye' || type === 'leg bye') {
      const updatedBatsman = { ...battingStats[currentStriker] };
      updatedBatsman.balls += 1;
      setBattingStats({ ...battingStats, [currentStriker]: updatedBatsman });
      
      setExtras(prev => ({ 
        ...prev, 
        [type === 'bye' ? 'byes' : 'legByes']: (prev[type === 'bye' ? 'byes' : 'legByes'] || 0) + run 
      }));
    }

    setRuns(prev => prev + run);
    setBalls(prev => prev + 1);

    checkEndOfMatch(runs + run, wickets, balls + 1);
  };

  const handleExtra = () => {
    setExtraTypeModalVisible(true);
  };

  const confirmExtra = (type) => {
    setExtraTypeModalVisible(false);
    if (type === 'wide' || type === 'no ball') {
      updateScore(1, type);
    } else {
      // For byes and leg byes, we need to ask for runs
      Alert.prompt(
        `${type === 'bye' ? 'Byes' : 'Leg Byes'} Runs`,
        `Enter runs scored from ${type.toLowerCase()}:`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (run) => {
              const runs = parseInt(run) || 0;
              updateScore(runs, type);
            },
          },
        ],
        'plain-text',
        '',
        'numeric'
      );
    }
  };

  const startDismissalProcess = () => {
    setDismissalModalVisible(true);
  };

  const confirmDismissal = () => {
    if (!dismissalType) {
      Alert.alert("Error", "Please select a dismissal type");
      return;
    }

    if ((dismissalType === 'Caught' || dismissalType === 'Run Out') && !fielder) {
      Alert.alert("Error", "Please select a fielder");
      return;
    }

    setDismissalModalVisible(false);
    setWickets(prev => prev + 1);
    setBalls(prev => prev + 1);
    setLegalBalls(prev => prev + 1);

    const updatedBowler = { ...bowlingStats[currentBowler] };
    updatedBowler.wickets += 1;
    updatedBowler.ballsBowled += 1;
    setBowlingStats({ ...bowlingStats, [currentBowler]: updatedBowler });

    const updatedBatsman = { ...battingStats[currentStriker] };
    updatedBatsman.isOut = true;
    setBattingStats({ ...battingStats, [currentStriker]: updatedBatsman });

    setFallOfWickets(prev => [
      ...prev,
      {
        batsmanOut: currentStriker,
        runsAtFall: runs,
        ballsAtFall: balls,
        dismissalType,
        bowler: currentBowler,
        fielder: dismissalType === 'Bowled' ? null : fielder
      }
    ]);

    setNewBatsmanModalVisible(true);
    setDismissalType('');
    setFielder('');

    if ((wickets + 1) === 10) {
      checkEndOfMatch(runs, wickets + 1, balls + 1);
    }
  };

  const swapBatsmen = () => {
    const temp = currentStriker;
    setCurrentStriker(currentNonStriker);
    setCurrentNonStriker(temp);
  };

  const selectNewBatsman = (newBatsman) => {
    setCurrentStriker(newBatsman);
    setNewBatsmanModalVisible(false);
  };

  const selectNewBowler = (newBowler) => {
    setCurrentBowler(newBowler);
    setBowlerModalVisible(false);
  };

  const handleEndInnings = () => {
    if (currentInnings === 'First') {
      navigation.navigate('SecondInningsSetup', {
        teamAName,
        teamBName,
        teamAPlayers,
        teamBPlayers,
        targetRuns: runs + 1,
      });
    } else {
      finishMatch(
        runs >= targetRuns ? 'win' : 'loss',
        runs,
        wickets
      );
    }
  };

  const checkEndOfMatch = (currentRuns, currentWickets, currentBalls) => {
    const maxBalls = maxOvers * 6;
    if (currentInnings === 'First') {
      if (currentBalls >= maxBalls || currentWickets === 10) {
        // First innings completed
        navigation.navigate('SecondInningsSetup', {
          teamAName,
          teamBName,
          teamAPlayers,
          teamBPlayers,
          targetRuns: currentRuns + 1,
        });
      }
    } else {
      if (currentRuns >= targetRuns) {
        finishMatch('win', currentRuns, currentWickets);
      } else if (currentBalls >= maxBalls || currentWickets === 10) {
        finishMatch('loss', currentRuns, currentWickets);
      }
    }
  };

  const finishMatch = (result, finalRuns, finalWickets) => {
    navigation.replace('MatchSummary', {
      teamAName,
      teamBName,
      battingTeamName,
      bowlingTeamName,
      battingStats,
      bowlingStats,
      fallOfWickets,
      partnerships,
      extras,
      result,
      targetRuns,
      finalRuns,
      finalWickets,
      currentInnings,
      overs: oversFormatted
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Live Scoring ({currentInnings} Innings)</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.teamName}>{battingTeamName}</Text>
        <Text style={styles.score}>Runs: {runs}/{wickets}</Text>
        <Text style={styles.score}>Overs: {oversFormatted}</Text>
        <Text style={styles.extras}>Extras: {extras.wides + extras.noBalls + extras.byes + extras.legByes} 
          (wd {extras.wides}, nb {extras.noBalls}, b {extras.byes}, lb {extras.legByes})
        </Text>

        {currentInnings === 'Second' && (
          <>
            <Text style={styles.targetText}>Target: {targetRuns}</Text>
            <Text style={[styles.targetText, { color: runs > targetRuns ? 'green' : 'red' }]}>
              {runs >= targetRuns ? 'Target Achieved!' : `${targetRuns - runs} runs needed`}
            </Text>
          </>
        )}
      </View>

      <View style={styles.batsmenContainer}>
        <View style={styles.batsmanRow}>
          <Text style={styles.batsmanLabel}>Striker:</Text>
          <Text style={styles.batsmanName}>{currentStriker}</Text>
          <Text style={styles.batsmanStats}>
            {battingStats[currentStriker]?.runs || 0} ({battingStats[currentStriker]?.balls || 0})
          </Text>
        </View>
        <View style={styles.batsmanRow}>
          <Text style={styles.batsmanLabel}>Non-Striker:</Text>
          <Text style={styles.batsmanName}>{currentNonStriker}</Text>
          <Text style={styles.batsmanStats}>
            {battingStats[currentNonStriker]?.runs || 0} ({battingStats[currentNonStriker]?.balls || 0})
          </Text>
        </View>
        <View style={styles.batsmanRow}>
          <Text style={styles.batsmanLabel}>Bowler:</Text>
          <Text style={styles.batsmanName}>{currentBowler}</Text>
          <Text style={styles.batsmanStats}>
            {bowlingStats[currentBowler]?.wickets || 0}/{bowlingStats[currentBowler]?.runsConceded || 0}
          </Text>
        </View>
      </View>

      <View style={styles.overProgress}>
        {[...Array(6)].map((_, i) => (
          <View 
            key={i}
            style={[
              styles.ballDot,
              i < (legalBalls % 6) ? styles.ballBowled : null
            ]}
          />
        ))}
        <Text style={styles.overText}>
          Over {Math.floor(legalBalls / 6) + 1}
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Runs</Text>
      <View style={styles.buttonRow}>
        {[0,1,2,3,4,6].map(num => (
          <TouchableOpacity key={num} style={styles.runButton} onPress={() => updateScore(num)}>
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionHeader}>Wickets & Extras</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.wicketButton} onPress={startDismissalProcess}>
          <Text style={styles.buttonText}>Wicket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraButton} onPress={handleExtra}>
          <Text style={styles.buttonText}>Extras</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.endButton} onPress={handleEndInnings}>
        <Text style={styles.endButtonText}>
          {currentInnings === 'First' ? 'End 1st Innings' : 'Finish Match'}
        </Text>
      </TouchableOpacity>
      
      {/* Bowler Selection Modal */}
      <Modal visible={bowlerModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select New Bowler</Text>
            <FlatList
              data={bowlingTeamName === teamAName ? teamAPlayers : teamBPlayers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem} 
                  onPress={() => selectNewBowler(item)}
                  disabled={item === currentBowler}
                >
                  <Text style={[
                    styles.modalText,
                    item === currentBowler && styles.disabledItem
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* New Batsman Selection Modal */}
      <Modal visible={newBatsmanModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select New Batsman</Text>
            <FlatList
              data={(battingTeamName === teamAName ? teamAPlayers : teamBPlayers).filter(p => 
                p !== currentNonStriker && !battingStats[p]?.isOut
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectNewBatsman(item)}>
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Dismissal Type Modal */}
      <Modal visible={dismissalModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select Dismissal Type</Text>
            <FlatList
              data={['Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket']}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem} 
                  onPress={() => setDismissalType(item)}
                >
                  <Text style={[
                    styles.modalText,
                    dismissalType === item && styles.selectedItem
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            {(dismissalType === 'Caught' || dismissalType === 'Run Out' || dismissalType === 'Stumped') && (
              <>
                <Text style={styles.modalHeaderSmall}>Select Fielder:</Text>
                <FlatList
                  data={bowlingTeamName === teamAName ? teamAPlayers : teamBPlayers}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={styles.modalItem} 
                      onPress={() => setFielder(item)}
                    >
                      <Text style={[
                        styles.modalText,
                        fielder === item && styles.selectedItem
                      ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={confirmDismissal}
              disabled={dismissalType === '' || 
                ((dismissalType === 'Caught' || dismissalType === 'Run Out' || dismissalType === 'Stumped') && !fielder)}
            >
              <Text style={styles.confirmButtonText}>Confirm Wicket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Extra Type Modal */}
      <Modal visible={extraTypeModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select Extra Type</Text>
            <FlatList
              data={['wide', 'no ball', 'bye', 'leg bye']}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem} 
                  onPress={() => confirmExtra(item)}
                >
                  <Text style={styles.modalText}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setExtraTypeModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e3f2fd' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  scoreCard: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 20, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  teamName: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  score: { fontSize: 18, textAlign: 'center', marginVertical: 2 },
  extras: { fontSize: 14, textAlign: 'center', marginTop: 5, color: '#555' },
  targetText: { fontSize: 16, textAlign: 'center', marginTop: 5, fontWeight: 'bold' },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginVertical: 5, marginLeft: 10 },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginVertical: 10,
    flexWrap: 'wrap' 
  },
  runButton: { 
    backgroundColor: '#0D47A1', 
    padding: 15, 
    borderRadius: 50, 
    width: 60, 
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  wicketButton: { 
    backgroundColor: 'red', 
    padding: 15, 
    borderRadius: 10, 
    width: 100, 
    alignItems: 'center',
    margin: 5
  },
  extraButton: { 
    backgroundColor: '#64b5f6', 
    padding: 15, 
    borderRadius: 10, 
    width: 100, 
    alignItems: 'center',
    margin: 5
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  endButton: { 
    backgroundColor: '#0D47A1', 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 30, 
    alignItems: 'center' 
  },
  endButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' },
  modalContainer: { 
    backgroundColor: '#fff', 
    margin: 20, 
    padding: 20, 
    borderRadius: 10, 
    maxHeight: '80%' 
  },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalHeaderSmall: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' },
  modalItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalText: { fontSize: 16, textAlign: 'center' },
  selectedItem: { color: '#0D47A1', fontWeight: 'bold' },
  disabledItem: { color: '#999' },
  confirmButton: { 
    backgroundColor: '#0D47A1', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 20 
  },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  cancelButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  batsmenContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  batsmanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  batsmanLabel: {
    fontWeight: 'bold',
    width: 100
  },
  batsmanName: {
    flex: 1
  },
  batsmanStats: {
    width: 80,
    textAlign: 'right'
  },
  overProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  ballDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 3
  },
  ballBowled: {
    backgroundColor: '#0D47A1'
  },
  overText: {
    marginLeft: 10,
    fontWeight: 'bold'
  }
});