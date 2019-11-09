import fetch from "isomorphic-unfetch";
import Error from "next/error";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";
import Link from "next/link";

class Index extends React.Component {
  componentDidMount() {
    // to register service worker
    if ("serviceworker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log(
            "-----service worker registration successful",
            registration
          );
        })
        .catch(err => {
          console.warn("---service worker registration failed", err.message);
        });
    }
  }
  render() {
    const { stories, page } = this.props;
    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }
    return (
      <Layout
        title="Hacker news"
        description="A Hacker news clone made with Next.js"
      >
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: tomato;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    );
  }
}

Index.getInitialProps = async ({ req, res, query }) => {
  let stories;
  let page;
  try {
    page = Number(query.page) || 1;
    const res = await fetch(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    );
    stories = await res.json();
  } catch (err) {
    console.log(err);
    stories = [];
  }

  return { stories, page };
};
export default Index;
