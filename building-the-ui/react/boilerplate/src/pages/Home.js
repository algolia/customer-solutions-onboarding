import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Carousel title="Best Offers" category="Best Offers" />
      <Carousel title="Horror" category="Horror" />
      <Carousel title="Action" category="Action" />
      <Carousel title="Drama" category="Drama" />
    </div>
  );
}
