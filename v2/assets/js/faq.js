document.querySelectorAll('.accordion .trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const accordion = trigger.parentElement;
    const isOpen = accordion.classList.contains('open');

    if (isOpen) {
      accordion.classList.remove('open');
    } else {
      document.querySelectorAll('.accordion').forEach(accordion => {
        accordion.classList.remove('open');
      });

      accordion.classList.add('open');
    }
  });
});


// const bodyRef = document.querySelector('body');

// console.log(bodyRef.clientWidth)
// const [
//   welcome,
//   impact,
//   change,
//   find,
//   active
// ] = [
//   document.querySelector('.welcome').offsetTop,
//   document.querySelector('.impact').offsetTop,
//   document.querySelector('.change').offsetTop,
//   document.querySelector('.find').offsetTop + 545,
//   document.querySelector('.active').offsetTop,
// ]


// bodyRef.style.backgroundColor = 'blue';


// window.addEventListener('scroll', () => {

//   if (bodyRef.clientWidth > 768) {
//     bodyRef.style.backgroundColor = 'white';
//     return;
//   }

//   const { scrollY } = window;


//   bodyRef.style.backgroundColor = 'blue';


//   if (scrollY > welcome) {
//     bodyRef.style.backgroundColor = 'white';
//   }

//   if (scrollY > impact) {
//     bodyRef.style.backgroundColor = 'green';
//   }

//   if (scrollY > change) {
//     bodyRef.style.backgroundColor = 'white';
//   }

//   if (scrollY > find) {
//     bodyRef.style.backgroundColor = 'pink';
//   }

//   if (scrollY > active) {
//     bodyRef.style.backgroundColor = 'cyan';
//   }
// })