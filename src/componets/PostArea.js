import Post from "./Post";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

function PostArea({ group, trigger, setTrigger }) {
  const { userData,theme } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };

        const response = await axios.get(
          `https://sogoapi.onrender.com/group/${group.id}/posts/`,
          config
        );
        const data = response.data.posts;

        // Update the image value for each post
        const postsData = await Promise.all(
          data.map(async (post) => {
            if (post.image) {
              const imageUrl = await getImageFileForPostImage(post.image);
              const imageUrl2 = await getImageFileFromImages(
                post.owner.profile.image
              );
              return {
                ...post,
                image: imageUrl,
                owner: {
                  ...post.owner,
                  profile: { ...post.owner.profile, image: imageUrl2 },
                },
              };
            } else {
              const imageUrl2 = await getImageFileFromImages(
                post.owner.profile.image
              );
              return {
                ...post,
                owner: {
                  ...post.owner,
                  profile: { ...post.owner.profile, image: imageUrl2 },
                },
              };
            }
          })
        );
        // console.log(postsData);
        const updatedPostsData = postsData.reverse().map((post, index) => {
          return (
            <Post
              key={index}
              image={post.image}
              owner={post.owner}
              text={post.text}
              id={post.id}
              setTrigger={setTrigger}
            />
          );
        });
        setPosts(updatedPostsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    const token = localStorage.getItem("token");
    if (token) {
      fetchPosts();
    } else {
      window.location.href = "/login";
    }
  }, [group, trigger]);
  return <>{posts}</>;
}

export default PostArea;

const getImageFileForPostImage = (filename) => {
  const newFilePath = filename.replace("/postsImages/", "");
  const url = `https://sogoapi.onrender.com/group/image/posts/${newFilePath}/`;
  const token = localStorage.getItem("token");

  return axios({
    url: url,
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob", // Specify that the response should be treated as a binary blob
  })
    .then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getImageFileFromImages = (filename) => {
  const newFilePath = filename.replace("/images/", "");
  const url = `https://sogoapi.onrender.com/group/image/${newFilePath}/`;
  const token = localStorage.getItem("token");

  return axios({
    url: url,
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
    responseType: "blob", // Specify that the response should be treated as a binary blob
  })
    .then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
