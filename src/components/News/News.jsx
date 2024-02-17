import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import styles from "../styles/styles";
const News = () => {
  const [data, setData] = useState([]); //a06fc73994f44de69a833a5d27151168

  const apiKey = "a06fc73994f44de69a833a5d27151168";
  const apiUrl = "https://newsapi.org/v2/top-headlines";
  const pageSize = 30;
  const countries = ["us", "uk", "ca", "au", "in"];

  const getSportsNews = async () => {
    try {
      let allSportsNews = [];

      for (let country of countries) {
        const response = await axios.get(apiUrl, {
          params: {
            apiKey,
            country,
            category: "sports",
            pageSize,
          },
        });

        const sportsNews = response.data.articles.filter(
          (article) => article.urlToImage !== null
        );

        allSportsNews = allSportsNews.concat(sportsNews);
      }

      setData(allSportsNews);
    } catch (error) {
      console.error("Error fetching sports news:", error.message);
    }
  };

  useEffect(() => {
    getSportsNews();
  }, []);

  const datas = data.slice(12, 18);

  return (
    <React.Fragment>
      <div className={`${styles.section} mt-10`}>
        <h2 className={`${styles.heading}`}>Latest News</h2>
        <div className="grid 800px:grid-cols-3 grid-cols-1 gap-4">
          {datas &&
            datas.map((data) => {
              return (
                <div className=" bg-white shadow-md" key={data.content}>
                  <div className="w-full h-64">
                    <img
                      src={data.urlToImage}
                      className="object-cover w-full h-full rounded-[4px]"
                      alt=""
                    />
                  </div>
                  <a href={data.url} target="_blank" rel="noopener noreferrer">
                    <div className="p-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[14px] text-red-800 font-[600] font-Poppins">
                          {data.author}
                        </h4>
                        <h4 className="text-[12px] font-Poppins">
                          {data.publishedAt.slice(0, 10)}
                        </h4>
                      </div>
                      <div className="pt-2">
                        <p className="text-[14px] leading-7 tracking-wider text-gray-500">
                          {data.description.slice(0, 200)}...
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default News;
