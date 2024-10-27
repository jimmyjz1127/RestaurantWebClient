import menuItems from './menu.js';
import element from './elements.js';

/**
 * Mapping of category names to their icon paths
 */
const categoryIcons = {
    'Taco' : "./Assets/taco-icon.png",
    'Drink' : './Assets/drink-icon.png',
    'Dessert' : './Assets/dessert-icon.png',
    'Burrito' : './Assets/burrito-icon.png',
    'Main' : './Assets/main.png',
    'Side' : './Assets/sauce-icon.png',
    'Appetizer' : './Assets/appetizer-icon.png',
    'Quesadilla' : './Assets/quesadilla-icon.png'
}



/**
 * Renders content belt of menu items
 * @param {*} filter : object specifying what to filter by and the value
 *                     Example : {category:'Taco'} or {name:'Birria Tacos'}
 */
function loadItems(filter) {
    let mainContent = document.getElementById('main-content');

    // Reset menu item content belt
    mainContent.innerHTML="";

    // Iterate through list of menu item objects
    menuItems.forEach((menuItem) => {
        /**
         * Conditionals for implementing filtering
         */
        // if filtering by search bar (where one can search for both category & item name)
        if (filter != null && filter.category != null && filter.name != null) {
            if (menuItem.category.toLowerCase() != filter.category.toLowerCase() && !menuItem.name.toLowerCase().includes(filter.name.toLowerCase())) {
                return;
            }
        } 
        // if filtering just by category
        else if (filter != null && filter.category != null) {
            if (menuItem.category.toLowerCase() != filter.category.toLowerCase()) {
                return;
            }
        } 
        // if filtering just by item name (not really needed - covered by first conditional)
        else if (filter != null && filter.name != null) {
            if (!menuItem.name.toLowerCase().includes(filter.name.toLowerCase())) {
                return;
            }
        }

        let itemId = menuItem.id;
    
        // Each tile of the central content belt of menu items
        let foodItem = element("div", 
            {className:'food-item flex row align-center', id:`${itemId}`},
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
                    {className:"flex row justify-between align-center"},
                    element('div',
                        {className:"food-item-category flex row align-center"},
                        element('img',
                            {className:"food-item-category-icon", src:categoryIcons[menuItem.category]},
                        ),
                        menuItem.category
                    ),
                    element('div',
                        {className:'flex row align-center'},
                        element("div", 
                            {className:"food-item-price"},
                            "£" + menuItem.price/100
                        ),
                        element("button",
                            {className:"food-item-add-btn",
                             onClick:`handleAddItem(event, ${itemId})`   
                            },
                            "ADD"
                        )
                    ),
                ) // end food item content div (desc, price, etc )
            ) // end food-item-info div
        ) // end of outer most div
        mainContent.appendChild(foodItem);
    })
}

function handleAddItem(event, id) {
    let mainContent = document.getElementById('main-content');

    let foodItems = document.querySelectorAll('.food-item');

    foodItems.forEach((foodItem) => {
        foodItem.style.filter="blur(5px)";
    })

    let addBtns = document.querySelectorAll('.food-item-add-btn')

    addBtns.forEach((addBtn) => {
        addBtn.disabled = true;
    })

    let menuItem = menuItems[id-1];
    
    let itemCheckout = element('div',
        {id:'item-checkout', className:'flex col align-center'},
        element('div',
            {id:'exit-icon-container', onClick:"handleCloseModal()"},
            element('img',
                {src:'./Assets/exit.png', id:'exit-icon'}
            )
        ),
        element('img',
            {src:menuItem.img, id:'item-checkout-img'}
        ),
        element('div',
            {class:'flex col align-center'},
            element('h2',{},menuItem.name),
            element('div',
                {className:'flex col align-center', id:"item-checkout-description"},
                menuItem.description
            ),
            element('h3',{}, 'Add-Ons'),
            element('div',
                {id:'checkbox-container', className:'flex row align-start justify-between'},
                element('div',
                    {className:'flex col align-start'},
                    ...menuItem.extras.map((item,index) => {
                        return element('div',
                            {className:'checkbox-item flex row align-center'},
                            element('input',
                                {type:"checkbox",id:`checkbox${index}`}
                            ),
                            element('label',
                                {for:`checkbox${index}`},
                                item.name
                            )
                        )
                    })
                ),
                element('div',
                    {className:'flex col align-end'},
                    ...menuItem.extras.map((item,index) => {
                        return element('div',{},`£${item.price}`)
                    })
                )
            ),
            element('div', 
                {className:'flex row align-center justify-between', id:'item-checkbout-bottom'},
                element('div',
                    {className:'food-item-price'},
                    `£${menuItem.price}`
                ),
                element('button',
                    {className:'food-item-add-btn'},
                    "Add"
                )
            )
        )
    )

    mainContent.appendChild(itemCheckout);

}


function handleCloseModal() {
    let itemCheckoutModal = document.getElementById('item-checkout');
    itemCheckoutModal.remove();

    let foodItems = document.querySelectorAll('.food-item');

    foodItems.forEach((foodItem) => {
        foodItem.style.filter="unset";
    })

    let addBtns = document.querySelectorAll('.food-item-add-btn')

    addBtns.forEach((addBtn) => {
        addBtn.disabled = false;
    })

}

function handleSearch(){
    let searchInput = document.getElementById('search-input');
    let query = searchInput.value;

    // if query is not empty, apply filter
    if (query.length != 0) {
        loadItems({category:`${query}`, name:`${query}`});
    } else { // otherwise reset filter
        loadItems();
    }
}

var shoppingCart = [];

function renderCartHeader(quantity) {
    let cartHeader = document.getElementById('cart-header-container');

    let cartHeaderLabel = element('div',
        {className:'cart-label'},
        'Cart'
    )

    let cartHeaderQuantity = element('div',
        {className:'cart-quantity'},
        `${quantity}`
    )

    cartHeader.appendChild(cartHeaderLabel);
    cartHeader.appendChild(cartHeaderQuantity);
}






loadItems(); // render items when script is loaded
renderCartHeader(shoppingCart.length);



window.handleSearch = handleSearch;
window.loadItems = loadItems;
window.handleAddItem = handleAddItem;
window.handleCloseModal = handleCloseModal;
