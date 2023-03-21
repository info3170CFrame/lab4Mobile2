import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Image } from "react-native";
import entities from "./entities";
import Physics from "./Physics";
import { useEffect, useState } from "react";
import Constants from "./Constants";
import Images from "./Images";

export default function App() {
	const [running, setRunning] = useState(false);
	useEffect(() => {
		setRunning(true);
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={Images.Background}
				style={styles.backgroundImage}
				resizeMode='stretch'
			/>
			<GameEngine
				systems={[Physics]}
				entities={entities()}
				running={running}
				style={styles.gameContainer}
			>
				{
					<StatusBar
						style='auto'
						hidden={true}
					/>
				}
			</GameEngine>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	gameContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	backgroundImage: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT,
	},
});
