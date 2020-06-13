/*
 * Get Existing Sections
*/
const sectionsArray = Array.from(document.getElementsByTagName('section')); // find all the sections in the page
const sectionTopOffsets = [];

// loop through the sections and check the ID
for (let i = 0; i < sectionsArray.length; i++) {
    // in case someone writes the section with a capitalized S, make it lowercase
    const sectionID = sectionsArray[i].id.toLowerCase();
    // if section id doesn't includes 'section' remove it from the array
    if (!sectionID.includes('section')) {
        sectionsArray.splice(i, 1);
        i--;
    } else {
        // get the sections top offset and save it in an array
        sectionTopOffsets.push(sectionsArray[i].offsetTop);
    }
}
//console.log(sectionTopOffsets)
//console.log(sectionsArray);

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
    menuLinkItem.classList.add('scrollLink');
    menuLinkItem.textContent = section.id;
    
    // and then append them to the existing ul
    menuContainer.appendChild(menuListItem);
    menuListItem.appendChild(menuLinkItem);
};

sectionsArray.forEach(section => {
    addListItems(section);
});

/*
 * create scroll functionality
*/

const menuLinkItems = Array.from(document.getElementsByClassName('scrollLink'));

for (let i = 0; i < menuLinkItems.length; i++) {
    menuLinkItems[i].addEventListener('click', function() {
        event.preventDefault();

        // scroll smoothly to the position based on the section
        window.scrollTo({
            top: sectionTopOffsets[i] -91,
            behavior: 'smooth'
        });
    });
}

window.addEventListener('scroll', function() {
    for (section of sectionsArray) {
        if (section.offsetTop < window.innerHeight) {
            console.log('ey');
            section.classList.add('active');
        }
    }
});

// Add class 'active' to section when near top of viewport

// TODO: add active to item i scrolled to

/*
 * End Main Functions
 * Begin Events
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


/*let t1 = performance.now();

let t2 = performance.now();
console.log((t1 - t2).toFixed(2));
*/