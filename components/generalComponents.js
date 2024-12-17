export function plotCounters({originalBookList,readingList,displayingBooks}){

  const counterSection = document.getElementById("counter_section");
  
  let content = `
  <div>
    <h4>total libros:</h4>
    <span id="originalBookList">${originalBookList}</span>
  </div>
  <div>
    <h4>lista de lectura:</h4>
    <span id="readingList">${readingList}</span>
  </div>
  <div>
    <h4>seleccionados:</h4>
    <span id="bookList">${displayingBooks}</span>
  </div>
  `;
  counterSection.innerHTML = content;
}
