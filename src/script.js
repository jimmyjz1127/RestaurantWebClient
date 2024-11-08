"use strict";

/**
 * This script is organised in the following order 
 * 1) Variables 
 * 2) Functions 
 * 3) Event Listeners 
 */


import menuItems from './menu.js';
import element from './elements.js';

/**
 * ###################################################################
 * ############################ VARIABLES ############################
 * ###################################################################
 */

let shoppingCart = {};          // shopping cart of menu item objects
let discountApplied = false;    // boolean for whether discount code has been applied 
let filter = null;              // filter obj for filtering menu items 

/**
 * Mapping of category names to their icon paths
 */
const categoryIcons = {
    'Taco' : "./Assets/taco-icon.webp",
    'Drink' : './Assets/drink-icon.webp',
    'Dessert' : './Assets/dessert-icon.webp',
    'Burrito' : './Assets/burrito-icon.webp',
    'Main' : './Assets/main.webp',
    'Side' : './Assets/sauce-icon.webp',
    'Appetizer' : './Assets/appetizer-icon.webp',
    'Quesadilla' : './Assets/quesadilla-icon.webp'
}

/**
 * Paths to unfilled and filled heart icons
 */
const favouriteIconPath = "./Assets/favourite.svg";
const favouritedIconPath = "./Assets/favourited.svg";


/**
 * ###################################################################
 * ############################ FUNCTIONS ############################
 * ###################################################################
 */


/**
 * Applies filter to menu items shown 
 * @param {*} obj : filter object. E.g : {category : 'Appetizer', name:'Veggie Nachos'}
 */
function applyFilter(obj) {
    document.getElementById('sorting-dropdown').selectedIndex = 0; // reset sorting dropdown
    filter = obj; // set the filter
    loadItems();  // reload (render) items
}


/**
 * Renders content belt of menu food items
 * @param {*} filter : object specifying what to filter by and the value
 *                     Example : {category:'Taco'} or {name:'Birria Tacos'}
 */
function loadItems() {
    let mainContent = document.getElementById('main-content');

    // Reset menu item content belt
    mainContent.innerHTML="";

    // Iterate through list of menu item objects
    menuItems.forEach((menuItem) => {
        /**
         * Conditionals for implementing filtering
         */
        if (filter && !Object.keys(filter).some(key =>
            (key === 'favourite' && menuItem[key] === filter[key]) ||
            (key !== 'favourite' && menuItem[key]?.toLowerCase().includes(filter[key].toLowerCase()))
        )) {
            return;
        }

        // Determine whether heart (favourite) icon should be filled in or not in the food item tile 
        let favouriteIcon = menuItem.favourite != null & menuItem.favourite ? favouritedIconPath : favouriteIconPath;

        let itemId = menuItem.id;
    
        // Each tile of the central content belt of menu items
        let foodItem = element("div", 
            {className:'food-item flex row align-center', id:`${itemId}`},
            element("img", 
                {src:menuItem.img, className:'food-pic', alt:menuItem.name}
            ),
            element('img', 
                {
                    id:`favourite${itemId}`,
                    className:'favourite-btn flex row align-center justify-center',
                    alt:'Favourite',
                    src:favouriteIcon,
                    'data-index':itemId
                }
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
                    {className:"flex row justify-between align-center food-item-bottom"},
                    element('div',
                        {className:"food-item-category flex row align-center"},
                        element('img',
                            {className:"food-item-category-icon", src:categoryIcons[menuItem.category], alt:menuItem.category},
                        ),
                        menuItem.category
                    ),
                    element('div',
                        {className:'flex row align-center'},
                        element("div", 
                            {className:"food-item-price"},
                            "£" + (menuItem.price/100).toFixed(2)
                        ),
                        element("button",
                            {className:"food-item-add-btn", value:`${itemId}`},
                            "Add"
                        )
                    ),
                ) // end food item content div (desc, price, etc )
            ) // end food-item-info div
        ) // end of outer most div
        mainContent.appendChild(foodItem);
    })
}

