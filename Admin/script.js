

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const asideLogo = document.querySelector(".logo");
const themeToggler = document.querySelector(".theme-toggler");

// show side bar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
    asideLogo.style.display = 'block';
    sideMenu.style.background = 'white';


})
// close side bar
closeBtn.addEventListener('click',() => {
    sideMenu.style.display ='none';

})

//change theme
themeToggler.addEventListener('click', ()=> {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');



})

//fill order in the table
Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent =`
     <td>${order.productName}</td>
              <td>${order.productNumber}</td>
              <td>${order.paymentStatus}</td>
              <td class="${order.shipping === 'Declined'? 'danger' : order.shipping === 'pending'? 'warning':  'primary'}">${order.shipping}</td>
              <td class="primary">Details</td>

    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);


})