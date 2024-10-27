import menuItems from './menu.js';
import element from './elements.js';


menuItems.forEach((menuItem) => {
    let mainContent = document.getElementById('main-content');

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