/**
 * Handles favouriting an item (clicking on heart icon)
 * @param {*} itemId : ID the of the menu food item
 */
function handleFavourite(itemId) {
    let menuItem = menuItems.find(obj => obj.id == itemId);;
    let favouriteIcon = document.getElementById(`favourite${itemId}`);

    if (menuItem.favourite != null) {
        if (menuItem.favourite) {
           favouriteIcon.src='./Assets/favourite.svg';
        } else {
            favouriteIcon.src='./Assets/favourited.svg';
        }
        menuItem.favourite = !menuItem.favourite;
        
    } else {
        menuItem.favourite = true;
        favouriteIcon.src='./Assets/favourited.svg';
    }
}

/**
 * Handles clicking the ADD button on a menu food item tile.
 * @param {*} event 
 * @param {*} id 
 */
function handleAddItem(event, id) {
    let mainContent = document.getElementById('main-content');

    let foodItems = document.querySelectorAll('.food-item');

    /**
     * Blur and deactivate other food tiles to prevent opening multiple checkout modals
     */
    foodItems.forEach((foodItem) => {
        foodItem.style.filter="blur(5px)";
    })

    let addBtns = document.querySelectorAll('.food-item-add-btn')

    addBtns.forEach((addBtn) => {
        addBtn.disabled = true;
    })

    let menuItem = menuItems.find(obj => obj.id == id);

    // Conditionally determine whether to render add-ons (extras) section 
    // Depending on whether there are add-ons 
    let menuItemExtras = menuItem.extras.length ? 
        element('div',
            { className: 'flex col align-center', id: 'checkbox-container-wrapper' },
            element('h3', {}, 'Add-Ons'),
            element('div',
                { id: 'checkbox-container', className: 'flex row align-start justify-between' },
                element('div',
                    { className: 'flex col align-start' },
                    ...menuItem.extras.map((item, index) => {
                        return element('div',
                            { className: 'checkbox-item flex row align-center' },
                            element('input', 
                                { 
                                    type    : "checkbox", 
                                    id      : `checkbox${index}`, 
                                    name   : `${item.name}`,
                                    className : 'addon-checkbox',
                                    value : `${item.price/100}`,
                                }
                            ),
                            element('label', { for: `checkbox${index}` }, item.name)
                        );
                    })
                ),
                element('div',
                    { className: 'flex col align-end' },
                    ...menuItem.extras.map((item, index) => {
                        return element('div', {}, `£${(item.price / 100).toFixed(2)}`);
                    })
                )
            )
        ) : element('div', {});
    
    // Checkout modal
    let itemCheckout = element('div',
        {id:'item-checkout', className:'flex col align-center'},
        element('img',
            {src:'./Assets/exit.webp', id:'exit-icon'}
        ), 
        element('img',
            {src:menuItem.img, id:'item-checkout-img'}
        ),
        element('div',
            {className:'flex col align-center justify-center', id:'item-checkout-info'},
            element('div',{className:'center-text', id:'item-checkout-title'},menuItem.name),
            element('div',
                {className:'flex col align-center', id:"item-checkout-description"},
                menuItem.description
            ),
            menuItemExtras,
            element('div', 
                {className:'flex row justify-end align-center', id:'item-checkout-bottom'},
                element('div',
                    {className:'food-item-price', id:'checkout-item-price'},
                    `£${(menuItem.price / 100).toFixed(2)}`
                ),
                element('button',
                    {id:'food-item-checkout-btn', value:`${id}`},
                    "Add to Order"
                )
            ),
        )
    )
    mainContent.appendChild(itemCheckout);
}

/**
 * For handling the sorting of menu items
 * @param option : integer 1,2,3, or 4 indicating what to sort by 
 */
