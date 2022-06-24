export default class Tabs {
    constructor(itemSelector, containerSelector, clickHandler){
        this._tabs = Array.from(document.querySelectorAll(itemSelector));
        this._tabsContainer = Array.from(document.querySelectorAll(containerSelector));
        this._clickHandler = clickHandler;
    }

    setListeners(){
        this._tabs.forEach(tab => {
            tab.addEventListener('click', (event) =>{
                event.preventDefault();
                this.changeTab(event.target);
            })
        }) 
    }

    changeTab(tab){

        const neededTabContent = this._tabsContainer.find(item => item.id === tab.id)
        console.log(neededTabContent)

        this._tabs.forEach(item => {
            item.classList.remove('navigation__link_active');
        })

        this._tabsContainer.forEach(item => {
            item.classList.remove('tab-content_active');
        })


        tab.classList.add('navigation__link_active');


        neededTabContent.classList.add('tab-content_active');


    }
}

