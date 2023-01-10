// ---------- NAVBAR ---------- // 
document.addEventListener("DOMContentLoaded", e => {
  function offset(elem) {
    let rect = elem.getBoundingClientRect();
    let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop),
      left = rect.left + (window.pageYOffset || document.documentElement.scrollLeft),
      right = left + elem.clientWidth,
      bottom = top + elem.clientHeight;
    return { top, right, bottom, left };
  }

  function vh(v) {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
  }

  const nav = document.querySelector("nav");
  const tabs = document.querySelectorAll("nav > a.tab");
  const menu_btn = document.querySelector("nav > .menu-btn");
  const content_pages = document.querySelectorAll(".content-page");
  const md = 720;

  let nav_height = nav.clientHeight;
  let nav_top_offset = offset(nav).top;

  let scroll_position = 0;
  let ticking = false;

  window.addEventListener("scroll", e => {
    scroll_position = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (scroll_position >= nav_top_offset) {
          nav.style.position = "fixed";
          nav.style.top = "0";
          nav.transition = "0.5s linear";
        }
        else {
          let active_tab = document.querySelector("nav a.active");
          if (active_tab) active_tab.classList.remove("active");
          nav.style.position = "static";
          nav.style.top = `${vh(100) - nav_height}`;
          nav.transition = "0.5s linear";
        }

        // PAGE INDEX ACTIVE NAVBAR
        content_pages.forEach((page, idx) => {
          let { top, bottom } = offset(page);
          if (scroll_position >= top - nav_height && scroll_position <= bottom - nav_height) {
            let active_tab = document.querySelector("nav a.active");
            if (active_tab) active_tab.classList.remove("active");
            tabs[idx + 2].classList.add("active");
          }
        })

        ticking = false;
      });

      ticking = true;
    }
  });

  function hide_tabs() {
    if (window.innerWidth <= md) {
      tabs.forEach(tab => {
        tab.classList.add("hidden");
      });
    }
  }

  hide_tabs();

  window.onresize = e => {
    if (window.innerWidth <= md)
      tabs.forEach(tab => {
        tab.classList.add("hidden");
      });
    else
      tabs.forEach(tab => {
        tab.classList.remove("hidden");
      });
  }

  menu_btn.onclick = e => {
    if (window.innerWidth <= md) {
      tabs.forEach(tab => {
        tab.classList.toggle("hidden");
      });
    }
  }
});

// ---------- FIN NAVBAR ---------- // 



// ---------- PARALLAX ---------- // 

const translate = document.querySelectorAll(".translate");

window.addEventListener('scroll', () => {
  let scroll = window.pageYOffset;

  translate.forEach(element => {
    let speed = element.dataset.speed;
    element.style.transform = `translateY(${scroll * speed}px)`;
  });

})

// ---------- FIN PARALLAX ---------- // 



// ---------- CURSEUR ---------- // 
const updateProperties = (elem, state) => {
  elem.style.setProperty('--x', `${state.x}px`)
  elem.style.setProperty('--y', `${state.y}px`)
  elem.style.setProperty('--width', `${state.width}px`)
  elem.style.setProperty('--height', `${state.height}px`)
  elem.style.setProperty('--radius', state.radius)
  elem.style.setProperty('--scale', state.scale)
}

document.querySelectorAll('.cursor').forEach(cursor => {
  let onElement

  const createState = e => {
    const defaultState = {
      x: e.clientX,
      y: e.clientY,
      width: 40,
      height: 40,
      radius: '50%'
    }

    const computedState = {}

    if (onElement != null) {
      const { top, left, width, height } = onElement.getBoundingClientRect()
      const radius = window.getComputedStyle(onElement).borderTopLeftRadius

      computedState.x = left + width / 2
      computedState.y = top + height / 2
      computedState.width = width
      computedState.height = height
      computedState.radius = radius
    }

    return {
      ...defaultState,
      ...computedState
    }
  }

  document.addEventListener('mousemove', e => {
    const state = createState(e)
    updateProperties(cursor, state)
  })

  document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('mouseenter', () => (onElement = elem))
    elem.addEventListener('mouseleave', () => (onElement = undefined))
  })
})
// ---------- FIN CURSEUR ---------- // 



