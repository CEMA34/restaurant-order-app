

const containerDiv = document.getElementById("container")
const orderDiv = document.getElementById("order")
const finalOrderDiv = document.getElementById("final-order")
const orderContainer = document.getElementById("order-container")
const modal = document.getElementById("modal")

const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1
    },
    {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        id: 2
    },
    {
        name: "Taco",
        ingredients: ["Beef, cheese, lettuce, tomato, guacamole, corn tortilla"],
        price: 11,
        emoji: "🌮",
        id: 3
    },
    {
        name: "Spaghetti",
        ingredients: ["Spaghetti noodles, tomato sauce, garlic,tomato"],
        price: 15,
        emoji: "🍝",
        id: 4
    }

]



let pickedMenu = []

containerDiv.addEventListener("click", (e) => {

    if (e.target.className == "orderButton") {
        pickedMenu = menuArray.find(selectedMenu => {
            return (
                selectedMenu.id == e.target.id
            )
        })
        renderOrder()
    }

})


finalOrderDiv.addEventListener("click", (e) => {
    if (e.target.className === "completeOrderBtn") {
        renderPaymentModal()
    }
})

modal.addEventListener("click", (e) => {
    if (e.target.className === "payBtn") {
        payBtnHandler()
    }
})


function renderMenu() {


    menuArray.map(menuItems => {
        containerDiv.innerHTML +=
            `<div class="menuItemsDiv">
                <p class="emoji-para">${menuItems.emoji}</p>
                    <div class="menuItemsInnerDiv">
                        <h3>${menuItems.name}</h3>
                        <p class="ingredients-para">${menuItems.ingredients.map(singleIngredient => singleIngredient)}</p>
                        <p class="price-para">${"$" + menuItems.price}</p>
                    </div>
                    <div>
                        <button class="orderButton" id="${menuItems.id}">+</button>
                   </div>
            </div>
          <hr>`
    })
}

renderMenu()




function renderOrder() {

    const orderTitle = document.getElementById("order-title")


    orderTitle.style.display = "block"
    orderTitle.innerText = "Your order"

    orderDiv.innerHTML += `

    <div class="orderItemsDiv">

    <div class="orderNameDiv">
        <h1 class="menuName">${pickedMenu.name}</h1>
        
    </div>  
        <p class="menuPrice">${"$" + pickedMenu.price}</p>
    </div>`

    

    finalOrderDiv.innerHTML = `
    <div class="finalOrderDiv">
        <hr>
    </div>
    <button class="completeOrderBtn">Complete Order</button>  
    `
    
}


function renderPaymentModal() {
    console.log(document.querySelector(".menuPrice").innerHTML*pickedMenu.price)
    modal.style.display = "block"
    orderContainer.style.opacity = "0.5"

    modal.innerHTML = `
   <div class="modal-inner-div">
        <h1>Enter card details</h1>
        <form class="modal-form">
        <input class="input" type="text" placeholder="Enter your name" required/>
        <input class="input" type="text" placeholder="Enter card number" required/>
        <input class="input" type="text" placeholder="Enter CVV" required/>
        <button class="payBtn" type="submit">Pay</button>
        </form>   
   </div>`

}

function payBtnHandler() {

    if (document.querySelector(".input").value) {

        document.querySelector(".modal-form").addEventListener("submit", (e) => {
            e.preventDefault()
        })

        modal.style.display = "none"
        orderDiv.style.display = "none"
        finalOrderDiv.style.display = "none"
        orderContainer.style.opacity = "1"
        const orderTitle = document.getElementById("order-title")
        orderTitle.style.display = "none"
        const confirmationText = document.getElementById("confirmation-text")
        confirmationText.style.display = "block"
        confirmationText.innerHTML = `<h1>Thanks,Your order is on its way!</h1>`
    }

}







