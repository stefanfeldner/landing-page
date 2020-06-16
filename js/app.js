/*
 * Get Existing Sections
 */
const sectionsArray = Array.from(document.getElementsByTagName('section')); // find all the sections in the page
const sectionTopOffsets = [];
const sectionOffsetHeight = [];

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
        sectionOffsetHeight.push(sectionsArray[i].offsetHeight);
    }
}

/*
 * create menu list items
 */

// get the menu ul
const menuContainer = document.getElementById('navbar__list');

const addListItems = (section) => {
    // create listItem and insert it into the ul
    const menuListItems = `<li><a class="scrollLink" href="#${section.id}">${section.id}</a></li>`;
    menuContainer.insertAdjacentHTML('beforeend', menuListItems);
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

// create scroll function with two arguments --> event and index
const scrollFunc = (event, i) => {
    // stop it from jumping
    event.preventDefault();

    // scroll smoothly to the position based on the section
    window.scroll({
        top: sectionTopOffsets[i] - headerHeight,
        left: 0,
        behavior: 'smooth'
    });
};

// add an event listener to every menu item and block default event
for (let i = 0; i < menuLinkItems.length; i++) {
    menuLinkItems[i].addEventListener('click', function() {
        scrollFunc(event, i)
    });
}

/*
 * add section highlighting on scroll
 */

window.addEventListener('scroll', function() {
    // check for each section if they are in viewport
    for ([i, section] of sectionsArray.entries()) {
        // if the section is in viewport add the class, else remove it
        const topScrollOffset = window.pageYOffset + headerHeight;
        const bottomLimit = sectionTopOffsets[i] + sectionOffsetHeight[i] - headerHeight;

        if (topScrollOffset >= sectionTopOffsets[i] && window.pageYOffset < bottomLimit) {
            section.classList.add('active');
            menuLinkItems[i].classList.add('navbar_active');
        } else {
            section.classList.remove('active');
            menuLinkItems[i].classList.remove('navbar_active');
        }
    }
    // get the window top offset and show the topLink when the offset is higher then a wanted value
    const windowTopOffset = window.pageYOffset;
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

window.onresize = function(){ 
    location.reload(); 
}