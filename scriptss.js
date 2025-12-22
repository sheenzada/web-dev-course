document.querySelector('.menu-toggle').addEventListener('click' , () => {
    document.querySelector('header ul').style.display =
    document.querySelector('header ul').style.display === 'flex' ? 'none' : 'flex';

});

document.querySelector('#cart').addEventListener('click', () => {
    document.getElementById('cart-model').style.display = 'block';
});

document.getElementById('close-cart').addEventListener('click' , () => {
    document.getElementById('cart-modal').style.display = 'none';
});