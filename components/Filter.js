import { filterList } from "../services/bookServices.js";
import { plotCounters } from "./generalComponents.js";


export default class Filter {
  constructor(blp) {
    this.blp = blp;
  }

  plotFilterOptions(fatherElement, lists,formData) {
    const father = document.getElementById(fatherElement);
    let content = `<div class="explore_books_section">
      <h2>Explore Books</h2>
      <form id='headerFilter'>`;

    if (lists.genres.length > 0) {
      content += "<select class='filter_cta' name='genre'><option value=''>genre</option>" +
        lists.genres.map(genre => `<option value="${genre}">${genre}</option>`).join("") + 
        "</select>";
    }

    if (lists.years.length > 0) {
      content += "<select class='filter_cta' name='year'><option value=''>year</option>" +
        lists.years.map(year => `<option value="${year}">${year}</option>`).join("") + 
        "</select>";
    }

    if (lists.authors.length > 0) {
      content += "<select class='filter_cta' name='author'><option value=''>author</option>" +
        lists.authors.map(author => `<option value="${author}">${author}</option>`).join("") + 
        "</select>";
    }          

    content += "<input class='filter_cta' type='text' name='search' placeholder='Search'/>";
    content += "<input type='submit' class='filter_cta cta'/>";
    content += `<input type='reset' id='resetButton' class='filter_cta cta reset' value='Reset'/>`;

    content += "</form>"
    content += "<div id='counter_section'/>"
    
    content +="</div>";
    father.innerHTML = content;

    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
      this.reset();
    });

    const filterForm = document.getElementById('headerFilter');
    filterForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(filterForm);
      const formEntries = Object.fromEntries(formData.entries());
      this.blp.displayingBooks = filterList(this.blp.originalBookList,formEntries);
      this.blp.plot("book_list_section");
      plotCounters(this.blp.summaryCalculation());
      
    });
    plotCounters(this.blp.summaryCalculation());
  }
  reset(){
    this.blp.displayingBooks = this.blp.originalBookList;
    this.blp.plot("book_list_section");
    plotCounters(this.blp.summaryCalculation());
  }

}
