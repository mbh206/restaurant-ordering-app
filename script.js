import { menuArray } from './data.js'

let ordersArray = []

document.addEventListener('click', (e) => {
    if (e.target.dataset.item){
        ordersArray.push(menuArray[e.target.dataset.item])
        document.getElementById('cart').style.display =  'block'
        getCartItemHtml(ordersArray)  
        getTotal(ordersArray)
    } else if (e.target.dataset.remove) {
        if (ordersArray === []){
            document.getElementById('cart').style.display =  'none'
        }
        ordersArray.splice(e.target.dataset.remove, 1)
        getCartItemHtml(ordersArray)
        getTotal(ordersArray)
    } else if (e.target.dataset.complete) {
        document.getElementById('modal-div').style.display =  'block'
    } else if (e.target.dataset.closebtn) {
        document.getElementById('modal-div').style.display =  'none'
    }
    else if (e.target.dataset.pay) {
        document.getElementById('modal-div').style.display =  'none'
        document.getElementById('cart').innerHTML =  `
        <div class="order-complete">
            <h3 class="order-complete-title">
                Thanks, Dude! Your order is on the way!
            </h3>
        </div>`
    }
})

function getTotal(items){
    let total = 0
    items.forEach(item => {
        total += item.price})
    document.getElementById('cart-total-price').innerText = '$'+total
    }

function getCartItemHtml(items) {
    document.getElementById('cart-order-items').innerHTML = items.map((item, index) => {
        return `
        <div class="cart-item-container">
            <div class="cart-item-info">
                <h1 class="cart-item-name">${item.name}</h1>
                <h3 class="cart-item-remove" data-remove="${index}">remove</h3>
            </div>
            <div class="cart-item-totals">
                <h3 class="cart-item-price">$${item.price}</h3>
            </div>
        </div>`
        }).join('')
    }

function getMenuItems(items){
    document.getElementById('menu-section').innerHTML = items.map(item => {
        return `
        <div class="item-container">
            <div class="item-img">${item.emoji}</div>
            <div class="item-info">
                <h1 class="item-name">${item.name}</h1>
                <h3 class="item-ingredients">${item.ingredients.join(', ')}</h3>
                <h3 class="item-price">$${item.price}</h3>
            </div>
            <div class="btns">
                <button data-item="${item.id}" >+</button>
            </div>
        </div>
            <hr class="divider">
        `
    }).join('')
}

getMenuItems(menuArray)