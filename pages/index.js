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

const HomePage = () => {
    return <MeetupList meetups={DUMMY_MEETUPS} />;
};

export default HomePage;
