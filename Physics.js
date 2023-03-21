import Matter, { Sleeping } from "matter-js";

const Physics = (entities, { touches, time }) => {
	let engine = entities.physics.engine;

	// when the monster is pressed he jumps
	touches
		.filter((t) => t.type === "press")
		.forEach((t) => {
			// if (entities.MonsterA.animOptions.animType === "walk") {
			// 	Matter.Body.applyForce(
			// 		entities.MonsterA.body,
			// 		entities.MonsterA.body.position,
			// 		{
			// 			x: 0,
			// 			y: -0.05,
			// 		}
			// 	);
			// }
			// Matter.Body.setVelocity(entities.MonsterA.body, {
			// 	x: entities.MonsterA.body.velocity.x,
			// 	y: -10,
			// });
			Sleeping.set(entities.MonsterA.body, true);
		});
	entities.MonsterA.animOptions.animType = "walk";

	Matter.Engine.update(engine, time.delta);

	return entities;
};

export default Physics;
