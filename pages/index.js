import MeetupList from "../components/meetups/MeetupList";
import React from "react";
import { MongoClient } from "mongodb";

const DUMMY_MEETUPS = [
	{
		id: "m1",
		title: "",
		image: "https://wallpapers.com/images/featured/td7gsxerv3ecl20h.jpg",
		address: "Some address 5, 1234 Some City",
		description: "this is a first meetup!",
	},
	{
		id: "m2",
		title: "",
		image: "https://wallpaperaccess.com/full/4675254.jpg",
		address: "Some address 5, 1234 Enlil City",
		description: "this is a second meetup!",
	},
	{
		id: "m3",
		title: "",
		image: "https://wallpaperaccess.com/full/4675272.jpg",
		address: "Some address 5, 1234 Anu City",
		description: "this is a third meetup!",
	},
];

const HomePage = ({ meetups }) => {
	return <MeetupList meetups={meetups} />;
};

// ** DO THIS FOR STATIC GENERATION **
// getStaticProps()
// This can only be used in page files, no where else.
// We use this if we need add data to this component.
// getStaticProps can only work in page files
// This is a reserved name. Next looks for this name if it exists,
// and if it finds it, it will execute this FIRST before your page component
// getStaticProps job is to prepare the props for the page component (in this case Homepage)
// So it can be used instead of useEffect for fetching API
// it will first run getStaticProps, waits for the async to complete, then pass it in to HoemPage
// then after data is passed to homepage, it will render the homepage
// This code is executed during build process. Not on the Server or Client side.
// It will never execute on the browser.
// All the data will now be pre-rendered, and the data will fetched first
// No need for useEffect anymore!

export const getStaticProps = async () => {
	// can fetch data from an API
	// You ALWAYS need to return an object, even an empty one

	//** Pros / Cons  */
	// Use this most of the time, especially if you dont expect any data to change all the time
	// The server will pre-generate an HTML file, and it can be stored and served by a CDN
	// this will make it faster than pre-generating and fetching the data for every incoming request

	//** Revalidate
	// This allows incremental static generation
	// Below we have 10 for 10 seconds. This means that every 10 seconds
	// it will regenerate the page for an incoming request
	// so basically this means this page will not just be generated during build process
	// but it will also be generated every few seconds on the server at least if
	// there are requests for this page. So here it would be regenerated every 10 seconds
	// so if your data changes after deployment, it will be regenerated on the server
	// you dont need to redeploy and rebuild again

	//** API */
	// This code will only be on our server or during build time. Never client.
	// So instead of fetching our own api again while in the backend, we can just
	// directly call the database from here
	const myMongoString = process.env.MY_DB;

	const client = await MongoClient.connect(myMongoString);

	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(), // We need to turn the ObjectID into a String ID
			})),
		},
		revalidate: 10, // number of seconds nextjs will wait until it regenerates the page for an incoming request
	};
};

// export const getServerSideProps = async (context) => {
// 	// can fetch data from an API

// 	//** context */
// 	// You can use context for this context also in getStaticProps
// 	// but our example we will use it here
//     // You can access req and res here
//     // you dont have access to req and res in getStaticProps
// 	const req = context.req;
// 	const res = context.res;

// 	//** getServerSideProps */
// 	// This does not run during the build process, but instead always on the server
// 	// after deployment
// 	// We still return props like getStatusProps, but cannot use revalidate
// 	// The reason is because this will get run for every request anyway, so theres no point

//     //** Pros / Cons  */
//     // This might sound better because ts guaranteed to run for every request
//     // However this can be disadvantage because it'll mean that you'll have to
//     // wait for your page to be generated every incoming request.
//     // You will have to wait for the fetch call to finish whenever you have data.
//     // You should use this when your data changes all the time, meaning multiple
//     // time per second, and even revalidate wont help
//     // If data does not change multiple times, then getStaticProps is better
//     // Especially if you dont need access to req and res objects

// 	return {
// 		props: {
//             meetups: DUMMY_MEETUPS
//         },
// 	};
// };

export default HomePage;
