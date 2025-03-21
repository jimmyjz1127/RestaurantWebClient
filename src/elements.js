/**
 * Contains function for creating HTML elements in javacript 
 */

/**
 * Function for creating (nested) HTML elements using javascript
 * @param {*} name              : the name of the html element (e.g. 'div', 'p', 'img')
 * @param {*} options           : object containing attributes of html element (e.g. {className="main", id='id1'})
 * @param  {...any} children    : child html elements (nested called of this function)
 * @returns                     : HTML dom element 
 */
function element(name, options = {}, ...children) {
    // Create a new document element
    // name = div | span | h1 | etc...
    const elem = document.createElement(name);

    // Apply attributes from the options object containing elem attributes
    for (const [key, value] of Object.entries(options)) {
        if (key === 'style' && typeof value === 'object') {
            Object.assign(elem.style, value); // Apply styles if value is an object
        } else if (key in elem) {
            elem[key] = value; // Set property if it's a direct property of the elem
        } else {
            elem.setAttribute(key, value); // Otherwise, set it as an attribute
        }
    }

    // Append each child element to the elem
    children.forEach(child => {
        if (typeof child === 'string') {
            elem.appendChild(document.createTextNode(child)); // Handle text content
        } else {
            elem.appendChild(child); // Append child DOM elements
        }
    });

    return elem;
}

export default element;
