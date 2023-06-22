// /api/new-meetup
// Here is where you need to create your apis
// in pages folder, in api folder. next will check this api folder
// works similar an express server

//** MongoDB */
// Remember to npm i mongodb
// import MongoClient
// Then get your string from mongo Atlas and add it here
// Remember that here in this api file, this will never
// end up on the client side. So this connection string should
// be secure and will not be able to be accessed by users

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const data = req.body;

		// const { title, image, address, description } = data.body;

        const myMongoString = process.env.MY_DB;

		const client = MongoClient.connect(myMongoString);

		const db = client.db;

		const meetupsCollection = db.collection("meetups");

		const result = await meetupsCollection.insertOne(data);

		console.log(result);

		(await client).close();

		res.status(201).json({ message: "meetup inserted" });
	}
};

export default handler;
