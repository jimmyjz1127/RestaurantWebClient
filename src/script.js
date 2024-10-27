import menuItems from './menu.js';
import element from './elements.js';

/**
 * 
 * @param {*} filter : object specifying what to filter by and the value
 *                     Example : {category:'Taco'} or {name:'Birria Tacos'}
 */
function loadItems(filter) {
    let mainContent = document.getElementById('main-content');

    mainContent.innerHTML="";

    menuItems.forEach((menuItem) => {
        if (filter != null && filter.category != null) {
            if (menuItem.category != filter.category) {
                return;
            }
        } else if (filter != null && filter.name != null) {
            if (menuItem.name.toLowerCase().includes(filter.name.toLowerCase())) {
                return;
            }
        }
    
        let foodItem = element("div", 
            {className:'food-item flex row align-center'},
            element("img", 
                {src:menuItem.img, className:'food-pic'}
            ),
            element("div",
                {className:'flex col align-start justify-between food-item-info'},
                element("div",
                    {className:'food-item-title'},
                    menuItem.name
                ),
                element("div",
                    {className:"food-item-description"},
                    menuItem.description
                ),
                element("div",
                    {className:"flex row justify-end align-center"},
                    element("div", 
                        {className:"food-item-price"},
                        "$" + menuItem.price/100
                    ),
                    element("button",
                        {className:"food-item-add-btn"},
                        "ADD"
                    )
                )
            )
        )
    
        mainContent.appendChild(foodItem);
    })
}

loadItems();

window.loadItems = loadItems;

