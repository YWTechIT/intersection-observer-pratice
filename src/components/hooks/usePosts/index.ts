import axios from "axios";
import { useEffect, useState } from "react";
import { Comments } from "../../../types";

interface UsePostsType {
  data?: Comments[];
  loading: boolean;
  error?: Error;
  currentId: number;
}

const usePosts = (): UsePostsType => {
  const [data, setData] = useState<Comments[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [currentId, setCurrentId] = useState(1);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${currentId}`
      );
      setData(response.data);
      setLoading(false)
    };
    getPosts();
    setCurrentId(currentId+1);
  }, []);

  return { data, loading, error, currentId };
};

export default usePosts;
