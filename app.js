


class RecipeCatalog{
    constructor(){
        //this.API = "https://ghibliapi.herokuapp.com/people";
        
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        this.ingredients = '';
        this.query = '';
        this.recipes = [];
        
        
        this.API_RECIP = `http://www.recipepuppy.com/api/?i=${this.ingredients}&q=${this.query}`;
        
        this.page = 1;
        this.button = null;
        this.search_1 = null;
        this.search_2 = null;
        this.content = null;
        this.loadButton = null;
        this.loader = null;
        this.info = null;

        this.UiSelectors = { 
            button: '[search-btn]',
            search_1: '[ingredients-input]',
            search_2: '[query-input]',
            content: '[data-content]',
            loadBtn: '[data-load-button]',
            loader: '[data-loader]',
            info: '[info-data]'
        }
    }
    async initializeCatalog() {
        this.button = document.querySelector(this.UiSelectors.button);
        this.search_1 = document.querySelector(this.UiSelectors.search_1);
        this.search_2 = document.querySelector(this.UiSelectors.search_2);
        this.content = document.querySelector(this.UiSelectors.content);
        this.loadButton = document.querySelector(this.UiSelectors.loadBtn);
        this.loader = document.querySelector(this.UiSelectors.loader);
        this.info = document.querySelector(this.UiSelectors.info);

        this.addEventListeners();
        
    }

    addEventListeners(){
        this.button.addEventListener('click',() =>{
            this.page = 1;
            

            //console.log(this.page);
            this.pullRecipe(this.makeurl(this.page))
        })

        this.loadButton.addEventListener('click', ()=>{
            this.page += 1;
            
            //console.log(this.page);
            this.pullRecipe(this.makeurl(this.page))

        })
    }

    makeurl(){
        this.ingredients = this.search_1.value.toLowerCase();
        this.query = this.search_2.value.toLowerCase(); 
        
        console.log(`http://www.recipepuppy.com/api/?i=${this.ingredients}&q=${this.query}&p=${this.page}`);
          
        return `http://www.recipepuppy.com/api/?i=${this.ingredients}&q=${this.query}&p=${this.page}`
           
    }
    
    async pullRecipe(url){
        
        // showing loader animation 
        //and hiding button 
        this.loader.classList.remove('hide');
        this.loadButton.classList.add('hide');
        this.info.classList.add('hide');
        
        ///parsed to json 
        const response = await fetch(this.proxyUrl+url)
        const parsedResponce = await response.json();
        //console.log(parsedResponce);

        ///take results from JSON object
        this.recipes = parsedResponce.results;
        console.log(this.recipes);
        this.createCatalog(this.recipes);
        
        ///after show all elements loder hide
        /// button shows
        this.loader.classList.add('hide');
        this.loadButton.classList.remove('hide');
        this.info.classList.remove('hide');

    }
    
    createCatalog(recipe){
        /// in content field its making for each card createRecipe function
        this.content.insertAdjacentHTML('beforeend',
        [recipe.map((card) => this.createRecipe(card)).join('')],);
        
    }
    
    
    createRecipe({title, thumbnail , href ,ingredients}){
        return `
        <article class="recipe">
            <div class="uklad_img">
            <header class="title_food">${title}</header>
            <a href="${href}" target = "_blank">
            <img class="card_img" src="${thumbnail}">
            </a>
            </div>
            <div class="ingredients">
                <ul>
                    <li> Ingredients :${ingredients}</li>
                </ul>
            </div>
        </article>
        `
    }
}


    