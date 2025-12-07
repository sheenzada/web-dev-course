document.addEventListener('DOMContentLoaded',()=>{
    const items = document.querySelectorAll('.animate-item');
    items.forEach((item,index)=>{
        setTimeout(() =>{
            item.classList.add('show');
        },index*900);
    })
})