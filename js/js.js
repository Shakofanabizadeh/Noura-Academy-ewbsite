// بخش لاگین
// ==========================

const loginForm = document.getElementById('logginForm');
const logoutBtn = document.getElementById('logoutBtn');

// خواندن اطلاعات کاربر ذخیره‌شده در localStorage
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

// اگر کاربر قبلاً لاگین کرده، مستقیم به home.html بره یا دکمه خروج نمایش داده شود
if (loggedInUser) {
    if (window.location.pathname.endsWith("index.html")) {
        window.location.href = "home.html";
    } else {
        showLogoutButton();
        if (loginForm) loginForm.style.display = 'none';
    }
}

// فقط در صفحه login اجرا می‌شود
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // بررسی نام و پسورد صحیح
        if (username === "shakofa" && password === "123456") {

            // ذخیره اطلاعات در localStorage
            loggedInUser = { username, password };
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            // پیام خوش‌آمد فقط بار اول
            if (!sessionStorage.getItem('welcomeShown')) {
                alert(`Welcome ${username}!`);
                sessionStorage.setItem('welcomeShown', 'true');
            }

            showLogoutButton();
            loginForm.style.display = 'none';

            // انتقال به صفحه home
            window.location.href = "home.html";

        } else {
            alert("❌ Incorrect username or password. Please try again!");
        }
    });
}

// نمایش دکمه خروج
function showLogoutButton() {
    if (logoutBtn) logoutBtn.style.display = 'block';
}

// عملکرد logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // حذف اطلاعات از localStorage و sessionStorage
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('welcomeShown');
        loggedInUser = null;

        // بازگشت به صفحه login
        window.location.href = "index.html";
    });
}


// بخش تماس  
const contactForm = document.getElementById('contact');
if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('message').value.trim();

        if(name && email && message){
            alert("Your message was successfully sent. Thank you for sharing it with us!");
            contactForm.reset();
        }
    });
}

//  سلایدشو  
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    if (dots[i]) dots[i].classList.toggle("active", i === index);
  });
}

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
if (nextBtn) nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    resetAutoSlide();
});
if (prevBtn) prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    resetAutoSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showSlide(i);
    resetAutoSlide();
  });
});

showSlide(0);

let autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 4000);

function resetAutoSlide(){
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 4000);
}


// داشبورد
const courses = [
    {title:"English A1-A2", img:"./images/English A1-A2.jpg", desc:"Introduction to English for beginners. <br> teacher : Ali Ahmadi"},
    {title:"English B1-B2", img:"./images/English B1-B2.jpg", desc:"Intermediate English skills.<br> teacher : Sara Ahmadi"},
    {title:"English C1", img:"./images/English C1.jpg", desc:"Advanced English course.<br> teacher : Sahar Ahmadi"},
    {title:"German A1-A2", img:"./images/German A1-A2.jpg", desc:"Beginner German course.<br> teacher : Ali Ahmadi"},
    {title:"German B1-B2", img:"./images/German B1-B2.jpg", desc:"Intermediate German skills.<br> teacher : samira Moradi"},
    {title:"German C1", img:"./images/German C1.jpg", desc:"Advanced German course.<br> teacher : Sama Mohammadi"},
    {title:"French A1-A2", img:"./images/French A1-A2.jpg", desc:"Beginner French course.<br> teacher : Zahra Azimi"},
    {title:"French B1-B2", img:"./images/French B1-B2.jpg", desc:"Intermediate French skills.<br> teacher : Zahra Azimi"},
    {title:"French C1", img:"./images/French C1.jpg", desc:"Advanced French course.<br> teacher : Kowsar Hashemi"},
    {title:"Sewing", img:"./images/Sewing.jpg", desc:"Learn sewing skills and techniques.<br> teacher : Zainab Mohammadi"},
    {title:"Painting", img:"./images/Painting.jpg", desc:"Learn painting techniques and styles.<br> teacher : Amir Amiri"},
    {title:"Calligraphy", img:"./images/Calligraphy.jpg", desc:"Learn the art of calligraphy.<br> teacher : Reza Karimi"},
    {title:"Graphic Design", img:"./images/Graphic Design.jpg", desc:"Basics of digital graphic design.<br> teacher : Nima Ahmadi"},
    {title:"Web Design", img:"./images/Web Design.jpg", desc:"Learn web design and development.<br> teacher : Mina Hosseini"},
];

const cardsContainer = document.getElementById('cardsContainer');
const enrolledList = document.getElementById('enrolledList');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const registerBtn = document.getElementById('registerBtn');
const fullName = document.getElementById('fullName');
const phone = document.getElementById('phone');

let selectedCourseIndex = null;

// لود شدن دوره‌های ثبت‌نام شده با localStorage
let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];

function updateEnrolledList() {
    enrolledList.innerHTML = '';
    if(enrolledCourses.length === 0){
        const li = document.createElement('li');
        li.textContent = "No courses enrolled yet";
        enrolledList.appendChild(li);
        return;
    }
    enrolledCourses.forEach(course=>{
        const li = document.createElement('li');
        li.innerHTML = `${course.title}  <button onclick="unenroll('${course.title}')">Unenroll</button>`;
        enrolledList.appendChild(li);
    });
}

updateEnrolledList();

function renderCards(coursesToRender){
    cardsContainer.innerHTML = '';
    coursesToRender.forEach((course,index)=>{
        const card = document.createElement('div');
        card.classList.add('card');
        const isEnrolled = enrolledCourses.some(c=>c.title===course.title);
        card.innerHTML = `
            <img src="${course.img}" alt="${course.title}">
            <div class="card-body">
                <h3>${course.title}</h3>
                <p>${course.desc}</p>
                <button class="${isEnrolled?'enrolled':''}" onclick="openModal(${index})">
                    ${isEnrolled?'Enrolled':'Enroll'}
                </button>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

renderCards(courses);
// سرچ کردن صنف ها
searchInput.addEventListener('input', ()=>{
    const query = searchInput.value.toLowerCase();
    const filtered = courses.filter(c=>c.title.toLowerCase().includes(query));
    renderCards(filtered);
});
// باز کردن مودال ثبت‌نام
function openModal(index){
    selectedCourseIndex = index;
    const course = courses[index];
    const isAlready = enrolledCourses.some(c=>c.title===course.title);
    if(isAlready){
        alert('You are already enrolled in this course.');
        return;
    }
    modal.style.display='flex';
}

closeModal.addEventListener('click', ()=>modal.style.display='none');
window.addEventListener('click',(e)=>{if(e.target===modal) modal.style.display='none';});

registerBtn.addEventListener('click', ()=>{
    const nameVal = fullName.value.trim();
    const phoneVal = phone.value.trim();
    if(!nameVal || !phoneVal){ alert('Please enter full name and phone number.'); return; }
    const course = courses[selectedCourseIndex];
    enrolledCourses.push({title:course.title, name:nameVal, phone:phoneVal});
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    updateEnrolledList();
    renderCards(courses);
    modal.style.display='none';
    fullName.value=''; phone.value='';
});
// لغو ثبت نام
function unenroll(title){
    const confirmUnenroll = confirm("Are you sure you want to cancel your enrollment in this course?");
    if(!confirmUnenroll) return;
    enrolledCourses = enrolledCourses.filter(c=>c.title!==title);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    updateEnrolledList();
    renderCards(courses);
}
