import React, { Fragment, useState, useEffect } from "react";

const App = () => {
  const baseUrl = "https://hn.algolia.com/api/v1/search?query=";

  let seqeunceId = 0;
  let lastId = 0;

  const [query, setQuery] = useState("redux");
  const [result, setResult] = useState({ hits: [] });

  const getData = (url, delay) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const resJson = await fetch(url).then((res) => res.json());
        setResult(resJson);
        resolve(`${resJson} result`);
      }, delay);
    });
  };

  useEffect(() => {
    const fetchData = async (keyword) => {
      const curId = ++seqeunceId;
      const delay = 500;
      const result = await getData(baseUrl + keyword, delay);

      if (curId > lastId) {
        lastId = curId;
      } else {
        console.log(`discard ${result}`);
      }
    };

    fetchData(query);
  }, [query]);

  return (
    <Fragment>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {result.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default App;
