// Books data
const booksData = [
    {
        id: '1',
        title: 'Machine Learning System Design',
        authors: ['Arseny Kravchenko', 'Valeri Babushkin'],
        description: `From this book, I learned many key concepts of machine learning system design and lifecycle.
        By no means I learned everything due to its in-depth nature but my aim was to gain an overview and exposure to how 
        senior ML professionals approach things.<br>
        &nbsp;&nbsp;&nbsp; I'll start with a core concept authors discussed that is of design document. It is a critical part of any ML system and 
        almost all projects will fail without it according to the authors. It's a document that keeps track of problem description, 
        which models/loss functions/metrics will be used, error analysis, and all the way to system maintenance. Involving all stakeholders
        is crucial in reviewing the draft doc and asking for specific feedback. If you're reviewing one, asking questions and pointing weak
        points out should be done. Also, this doc is considered a "living thing" as it may be edited even after the launch of the system. <br>
        &nbsp;&nbsp;&nbsp; Knowing the problem properly is another major topic that was discussed. Before thinking about a solution, we need to ask questions such as
        why does the problem occur? Do we even need an ML solution here? We can ask "what" questions to understand customer needs like what is the client
        looking for? and finally "how" questions from engineering perspective. It's a good practice to gather information from general top level and then 
        go to niche low level. Then you can jump into the solution space.<br>
        &nbsp;&nbsp;&nbsp; Now, I'll just quickly list my other key takeaways. So a baseline solution is a really good practice for several reasons. They act as a benchmark for
        more complex models. They're easier to manage. They're a less prone to errors and cheaper to implement. Now a typical model progression can look like this:
        constant baseline, rule based, linear model, finally a more advanced model. <br>
        To keep this short, I'm planning to write a blog post for a more comprehensive summary/review for this book.`,
        status: 'finished',
        image: 'img/ml-system-design.jpg'
    }, 
    {
        id: '2',
        title: 'Introduction to Statistical Learning with R',
        authors: ['Gareth James', 'Daniela Whitten','Trevor Hastie','Robert Tibshirani'],
        description: `We used this classic book for our statistical learning course. I read chapters on machine learning algorithms
        as we moved through the course. I still use this book as a reference whenever I need to review an algorithm. `,
        status: 'finished',
        image: 'img/ISLR_pic.jpg'
    },
    {
        id: '3',
        title: 'Getting Started with NLP',
        github: 'aa',
        authors: ['Ekaterina Kochmar'],
        description: `I'm still reading this book and it has helped me gain familiarity with foundational NLP concepts. 
        So far, I've learned about techniques such as tokenization, information search, cosine similarity, user profiling and more. 
        After this, I'll be ready to get into advanced NLP using deep learning and transformers.`,
        status: 'current',
        image: 'img/nlp.jpg'
    },
    {
        id: '4',
        title: 'Generative Deep Learning',
        authors: ['David Foster'],
        description: `I've started this book to learn Gen AI as I'm learning foundational deep learning. I've learned the basics of Gen AI so far. It's going
        to be a journey covering auto-encoders, transformers, and more concepts that gave rise to Gen AI.`,
        status: 'current',
        image: 'img/gen_dl.jpg'
    },
    {
        id: '5',
        title: 'Optimization Algorithms',
        authors: ['Alaa Khamis'],
        description: `This is the book I just started reading. I won't be reading it in its entirety because mainly ML chapter 
        is relevant for me. I'm excited though to get a better understanding of optimization in ML.`,
        status: 'current',
        image : 'img/opt_algo.jpg'
    }
];

// State management
let currentCategory = 'finished';
let isDropdownOpen = false;

// DOM elements
const dropdownButton = document.getElementById('dropdown-button');
const dropdownText = document.getElementById('dropdown-text');
const dropdownMenu = document.getElementById('dropdown-menu');
const booksList = document.getElementById('books-list');
const noBooksMessage = document.getElementById('no-books');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    renderBooks();
});

// Event listeners
function setupEventListeners() {
    // Dropdown button click
    dropdownButton.addEventListener('click', toggleDropdown);
    
    // Dropdown items click
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            handleCategorySelect(this.dataset.category);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            closeDropdown();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isDropdownOpen) {
            closeDropdown();
        }
    });
}

// Dropdown functions
function toggleDropdown() {
    if (isDropdownOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openDropdown() {
    isDropdownOpen = true;
    dropdownButton.classList.add('open');
    dropdownMenu.classList.add('open');
    console.log('Dropdown opened, menu element:', dropdownMenu);
}

function closeDropdown() {
    isDropdownOpen = false;
    dropdownButton.classList.remove('open');
    dropdownMenu.classList.remove('open');
}

function handleCategorySelect(category) {
    currentCategory = category;
    updateDropdownText();
    closeDropdown();
    renderBooks();
}

function updateDropdownText() {
    const text = currentCategory === 'finished' ? 'Finished Readings' : 'Current Readings';
    dropdownText.textContent = text;
}

// Book rendering functions
function renderBooks() {
    const filteredBooks = booksData.filter(book => book.status === currentCategory);
    
    if (filteredBooks.length === 0) {
        showNoBooksMessage();
        return;
    }
    
    hideNoBooksMessage();
    
    // Clear current books
    booksList.innerHTML = '';
    
    // Add books with staggered animation
    filteredBooks.forEach((book, index) => {
        setTimeout(() => {
            const bookElement = createBookElement(book, index);
            booksList.appendChild(bookElement);
        }, index * 100); // Stagger the animations
    });
}

function createBookElement(book, index) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-item';
    
    const authorsText = book.authors.length > 1 ? 'Authors' : 'Author';
    const authorsString = book.authors.join(' & ');
    
    // Create short description (first 100 characters)
    const shortDescription = book.description.length > 100 
        ? book.description.substring(0, 300) + '...' 
        : book.description;
    
    bookDiv.innerHTML = `
        <div class="book-cover">
            <img src="${book.image}" onerror = "this.src='img/default-cover.jpg';" alt="${book.title} cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.375rem;" />
        </div>
        <div class="book-details">
            <h3 class="book-title">${index + 1}. ${book.title}</h3>
            <p class="book-authors">${authorsText}: ${authorsString}</p>
            <div class="book-description">
                <span class="label">What I Learned: </span>
                <span class="description-text">${shortDescription}</span>
                <div class="full-description" style="display: none;">${book.description}</div>
            </div>
            <a href="#" class="read-more">read more...</a>
        </div>
    `;
    
    // Add click handler for "read more" link
    const readMoreLink = bookDiv.querySelector('.read-more');
    const descriptionText = bookDiv.querySelector('.description-text');
    const fullDescription = bookDiv.querySelector('.full-description');
    let isExpanded = false;
    
    readMoreLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (isExpanded) {
        // Collapse
        descriptionText.style.display = 'inline';
        fullDescription.style.display = 'none';
        readMoreLink.textContent = 'read more...';
        } else {
            // Expand
            descriptionText.style.display = 'none';
            fullDescription.style.display = 'inline';
            readMoreLink.textContent = 'read less';
        }
        isExpanded = !isExpanded;
    });
    
    return bookDiv;
}

// This function is no longer needed as we handle expand/collapse in createBookElement

function showNoBooksMessage() {
    booksList.style.display = 'none';
    noBooksMessage.style.display = 'block';
}

function hideNoBooksMessage() {
    booksList.style.display = 'flex';
    noBooksMessage.style.display = 'none';
}