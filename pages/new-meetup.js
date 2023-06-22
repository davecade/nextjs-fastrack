import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetup = () => {
	// This is where we are sending api request
	const router = useRouter();

	const addMeetupHandler = async (enteredMetupData) => {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMetupData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		console.log("DATA PUT IN DB > ", data);

		// navigating back to main page
		router.push("/");
	};
	return (
		<>
			<Head>
				<title>Add a New Meetup</title>
				<meta name="description" content="Add your own meetups and create amazing networking opportunities." />
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);
};

export default NewMeetup;