function handleSort(option) {
    
    switch (parseInt(option)) {
        case 1: // Price high to low 
            menuItems.sort((a,b) => a.price - b.price)
            break;
        case 2: // Price low to high 
            menuItems.sort((a,b) => b.price - a.price)
            break;
        case 3: // Category high to low 
            menuItems.sort((a,b) => {
                if (a.category > b.category) {return 1}
                else return -1
            })
            break;
        case 4: // Category low to high 
            menuItems.sort((a,b) => {
                if (a.category > b.category) {return -1}
                else return 1
            })
            break;
    }

    loadItems();
}

/**
 * Handles action of checking Add-On checkbox 
 * Updates the displayed price to reflect addition of add-on price
 * @param {*} price : price of the add-on
 */
function handleCheck(event, price) {
    let checkoutPrice = document.getElementById('checkout-item-price');
    if (event.target.checked) {
        checkoutPrice.innerHTML = '£' + (parseFloat(parseFloat(checkoutPrice.innerHTML.slice(1)) + parseFloat(price))).toFixed(2);
    } else {
        checkoutPrice.innerHTML = '£' + (parseFloat(parseFloat(checkoutPrice.innerHTML.slice(1)) - parseFloat(price))).toFixed(2);
    }
    
}


/**
 * Handles clicking the 'ADD' button in the floating checkout modal
 */
function handleAddToCart(index) {
    let price = parseFloat((document.getElementById('checkout-item-price').innerHTML).slice(1));
    // find the menu item with specific id attribute
    let menuItem = menuItems.find(obj => obj.id == index);
    let checkboxes = document.querySelectorAll('.addon-checkbox');
    let addons = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            addons.push(checkbox.name);
        }
    })

    let cartItem = {
        id:index,
        name:menuItem.name,
        description:menuItem.description,
        price:price,
        category:menuItem.category,
        addons:addons,
        quantity:1,
        totalPrice:price
    }

    // shoppingCart.push(cartItem)

    shoppingCart[index] = cartItem

    renderCart();
    handleCloseModal();
    updateCartSummary();
}

/**
 * Renders all of the food items in the right-hand cart panel that are currently in the shopping cart.
 */
function renderCart() {
    let parent = document.getElementById('cart-content');

    parent.innerHTML = "";

    Object.values(shoppingCart).forEach((item, index) => {
        let cartItem = element('div',
            {className:'cart-item flex col align-start', id:`cart-item${item.id}`},
            element('div',
                {className:'flex row align-center justify-start'},
                element('h3', {className:'cart-item-title'}, item.name)
            ),
            element('div',
                {className:'flex row align-center justify-apart cart-item-addons'},
                `Add-Ons : ` + item.addons.join(", ")
            ),
            element('div', 
                {className:'flex row align-center justify-between max-width'},
                element('div',
                    {className:'cart-price', id:`cart-price${item.id}`},
                    `£${item.totalPrice.toFixed(2)}`
                ),
                element('div',
                    {className:'quantity-toggle-container flex row align-center'},
                    element('button',
                        {
                            className:'quantity-btn flex col align-center justify-center',
                            "data-index":item.id,
                            "data-value":1,
                        },
                        '+'
                    ),
                    element('div',
                        {className:'cart-item-quantity', id:`quantity${item.id}`},
                        `${item.quantity}`
                    ),
                    element('button',
                        {
                            className:'quantity-btn flex col align-center justify-center',
                            "data-index":item.id,
                            "data-value":-1,
                        },
                        '-'
                    )
                )
            ) // end of price and add btn
        ) // end of Cart Item
        parent.appendChild(cartItem);
    })
}

/**
 * For changing the quantity of an order item in the "Order Details" section
 * @param {*} index  : the index of the item in the shopping cart array
 * @param {*} amount : +1 or -1 
 * @param {*} id     : the id of tne HTML element representing the order item 
 */
