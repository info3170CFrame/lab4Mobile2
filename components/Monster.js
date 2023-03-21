import Matter from "matter-js";
import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import SpriteSheet from "rn-sprite-sheet";

// #1 rigid body for the monster, using the monster.png spritesheet
const Monster = (props) => {
	let monster = null;

	const width = props.size.width;
	const height = props.size.height;

	// #1 position it on the bottom half of the screen
	const xPos = props.body.position.x - width / 2;
	const yPos = props.body.position.y - height / 2;

	let initiateObj = () => {
		monsterI = monster;
		monster.play({
			type: "appear",
			onFinish: () => {
				setTimeout(() => {
					monsterI.play({
						type: "walk",
						loop: true,
					});
				}, 1000);
			},
		});
	};

	let startAnimate = (type) => {
		monsterA = monster;

		monsterA.play({
			type: type,
			fps: 24,
			loop: true,
		});

		if (type === "walk") {
			Matter.Body.setPosition(props.body, {
				x: props.body.position.x + 16,
				y: props.body.position.y,
			});

			Matter.Body.applyForce(props.body, props.body.position, {
				x: 0.05,
				y: -0.2,
			});
		}
	};

	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: "blue",
				borderStyle: "solid",
				position: "absolute",
				left: xPos,
				top: yPos,
				width: width,
				height: height,
				display: props.animOptions.visibility,
			}}
		>
			<SpriteSheet
				ref={(ref) => (monster = ref)}
				source={require("../assets/mummy.png")}
				columns={9}
				rows={6}
				height={height} // set either, none, but not both
				//width={width}
				onLoad={() => initiateObj()} //start action on loading the spritesheet; uncomment this if you want a default animation
				imageStyle={{ marginTop: 0 }}
				animations={{
					walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
					appear: Array.from({ length: 15 }, (v, i) => i + 18),
					die: Array.from({ length: 21 }, (v, i) => i + 33),
				}}
			/>
			<TouchableWithoutFeedback
				onPress={() => startAnimate("walk")}
				style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
			>
				<View
					style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
				/>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default (world, color, pos, size, extraOptions, animOptions) => {
	const theMonster = Matter.Bodies.rectangle(
		pos.x,
		pos.y,
		size.width,
		size.height,
		{
			label: "Monster",
			restitution: extraOptions.restitution,
			frictionAir: extraOptions.frictionAir,
		}
	);
	Matter.World.add(world, theMonster);
	return {
		body: theMonster,
		color,
		pos,
		size,
		extraOptions,
		animOptions,
		renderer: <Monster />,
	};
};
