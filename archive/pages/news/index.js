// The route for this will be:
// our-domain.com/news
// Since the file name is index.js, it will be the default file servered up

// ** Navigation
// Maybe we want to display a list of news items that are clickable
// Use the Link component given by Next

import { Fragment } from "react";
import Link from "next/link";

const NewsPage = () => {
    return (
        <Fragment>
            <h1>The News Page</h1>
            <ul>
                <li>
                    <Link href="/news/1">NextJS Is A Great Framework</Link>
                </li>
                <li>Something else</li>
            </ul>
        </Fragment>
    );
};

export default NewsPage;
