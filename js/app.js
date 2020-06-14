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

// get all the links with the class 'scrollLink'
const menuLinkItems = Array.from(document.getElementsByClassName('scrollLink'));
// get the height of the header
const headerHeight = document.querySelector('.page__header').clientHeight;

// add an event listener to every menu item and block default event
for (let i = 0; i < menuLinkItems.length; i++) {
    menuLinkItems[i].addEventListener('click', function() {
        event.preventDefault();

        // scroll smoothly to the position based on the section
        window.scrollTo({
            top: sectionTopOffsets[i] - headerHeight,
            behavior: 'smooth'
        });
    });
}

/*
 * add section highlighting on sroll
*/

window.addEventListener('scroll', function() {
    // check for each section if they are in viewport
    for ([i, section] of sectionsArray.entries()) {
        let windowBounding = section.getBoundingClientRect();
        // if in viewport add the class, else remove it
        if (windowBounding.top <= headerHeight && windowBounding.left >= 0) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
        // add menu li active when in viewport and remove it when it scrolls out of the section
        if (windowBounding.top <= headerHeight && windowBounding.bottom >= headerHeight) {
            menuLinkItems[i].classList.add('navbar_active');
        } else {
            menuLinkItems[i].classList.remove('navbar_active');
        }
    }
    // get the window top offset and show the topLink when the offset is higher then a wanted value
    const windowTopOffset = window.scrollY;
    const neededOffsetToShow = 100;

    if (windowTopOffset > neededOffsetToShow) {
        topLinkElem.style.visibility = 'visible';
    } else {
        topLinkElem.style.visibility = 'hidden';
    }
});

/*
 * scroll to top on click on topLink
*/

const topLinkElem = document.getElementById('topLink');

topLinkElem.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*
    let t1 = performance.now();

    let t2 = performance.now();
    console.log((t1 - t2).toFixed(2));
*/