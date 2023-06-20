import Layout from "../components/layout/Layout";
import "../styles/globals.scss";

// This is your root component
// Everytime we switch a page, the page component gets sent here
// Then the myApp component renders the page
// So here we can wrap our layout component
// This layout component will now show on every page
// This is good for when you need to render a navigation bar on every page

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
