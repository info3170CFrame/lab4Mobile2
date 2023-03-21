import Matter from "matter-js";
import { Dimensions } from "react-native";
import Monster from "../components/Monster";
import Candle from "../components/Candle";
import Edges from "../components/Edges";
import Constants from "../Constants";

export default (gameWorld) => {
	let engine = Matter.Engine.create({ enableSleeping: false });
	let world = engine.world;
	engine.gravity.y = 0.07;

	let screenWidth = Dimensions.get("window").width;
	let screenHeight = Dimensions.get("window").height;

	return {
		physics: { engine, world },
		Square: Candle(
			world,
			"blue",
			{ x: 30, y: Constants.SCREEN_HEIGHT - 104 },
			{ height: 50, width: 30 },
			{ label: "CandleL" }
		),
		Candle: Candle(
			world,
			"blue",
			{ x: Constants.SCREEN_WIDTH - 30, y: Constants.SCREEN_HEIGHT - 104 },
			{ height: 50, width: 30 },
			{ label: "CandleR" }
		),
		MonsterA: Monster(
			world,
			"blue",
			{ x: 107, y: Constants.SCREEN_HEIGHT - 130 },
			{ height: 78, width: 50 },
			{ label: "Monster", restitution: 0.1, frictionAir: 0.2 },
			{ animType: "appear" }
		),

		TopEdge: Edges(
			world,
			"red",
			{ x: screenWidth / 2, y: 0 },
			{ height: 30, width: screenWidth }
		),
		LeftEdge: Edges(
			world,
			"red",
			{ x: 0, y: screenHeight / 2 },
			{ height: screenHeight, width: 30 }
		),
		RightEdge: Edges(
			world,
			"red",
			{ x: screenWidth, y: screenHeight / 2 },
			{ height: screenHeight, width: 30 }
		),
		BottomEdge: Edges(
			world,
			"red",
			{ x: screenWidth / 2, y: screenHeight },
			{ height: 30, width: screenWidth }
		),
	};
};
