import classes from "./MeetupDetail.module.scss";

const MeetupDetail = ({ image, titile, address, description }) => {
	return (
		<section className={classes.detail}>
			<img src={image} alt="" />
			<h1>{titile}</h1>
			<address>{address}</address>
			<p>{description}</p>
		</section>
	);
};

export default MeetupDetail;
