//jshint esversion: 9
import React, { useState, useEffect } from "react";
import "./App.css";
import isImageUrl from "is-image-url";
import Post from "./Card";

function Reddit() {
  //Fetch any subreddit
  const [typedName, setTypedName] = useState("");
  const [subreddit, setSubreddit] = useState("react");

  const getSubreddit = () => {
    setSubreddit(typedName);
    setTypedName("");
  };
  //Fetch posts from subreddit and store them in state
  const [posts, setPosts] = useState([]);

  //useEffect is used to store the returned posts in state
  //the second array argument is there to prevent infinite requests.
  useEffect(() => {
    //use fetch to get data from API and destructure it
    getPosts();
    async function getPosts() {
      try {
        const response = await fetch(
          `https://www.reddit.com/r/${subreddit}.json`
        );
        const { data } = await response.json();
        const { children } = data;
        const posts = children.map((child) => child.data);
        //The returned array has the data that we need to display.
        setPosts(posts);
      } catch (err) {
        console.log(err);
      }
    }
  }, [subreddit]);

  return (
    <div>
      <nav className="navbar mb-2 navbar-expand-lg navbar-light bg-light">
        <h1 className="container">{subreddit}</h1>
      </nav>
      <input
        type="text"
        onChange={(event) => setTypedName(event.target.value)}
        placeholder="Enter Subreddit"
        className="form-control w-50"
        value={typedName}
      />
      <button onClick={getSubreddit} className="btn m-3 btn-secondary">
        Get Subreddit
      </button>

      <div className="container">
        <h1 className="m-5 text-md-right">/r/{subreddit}</h1>
        <div className="row">
          {posts.map((post, index) => (
            <div className="col col-12 col-md-6 col-lg-4 mb-4">
              <Post
                title={post.title}
                //check if url links to an image or not
                image={isImageUrl(`${post.url}`) ? post.url : null}
                text={post.selftext}
                author={post.author}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function App() {
  return (
    <div className="App">
      <Reddit />
    </div>
  );
}
