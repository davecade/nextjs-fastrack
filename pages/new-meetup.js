import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetup = () => {
    const addMeetupHandler = (enteredMetupData) => {
        console.log("enetered > ", enteredMetupData);
    };
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
