// import url from "./URL";

//flatten
export function faltternProducts(data) {
  return data.map((item) => {
    //cloudinary
    let image = (item.image[0] && item.image[0].url) || null;

    //local
    // let image = `${url}${item.image[0].url}`;

    return { ...item, image };
  });
}
// filter the item.featured or not
export function featuredProducts(data) {
  return data.filter((item) => item.featured === true);
}

//pagination
export function pagination(data) {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(data.length / itemsPerPage);
  //splice will mutate data
  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //delete index of the array of itemsPerpage = 4
  //   return data.splice(0, itemsPerPage);
  // });
  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    //every array index start 0,4,8,9,...
    const start = index * itemsPerPage;

    return data.slice(start, start + itemsPerPage);
  });

  return newProducts;
}
