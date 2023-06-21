import MeetupList from "../components/meetups/MeetupList";
import React from "react";

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
	return {
		props: {
			meetups: DUMMY_MEETUPS,
		},
	}; // You ALWAYS need to return an object, even an empty one
};

export default HomePage;
