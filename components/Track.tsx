import { Image, StyleSheet, Text, View } from "react-native";

type TrackProps = {
  track: SongWeb
}

export default function Track({ track }: TrackProps) {
  return (
    <View style={styles.viewTrack}>
      <Image
        style={styles.image}
        source={{ uri: track.coverImageUrl }}
      />
      <View style={styles.info}>
        <Text style={styles.text}>{track.anime}</Text>
        <Text style={styles.text}>{`${track.artist || "Artist not found"} - ${track.title}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewTrack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    width: 220,
  },
  image: {
    height: 300,
    width: '100%'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }
});