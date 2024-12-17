export default class Browser {
  constructor (){
  }

  plot(fatherElement, list){
    const father = document.getElementById(fatherElement);
    const content = `<aside>
                      <form>
                        <h3>Browse</h3>
                        <input type="text" id="fsearch" name="fsearch">
                        <select id="genre" name="genre">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                        <select id="author" name="genre">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                      </form>
                      
                    </aside>`
    father.innerHTML = content;
  }
}