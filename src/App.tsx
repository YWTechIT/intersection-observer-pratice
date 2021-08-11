/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Comments } from "./types";
import axios from "axios";

const App = () => {
  const [data, setData] = useState<Comments[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [currentPostId, setCurrentPostId] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const getPosts = useCallback(
    async (currentPostId: number) => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${currentPostId}`
        );

        setData([...data, ...response.data]);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    },
    [data]
  );

  useEffect(() => {
    getPosts(currentPostId);
  }, []);

  useEffect(() => {
    setLoading(true);
    const io = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && loadMoreRef.current) {
          setCurrentPostId((currentPostId) => currentPostId + 1);
          getPosts(currentPostId);
        }
      });
    });

    const el = loadMoreRef && loadMoreRef.current;

    if (!el) {
      return;
    }

    io.observe(el);

    return () => {
      io.unobserve(el);
      setLoading(false);
    };
  }, [getPosts]);

  return (
    <div>
      {data &&
        data.map((item) => (
          <div className="wrapper" key={item.id}>
            <section className="card">
              <div>
                {item.id}, {item.body}
              </div>
            </section>
          </div>
        ))}
      <div ref={loadMoreRef}></div>
      {loading && <div>loading...</div>}
    </div>
  );
};

export default App;
