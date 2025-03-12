import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function YouthEngagement({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Youth Engagement</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require('../assets/Youth.png')} // Add a youth cricket-related image
            style={styles.heroImage}
          />
          <Text style={styles.heroText}>
            Empowering the next generation of cricketers!
          </Text>
        </View>

        {/* Cricket Stories Section */}
        <View style={styles.storiesSection}>
          <Text style={styles.sectionTitle}>Learn from the Best</Text>
          <View style={styles.storyCard}>
             <Image
              source={require('../assets/Imran.png')} // Add an image of Imran Khan
               style={styles.storyImage}/>
               <Text style={styles.storyTitle}>Imran Khan: The Inspirational Leader</Text>
               <Text style={styles.storyText}> Imran Khan, a legendary all-rounder and Pakistan's World Cup-winning captain, was known for his charismatic leadership and exceptional cricketing skills.His ability to inspire his team and perform under pressure cemented his legacy as one of cricket’s greats.
               </Text>
               <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
                 </TouchableOpacity>
                 </View>
          {/* Babar Azam Story */}
          <View style={styles.storyCard}>
            <Image
              source={require('../assets/Baber.png')} // Add Babar Azam's image
              style={styles.storyImage}
            />
            <Text style={styles.storyTitle}>Babar Azam: The Run Machine</Text>
            <Text style={styles.storyText}>
              Babar Azam, the captain of the Pakistan cricket team, is known for his elegant batting and consistency. 
              He started playing cricket at a young age and worked hard to become one of the best batsmen in the world. 
              His dedication and focus are an inspiration to young players.
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>

          {/* Virat Kohli Story */}
          <View style={styles.storyCard}>
            <Image
            source={require('../assets/Virat.png')} // Add a youth cricket-related image
            style={styles.storyImage}
            />
            <Text style={styles.storyTitle}>Virat Kohli: The Chase Master</Text>
            <Text style={styles.storyText}>
              Virat Kohli, the former captain of the Indian cricket team, is known for his aggressive batting and fitness. 
              He transformed himself from a talented youngster to one of the greatest batsmen of all time. 
              His work ethic and passion for the game are lessons for every aspiring cricketer.
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>

          {/* Ellyse Perry Story */}
          <View style={styles.storyCard}>
            <Image
            source={require('../assets/Ellyse.png')} // Add a youth cricket-related image
            style={styles.storyImage}
            />
            <Text style={styles.storyTitle}>Ellyse Perry: The All-Rounder</Text>
            <Text style={styles.storyText}>
              Ellyse Perry, the Australian cricket star, is one of the most successful female cricketers in history. 
              She excels in both batting and bowling and has been a role model for young girls aspiring to play cricket. 
              Her determination and versatility are truly inspiring.
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>

          {/* Sachin Tendulkar Story */}
          <View style={styles.storyCard}>
            <Image
            source={require('../assets/Sachin.png')} // Add a youth cricket-related image
            style={styles.storyImage}
            />
            <Text style={styles.storyTitle}>Sachin Tendulkar: The Master Blaster</Text>
            <Text style={styles.storyText}>
              Sachin Tendulkar, often referred to as the "God of Cricket," is one of the greatest batsmen in the history of the sport. 
              His career spanned 24 years, during which he broke numerous records and inspired millions of young cricketers worldwide.
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>

          

        </View>

        {/* Call to Action Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaText}>
            Join the cricket revolution today and take your first step towards becoming a star player!
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('JoinClub')}
          >
            <Text style={styles.ctaButtonText}>Join a Club</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  heroSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  heroText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  storiesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 15,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  storyImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  storyText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  readMoreButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  readMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ctaSection: {
    backgroundColor: '#0D47A1',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#0D47A1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});