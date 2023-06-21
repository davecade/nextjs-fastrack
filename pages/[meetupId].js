import React from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";

const MeetupDetails = () => {
	return (
		<MeetupDetail
			image={
				"https://wallpapers.com/images/featured/td7gsxerv3ecl20h.jpg"
			}
			titile={"First meetup"}
			address={"Some Street 5, Some City"}
			description={"this is the first meetup"}
		/>
	);
};

export default MeetupDetails;
