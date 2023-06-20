// **The route for this will be:
// our-domain.com/news/something-important

// **Dynamic Routing:
// Notice that the file name is [newsId].js, so this means this component will
// be rendered for whatever variable is passed after /news
// so "our-domain.com/news/1" would be an example
// Then this Details Page will be shown

// **Extracting the dynamic variable "newsId"
// we just use the useRouter hook below
// Then we access the newsId by doing router.query
// So now you can access the query param in the url like this

import { useRouter } from "next/router";

const DetailsPage = () => {
    const router = useRouter();
    const newsId = router.query.newsId

    return <div>The Details Page</div>;
};

export default DetailsPage;
