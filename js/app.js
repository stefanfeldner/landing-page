/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/



/*
 * Define Global Variables
*/



/*
 * Get Existing Sections
*/

const sectionsArray = Array.from(document.getElementsByTagName('section')); // find all the sections in the page

// loop through the sections and check the ID
for (let i = 0; i < sectionsArray.length; i++) {
    // in case someone writes the section with a capitalized S, make it lowercase
    const sectionID = sectionsArray[i].id.toLowerCase();
    // if section id doesn't includes 'section' remove it from the array
    if (!sectionID.includes('section')) {
        sectionsArray.splice(i, 1);
        i--;
    }
}
console.log(sectionsArray);

/*
 * create menu list items
*/

// get the menu ul

const menuContainer = document.getElementById('navbar__list');

const addListItems = (section) => {
     // first create the needed elements
    const menuListItem = document.createElement('li');
    const menuLinkItem = document.createElement('a');
    
    // then set the needed text and link attributes
    menuLinkItem.setAttribute('href', '#' + section.id)
    menuLinkItem.textContent = section.id;
    
    // and then append them to the existing ul
    menuContainer.appendChild(menuListItem);
    menuListItem.appendChild(menuLinkItem);
};

sectionsArray.forEach(section => {
    addListItems(section);
});


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/*
 * End Main Functions
 * Begin Events
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