function changeQuantity(index, amount, id) {
    // If quantity has been decremented to 0, remove the item from order
    if (shoppingCart[index].quantity + amount <= 0) {
        document.getElementById(id).remove();
        delete shoppingCart[index];
        updateCartSummary();
        return
    }

    // increment quantity of item
    shoppingCart[index].quantity += amount;

    shoppingCart[index].totalPrice =  shoppingCart[index].price *  shoppingCart[index].quantity;

    let itemQuantity = document.getElementById(`quantity${index}`);
    itemQuantity.innerHTML = shoppingCart[index].quantity;

    let itemPrice = document.getElementById(`cart-price${index}`);
    itemPrice.innerHTML = `£${shoppingCart[index].totalPrice.toFixed(2)}`;

    updateCartSummary();
}

/**
 * For updating the shopping cart summary with appropriate Subtotal, Discount, and Total values 
 */
function updateCartSummary() {
    // If no items in shopping cart 
    if (shoppingCart.length == 0) {
        document.getElementById('subtotal').innerHTML = `£${0}`;
        document.getElementById('discount').innerHTML = `£${0}`;
        document.getElementById('total').innerHTML = `£${0}`;
    }

    // Calculate total cost
    let total = 0;
    Object.values(shoppingCart).forEach((item) => {
        total += item.totalPrice;
    })

    // Display total cost 
    document.getElementById('subtotal').innerHTML = `£${total.toFixed(2)}`;

    // Apply discount
    if (discountApplied) {
        document.getElementById('discount').innerHTML = `£${(total * 0.1).toFixed(2)}`;
        document.getElementById('total').innerHTML = `£${(total * 0.9).toFixed(2)}`;
    } else {
        document.getElementById('total').innerHTML = `£${(total.toFixed(2))}`;
    }
}

/**
 * Handles closing the checkout modal (when clicking the X button)
 */
function handleCloseModal() {
    let itemCheckoutModal = document.getElementById('item-checkout');
    itemCheckoutModal.remove();

    let foodItems = document.querySelectorAll('.food-item');

    // Unblur the food item tiles 
    foodItems.forEach((foodItem) => {
        foodItem.style.filter="unset";
    })

    let addBtns = document.querySelectorAll('.food-item-add-btn')

    // enable the ADD buttons on each of the food item tiles 
    addBtns.forEach((addBtn) => {
        addBtn.disabled = false;
    })
}

/**
 * Handles searching a query using search bar 
 */
function handleSearch(){
    let searchInput = document.getElementById('search-input');
    let query = searchInput.value;

    // if query is not empty, apply filter
    if (query.length != 0) {
        applyFilter({category:`${query}`, name:`${query}`});
    } else { // otherwise reset filter
        applyFilter();
    }
}

/**
 * Applies a given discount code to the final order price
 */
function handleApplyDiscount() {
    let discountCode = document.getElementById('discount-input').value;

    if (discountCode == "TACO10") {
        discountApplied=true;
        document.getElementById('discount-error-message').style.display = 'none';
        document.getElementById('discount-applied-message').style.display = 'block';
    } else {
        document.getElementById('discount-error-message').style.display = 'block';
        document.getElementById('discount-applied-message').style.display = 'none';
    }

    updateCartSummary();
}

/**
 * ######################################################################
 * ##################### EVENT HANDLERS & LISTENERS #####################
 * ######################################################################
 */
// Load food items on load 
document.addEventListener("DOMContentLoaded", () => {
    loadItems(); // render items when script is loaded
});

// Handle Clicking on a category in sidebar
document.getElementById('category-wrapper').addEventListener('click', function(event) {
    // ensure handler is attached to outer div and not children
    const sidebarItem = event.target.closest('.sidebar-item');
  
    // Check if a .sidebar-item was clicked
    if (sidebarItem && sidebarItem.classList.contains('sidebar-item')) {

        const value = sidebarItem.getAttribute('data-value');

        if (value !== null) {
            if (value === 'Favourite') {
                applyFilter({favourite:true});
            } else if (value === "null") {
                applyFilter(null);
            } else {
                applyFilter({category:value});
            }
        }
    }
});
  
