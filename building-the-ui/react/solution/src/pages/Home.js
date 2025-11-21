import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { algoliaClient } from "../services/algoliaClient";
import { useState, useEffect } from "react";
import config from "../config";

export default function Home() {
  const [carouselHits, setCarouselHits] = useState({
    on_sale: [],
    horror: [],
    action: [],
    drama: [],
  });

  useEffect(() => {
    algoliaClient
      .search({
        requests: [
          {
            indexName: config.moviesIndexName,
            query: "",
            hitsPerPage: 4,
            filters: 'categoryPageIdentifiers:"Best Offers"',
          },
          {
            indexName: config.moviesIndexName,
            query: "",
            hitsPerPage: 4,
            filters: "categoryPageIdentifiers:Horror",
          },
          {
            indexName: config.moviesIndexName,
            query: "",
            hitsPerPage: 4,
            filters: "categoryPageIdentifiers:Action",
          },
          {
            indexName: config.moviesIndexName,
            query: "",
            hitsPerPage: 4,
            filters: "categoryPageIdentifiers:Drama",
          },
        ],
      })
      .then((response) => {
        const results = {
          on_sale: response.results[0].hits,
          horror: response.results[1].hits,
          action: response.results[2].hits,
          drama: response.results[3].hits,
        };

        setCarouselHits(results);
      });
  }, []);

  return (
    <div>
      <Carousel
        title="Best Offers"
        category="Best Offers"
        hits={carouselHits.on_sale}
      />
      <Carousel title="Horror" category="Horror" hits={carouselHits.horror} />
      <Carousel title="Action" category="Action" hits={carouselHits.action} />
      <Carousel title="Drama" category="Drama" hits={carouselHits.drama} />
    </div>
  );
}
