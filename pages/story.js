import fetch from "isomorphic-unfetch";
import Router from "next/router";
import Error from "next/error";
import Layout from "../components/Layout";
import CommentList from "../components/CommentList";

const Story = ({ story }) => {
  //   console.log("--------story props returned=", story);
  if (!story) {
    return <Error statusCode={503} />;
  }
  return (
    <Layout title={story.title} backButton>
      <main>
        <h1 className="story-title">
          <a href={story.url} target="_blank">
            {story.title}
          </a>
        </h1>
        <div className="story-details">
          <p>{story.points || 0} points</p>
          <p>{story.comments_count || 0} comments</p>
          <p>{story.time_ago}</p>
        </div>
        {story.comments.length > 0 ? (
          <>
            <h3>Comments</h3>
            <CommentList comments={story.comments} />
          </>
        ) : (
          <div>No comments for this story!</div>
        )}
      </main>
      <style jsx>{`
        main {
          padding: 1em;
        }
        .story-title {
          font-size: 1.2rem;
          margin: 0;
          font-weight: 300;
          padding-bottom: 0.5em;
        }
        .story-title a {
          color: #333;
          text-decoration: none;
        }
        .story-title a:hover {
          text-decoration: underline;
        }
        .story-details {
          display: flex;
          font-size: 0.8rem;
          font-weight: bold;
          padding-bottom: 1em;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 1em;
        }
        .story-details p {
          margin-right: 1em;
        }
        .story-details a {
          color: #f60;
        }
      `}</style>
    </Layout>
  );
};

Story.getInitialProps = async ({ req, res, query }) => {
  let story;
  try {
    const storyId = query.id;
    // console.log("story props=", storyId);
    const response = await fetch(
      `https://node-hnapi.herokuapp.com/item/${storyId}`
    );
    story = await response.json();
  } catch (error) {
    story = null;
    console.log(error);
  }
  return { story };
};
export default Story;