// Handle searching query using searching bar on input
document.getElementById('search-input').addEventListener('input', function(event) {
    handleSearch(event);
});

// Handle selecting a sorting option from sort dropdown menu 
document.getElementById('sorting-dropdown').addEventListener('change', function(event) {
    handleSort(event.target.value);
});

// Handle pressing the "Apply" button to apply a discount code
document.getElementById('apply-btn').addEventListener('click', function(event) {
    handleApplyDiscount();
})

// Event delegation for all events that could occur within the #main-content div
document.getElementById('main-content').addEventListener('click', function(event) {
    // the "Add" button on each food item tile
    const addBtn = event.target.closest('.food-item-add-btn');
    // The favourite (heart) button on each food item tile
    const favouriteBtn = event.target.closest('.favourite-btn');
    // the exit "X" button on the food item checkout modal
    const exitIcon = event.target.closest('#exit-icon');
    // the checkbox for each add on in the food item checkout modal
    const checkBox = event.target.closest('.addon-checkbox');
    // the "add to order" button on the food item checkout modal
    const checkoutBtn = event.target.closest('#food-item-checkout-btn');

    // Handle each event
    if (addBtn) {
        const value = addBtn.getAttribute('value');
        handleAddItem(event, value);
    } else if (favouriteBtn) {
        const index = favouriteBtn.getAttribute('data-index');
        handleFavourite(parseInt(index));
    } else if (exitIcon) {
        handleCloseModal();
    } else if (checkBox) {
        const value = checkBox.getAttribute('value');
        handleCheck(event, value);
    } else if (checkoutBtn) {
        handleAddToCart(checkoutBtn.value);
    }
});


// Handle clicking on a quantity button 
document.getElementById('cart-content').addEventListener('click', function(event) {
    // Make sure were selecting the add button and not some other child element
    const quantityBtn = event.target.closest('.quantity-btn');
    

    if (quantityBtn && quantityBtn.classList.contains('quantity-btn')) {
        const value = quantityBtn.getAttribute('data-value');
        const index = quantityBtn.getAttribute('data-index');
        changeQuantity(parseInt(index), parseInt(value), `cart-item${index}`);
    }
});

// Handlers for mobile 
// Handle clicking on category menu button (top left)
document.getElementById('category-btn').addEventListener('click', function(event) {
    const categoryMenu = document.getElementById('left-content');

    if (window.innerWidth <= 700) {
        categoryMenu.classList.toggle('show');

        const orderDetails = document.getElementById('right-content');

        // close the order details popup if open
        if (orderDetails.classList.contains('show')) {
            orderDetails.classList.toggle('show');
        }
    }
});

// Handle clickling on cart icon to open order details in the top right
document.getElementById('cart-btn').addEventListener('click', function(event) {
    const orderDetails = document.getElementById('right-content');

    // if window is less then 700 pixels in width
    if (window.innerWidth <= 700) {
        orderDetails.classList.toggle('show');

        const categoryMenu = document.getElementById('left-content');

        // close the category menu if open
        if (categoryMenu.classList.contains('show')) {
            categoryMenu.classList.toggle('show');
        }
    }
});

// Make sure the left-content and right-content sections re-appear when screen widens
window.addEventListener('resize', function() {
    // if window gets wider than 701 pixels
    if (window.innerWidth > 700) {
        document.getElementById('left-content').classList.remove('show');
        document.getElementById('right-content').classList.remove('show');
    }
});

// Handle clicking the Place Order button
document.getElementById('place-order-btn').addEventListener('click', function(event) {
    if (shoppingCart.length == 0) {
        alert("Please add items to your order!");
    } else {
        alert("Order Placed");
        shoppingCart = [];
        renderCart();
        updateCartSummary();
    }
})