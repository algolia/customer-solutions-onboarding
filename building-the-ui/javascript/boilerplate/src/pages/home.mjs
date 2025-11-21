import carousel from "../components/carousel";

export function run() {
  console.log("home");
}

export const template = `
<div>
    ${carousel("Best offers", "/category/Best%20Offers")}
    ${carousel("Action", "/category/Action")}
    ${carousel("Horror", "/category/Horror")}
    ${carousel("Drama", "/category/Drama")}
</div>
`;
