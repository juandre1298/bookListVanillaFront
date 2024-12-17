import { plotCounters } from "./generalComponents.js";

export default class BLP {
  constructor (originalBookList,displayingBooks = originalBookList,readingList = []){
    
    this.originalBookList = originalBookList;
    this.displayingBooks = displayingBooks;
    this.readingList = readingList;
    
  }
  plot(fatherElement){
    const father = document.getElementById(fatherElement);
    const content = `<lu>${this.displayingBooks.map((data,i) => {
      return `<li class="bookCard" id="${data.ISBN}">
                  <h3>${data.title}</h3>
                  <img src=${data.cover} alt=${data.title}/>
                  <div class="specs_section">
                    <h4>Review</h4>
                    <span> &#11088; &#11088; &#11088; &#11088; &#11088;</span>
                    <button class="cta addToReadBtn ${this.readingList.includes(data.ISBN) && "toRead" }" id="btn_${data.ISBN}">${this.readingList.includes(data.ISBN) ? "Added" : "Add to Read" }</button>
                  </div>
              </li>`
    }).join("")}
    </ul>`
    father.innerHTML = content;
    document.querySelectorAll('.addToReadBtn').forEach(element => {
      if (element.classList.contains('toRead')) {
        element.addEventListener('click', ()=>{
          this.removeFromToReadingList(element);
        });
      } else {
        element.addEventListener('click', ()=> {
          this.addToReadingList(element);
        });
      }
    });
    
  }

  addToReadingList(e){
    const bookId = e.id.replace("btn_","");
    if (!this.readingList.includes(bookId)){
      const btnElement = document.getElementById(e.id);
      btnElement.innerText = "Added";
      btnElement.classList.add("toRead");
      btnElement.removeEventListener("click", (e)=>this.addToReadingList(e));
      btnElement.addEventListener('click', (e)=>this.removeFromToReadingList(e.target));
      this.readingList.push(bookId);
      localStorage.setItem("readingList", JSON.stringify(this.readingList))
      plotCounters(this.summaryCalculation());
    }
  }
  removeFromToReadingList(e){
    const bookId = e.id.replace("btn_","");
    if (this.readingList.includes(bookId)){      
      const btnElement = document.getElementById(e.id);
      btnElement.innerText = "Add to Read";
      btnElement.classList.remove("toRead");
      btnElement.removeEventListener("click", (e)=>this.removeFromToReadingList(e));
      btnElement.addEventListener('click', (e)=>this.addToReadingList(e.target));
      this.readingList = this.readingList.filter(e => e != bookId)
      localStorage.setItem("readingList", JSON.stringify(this.readingList))
      plotCounters(this.summaryCalculation());
    }
  }
  summaryCalculation(){ 
    return {originalBookList: this.originalBookList.length, displayingBooks: this.displayingBooks.length, readingList: this.readingList.length}
  }
}