// ---------- ANIMATION LOADER ---------- // 
let t1 = gsap.timeline();

t1.from(".imsrk", {
  opacity: 0,
  xPercent: -100,
  delay: 0.5,
  duration: 1,
  ease: "power1.out",
  yoyo: true,
});
t1.from(
  ".dot",
  {
    opacity: 0,
    yPercent: 100,
    delay: 0.5,
    repeatDelay: 1,
    duration: 1,
    ease: "power1.out",
  },
  0.01
);

t1.to(".dot", {
  x: 20,
  duration: 1,
  ease: "power1.out",
});

t1.to(".dot", {
  x: -10,
  duration: 0.5,
  ease: "power1.out",
});

t1.to(".imsrk", {
  opacity: 0,
  xPercent: -100,
  duration: 1,
  ease: "power1.out",
  yoyo: true,
});

t1.to(
  ".dot",
  {
    opacity: 0,
    duration: 1,
    ease: "expo.out",
  },
  3
);

t1.to(
  ".cover",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3
);

t1.to(
  ".cover-2",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3.2
);

t1.to(
  ".cover-3",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3.4
);

t1.to(
  ".cover-4",
  {
    xPercent: -100,
    duration: 1,
    ease: "power1.out",
  },
  3.6
);
// ---------- FIN ANIMATION LOADER ---------- // 











// ---------- DOWNLOAD CV ---------- //
const download = document.querySelector('.download-btn');
const countdown = document.querySelector('.countdown');
const pleaseWaitText = document.querySelector('.pleaseWait-text');
const manualDownloadText = document.querySelector('.manualDownload-text');
const manualDownloadLink = document.querySelector('.manualDownload-link');
var timeLeft = 5;

download.addEventListener('click', () => {
  download.style.display = "none";
  countdown.innerHTML = `Le téléchargement commencera automatiquement dans <span>${timeLeft}</span> secondes`;

  var downloadTimer = setInterval(function timeCount() {
    timeLeft--;
    countdown.innerHTML = `Le téléchargement commencera automatiquement dans <span>${timeLeft}</span> secondes`;

    if (timeLeft <= 0) {
      clearInterval(downloadTimer);

      pleaseWaitText.style.display = "block";
      let download_href = "https://drive.google.com/uc?export=download&id=1InXkcrLv2YRYmBV8w-2IDleAyDP3c89r";
      // https://drive.google.com/file/d/1InXkcrLv2YRYmBV8w-2IDleAyDP3c89r/view?usp=share_link
      window.location.href = download_href;
      manualDownloadLink.href = download_href;


      setTimeout(() => {
        pleaseWaitText.style.display = "none";
        manualDownloadText.style.display = "block";
      }, 1000);
    }
  }, 1000);
});
// ---------- FIN DOWNLOAD CV ---------- //



// ---------- ENVOYER EMAIL ---------- //


const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const place = document.getElementById('place');
const company = document.getElementById('company');
const profession = document.getElementById('profession');
const message = document.getElementById('message');
const submit = document.getElementById('submit');

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  let ebody = `
    <h1>First Name: </h1>${firstName.value}
    <br>
    <h1>Last Name: </h1>${lastName.value}
    <br>
    <h1>Email: </h1>${email.value}
    <br>
    <h1>place: </h1>${place.value}
    <br>
    <h1>company: </h1>${company.value}
    <br>
    <h1>profession: </h1>${profession.value}
    <br>
    <h1>message: </h1>${message.value}
    `;


  Email.send({
    SecureToken: "a0c11884-2a76-4235-8c02-18d5dda74077",
    To: 'heroanneolivier@gmail.com',
    From: "heroanneolivier@gmail.com",
    Subject: "Contact du formulaire PORTFOLIO",
    Body : ebody
  }).then(
    message => alert(message)
  );
});


