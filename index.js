// ========================================
// Responsive navigation
// ========================================
const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");
const toggleNavbar = () => {
    // alert("hi");
    nav_header.classList.toggle("active");
};
mobile_nav.addEventListener("click", () => toggleNavbar());



// ======================================
// Creating a Portfolio tabbled component
// ======================================


const p_btns = document.querySelector(".p-btns");
const p_btn = document.querySelectorAll(".p-btn");
const p_img_elem = document.querySelectorAll(".img-overlay");

p_btns.addEventListener("click", (e) => {
    const p_btn_clicked = e.target;
    console.log(p_btn_clicked);

    if (!p_btn_clicked.classList.contains("p-btn")) return;

    p_btn.forEach((curElem) => curElem.classList.remove("p-btn-active"));

    p_btn_clicked.classList.add("p-btn-active");

    // to find number in data attr //
    
    const btn_num = p_btn_clicked.dataset.btnNum;
    console.log(btn_num);

    const img_active = document.querySelectorAll(`.p-btn--${btn_num}`);

    p_img_elem.forEach((curElem) => curElem.classList.add("p-image-not-active"));

    img_active.forEach((curElem) => 
        curElem.classList.remove("p-image-not-active")
);

    
});

// ==========================================
// Creating a Portfolio tabbled component End
// ==========================================



// ========================================
// sticky navigation
// ========================================
const sectionHero = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
    (entries) => {
        const ent = entries[0];
        console.log(ent);
        !ent.isIntersecting ?
            document.body.classList.add("sticky") :
            document.body.classList.remove("sticky");
    }, {
        // viewport
        root: null,
        threshold: 0,
        rootMargin: "-100px",
    }
);
// when the hero section end part reached then we need to show the sticky navigation
observer.observe(sectionHero);


// ============================
// Creating a Swiper Component
// ============================

 new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay:{
        delay:2500,
        // disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const myJsmedia = (widthSize) => {
    if(widthSize.matches) {
       new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
      
      });

    }else{
       new Swiper(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        
      });
    }
  };

  const widthSize = window.matchMedia("(max-width:780px)");

  // Call listener function at run time
  
  myJsmedia(widthSize);
  // Attach listener function on state changes
  widthSize.addEventListener("change", myJsmedia);


// ====================
// Scroll To Top Button
// ====================


const heroSection = document.querySelector(".section-hero");
const footerElem = document.querySelector(".section-footer");


const scrollElement = document.createElement("div");

scrollElement.classList.add("scrollTop-style");

scrollElement.innerHTML = `<ion-icon name="arrow-up-outline" class="scroll-top"></ion-icon>`;

footerElem.after(scrollElement);

const scrollTop = () =>{
     heroSection.scrollIntoView({ behavior: "smooth" });
};


scrollElement.addEventListener("click", scrollTop);



// ========================================
//  lazy loading section
// ========================================
const imgRef = document.querySelector("img[data-src]");
console.log(imgRef);
const lazyImg = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = imgRef.dataset.src;
};
const imgObserver = new IntersectionObserver(lazyImg, {
    root: null,
    threshold: 0,
    // rootMargin: "100px",
});
imgObserver.observe(imgRef);


// ========================================
//  animated counter number
// ========================================
const workSection = document.querySelector(".section-work-data");
const workSectionObserve = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    console.log(entries);
    const counterNum = document.querySelectorAll(".counter-numbers");
    // console.log(counterNum);
    const speed = 200;
    counterNum.forEach((curNumber) => {
        const updateNumber = () => {
            const targetNumber = parseInt(curNumber.dataset.number);
            // console.log(targetNumber);
            const initialNumber = parseInt(curNumber.innerText);
            // console.log(initialNumber);
            const incrementNumber = Math.trunc(targetNumber / speed);
            // i am adding the value to the main number
            // console.log(incrementNumber);
            if (initialNumber < targetNumber) {
                curNumber.innerText = `${initialNumber + incrementNumber}+`;
                setTimeout(updateNumber, 10);
            } else {
                curNumber.innerText = `${targetNumber}+`;
            }
        };
        updateNumber();
    });
};
const workSecObserver = new IntersectionObserver(workSectionObserve, {
    root: null,
    threshold: 0,
});
workSecObserver.observe(workSection);
