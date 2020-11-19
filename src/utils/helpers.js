import url from "./URL";

//flatten
export function faltternProducts(data) {
  return data.map((item) => {
    //cloudinary
    let image = item.image[0].url;

    //local
    // let image = `${url}${item.image[0].url}`;

    return { ...item, image };
  });
}
// helper functions
export function featuredProducts(data) {
  return data.filter((item) => item.featured === true);
}
