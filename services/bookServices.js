import { normalizeString } from "../helpers/generalHelper.js";
export const getBooks = async () => {
  try {
    const response = await fetch('./books.json');
    if (!response.ok) {
      throw new Error("can't get the results: " + response.status);
    }
    const data = await response.json();
    return data.library.map(e=>e.book);
  } catch (error) {
    console.error("unable to fetch data:", error);
    return null; // or handle the error as needed
  }
};
export const getSpecsList = (list) => {
  
  let specs = {authors:[], genres:[],years:[]};
  list?.forEach( e => {
    if(!specs.authors.includes(e.author.name)){
      specs.authors.push(e.author.name)
    }
    if(!specs.genres.includes(e.genre)){
      specs.genres.push(e.genre)
    }
    if(!specs.years.includes(e.year)){
      specs.years.push(e.year)
    }
  });
  return specs
}
export const filterList = (list, parameter) => {
  return list.filter(e => {
    return Object.keys(parameter).every(key => {
      if (parameter[key] === null || parameter[key] === undefined || parameter[key] === '') {
        return true;
      }
      if (key == "author"){
        return parameter[key] == e[key].name;
      }
      if (key == "search"){
        return normalizeString(e.author.name).includes(normalizeString(parameter[key]))  ||
               normalizeString(e.year).includes(normalizeString(parameter[key]))  ||
               normalizeString(e.title).includes(normalizeString(parameter[key]))  ||
               normalizeString(e.genre).includes(normalizeString(parameter[key]));
      }
      return parameter[key] == e[key];
    });
  });
};
