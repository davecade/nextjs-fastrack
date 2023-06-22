import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

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
	return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
