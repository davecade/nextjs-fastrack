import React from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = ({ meetupData }) => {
	const { image, title, address, description } = meetupData;

	return (
		<MeetupDetail
			image={image}
			title={title}
			address={address}
			description={description}
		/>
	);
};

//** getStaticPaths */
// getStaticPaths is a function that you also NEED to export in a page component file
// if its a dynamic page AND you're using getStaticProps
// So currently this [meetupId].js is a dynamic page
// and we are also using getStaticProps
export const getStaticPaths = async () => {
	// Why do we use this?
	// when using getStaticProps, a page is pre-generated during the build process
	// this means that nextjs need to pre-generate ALL versions of this dynamic page in advance
	// So for all the id's that will possibly be passed, it needs to pregenerate a page for
	// each of those
	// SO below we have to make sure ti add each and every id we have
	// in reality we would not hard code this, we would instead fetch it
	// from a database or api, and generate the array dynamically
	// for now we will hard code

	const myMongoString = process.env.MY_DB;

	const client = await MongoClient.connect(myMongoString);

	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	// The second arguement to the find, we pass in an object,
	// This object we can tell which fields you want to return
	// in the return item. Similar to graphQL
	const meetups = await meetupsCollection
		.find(
			{},
			{
				_id: 1,
			}
		)
		.toArray();

	client.close();

	return {
		// The fallback is true or false
		// It tells nextjs if the paths array has ALL the possible dynamic ids
		// if it does, then you need to set it to false
		// if it doesnt have all possible values, then you need to set to true
		// If it is set to true, nextjs will try to dynamically generate the
		// page using the id passed in if it doesnt find it in the array
		// So you can decide if you only want to add some or all in the array
		// its good if you want to pass in the ones that are more common
		// and leave the rest out
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
};

// here getStaticProps is better than getServerSideProps
// the data doesnt change every second
export const getStaticProps = async (context) => {
	// Remember previously we used the useRouter to access the params in the component
	// You cannot use that in getStaticProps. Only the component itself.
	// So how do we get access to the url params?
	// Well in getStaticProps we have access to "context"
	// "context" has access to the params
	const meetupId = context.params.meetupId;

	// Notice when we console.log it doesnt show on the client side (browser)
	// the log will show on the terminal, because this is getting generated via
	// the server
	const myMongoString = process.env.MY_DB;

	const client = await MongoClient.connect(myMongoString);

	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetup = await meetupsCollection.findOne({
		_id: new ObjectId(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				id: meetup._id.toString(),
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				description: meetup.description,
			},
		},
	};
};

export default MeetupDetails;
