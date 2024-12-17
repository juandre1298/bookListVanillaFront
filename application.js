import {getBooks, getSpecsList} from "./services/bookServices.js";
import BLP from "./components/BLP.js";
import Browser from "./components/Browser.js";
import Filter from "./components/Filter.js";


document.addEventListener('DOMContentLoaded', async ()=>{

  let books = [];
  if (localStorage.getItem("originalBookList")){
    books =  JSON.parse(localStorage.getItem("originalBookList"))
  }else{
    books = await getBooks();
    localStorage.setItem("originalBookList", JSON.stringify(books))
  }
  let specsList = getSpecsList(books);
  
  let displayingBooks = []; 
  if (localStorage.getItem("displayingBooks")){
    displayingBooks =  JSON.parse(localStorage.getItem("displayingBooks"))
  }else{
    displayingBooks = [...books];
    localStorage.setItem("displayingBooks", JSON.stringify(displayingBooks))
  }
  
  let readingList = [];
  if (localStorage.getItem("readingList")){
    readingList =  JSON.parse(localStorage.getItem("readingList"))
  }else{
    readingList = [];
    localStorage.setItem("readingList", JSON.stringify(readingList))
  }

  const blpSection = new BLP(books, displayingBooks, readingList);
  blpSection.plot("book_list_section")
  new Filter(blpSection).plotFilterOptions("filter_container",specsList);
  // checks the local storage to find changes
  setInterval(function() {
    if(JSON.stringify(blpSection.originalBookList) !== localStorage.getItem("originalBookList")){
      blpSection.originalBookList = JSON.parse(localStorage.getItem("originalBookList"));
      blpSection.plot("book_list_section")
    }
    if(JSON.stringify(blpSection.displayingBooks) !== localStorage.getItem("displayingBooks")){
      blpSection.displayingBooks = JSON.parse(localStorage.getItem("displayingBooks"));
      blpSection.plot("book_list_section")
    }
    if(JSON.stringify(blpSection.readingList) !== localStorage.getItem("readingList")){
      blpSection.readingList = JSON.parse(localStorage.getItem("readingList"));
      blpSection.plot("book_list_section")
    }
  }, 2000);
})
