// ************************************ //
// ********* SEARCH FEATURE *********** //
// ************************************ //

var products = [
  {
    "name": "Coconut Mango",
    "description": "",
    "price": "$2.30"
  },
  {
    "name": "Salted Caramel",
    "description": "",
    "price": "$2.50"
  },
  {
    "name": "Strawberries And Cream",
    "description": "",
    "price": "$1.90"
  }
]


const handleSearch = event => {

  event.preventDefault()

  var searchTerm = $("#searchProductBar").val()

  var tokens = searchTerm.toLowerCase().split(' ').filter(token => {
                   return token.trim() !== ''
                 })

  if (tokens.length) {

    var searchTermRegex = new RegExp(tokens.join('|'), 'gim')

    var filteredList = products.filter(product => {

      var productString = ''

      for (var key in product) {

        if (product.hasOwnProperty(key) && product[key] !== '') {
          productString += product[key].toString().toLowerCase().trim() + ' '
        }

      }

      return productString.match(searchTermRegex)

    })

    console.log(filteredList)

  }

}

$(".search-btn").on('click', handleSearch)

products_names = []

for (var product of products) {
  products_names.push(product.name)
}

console.log(products_names)

$(() => {
  $("#searchProductBar").autocomplete({
    source: products_names
  })
})

// ************************************** //
// ********* SELECT PRODUCTS  *********** //
// ************************************** //

const addToCart = (product_id, cart) => {

  cart.push(product_id)
  $(".badge-notification").text(cart.length)

  switch(product_id) {
    case 1:
      console.log("You added coconut mango to your cart")
      break 
    case 2:
      console.log("You added salted caramel to your cart")
      break 
    case 3:
      console.log("You added strawberry and cream to your cart")
      break 
  }

  console.log(`You have ${cart.length} product(s) now on your cart!`)

}

const removeFromCartAndUpdateStatus = (product_id, cart) => {

  for (let i = 0; i < cart.length; i++) {
    if (cart[i] === product_id) {
      cart.splice(i, 1)
      i-- 
    } 
  }

  switch(product_id) {
    case 1:
      console.log("You removed coconut mango from your cart!")
      break 
    case 2:
      console.log("You removed salted caramel from your cart!")
      break 
    case 3:
      console.log("You removed strawberries and cream from your cart!")
      break 
  }

  if (cart.length == 0) {
    $(".badge-notification").text("")
    console.log("The cart is empty now!")
  } else {
    $(".badge-notification").text(cart.length)
    console.log(`You have ${cart.length} product(s) on your cart now!`)
  }

}

var cart = []

const coconut_mango_ID = parseInt($(".first_product_identificator").text())
const salted_caramel_ID = parseInt($(".second_product_identificator").text())
const strawberries_cream_ID = parseInt($(".third_product_identificator").text())

//console.log("Before the customer decision, the cart is empty!")

$("#add-btn-coconut").click(function() {
  $(this).toggleClass('btn-primary btn-success')
  $(".card-first").toggleClass("border border-4 border-success bg-success")
  $(".badge_first_product").toggleClass("badge-success badge-info")
  $("#coconut-mango-description").toggleClass("text-light")
  $("#coconut-mango-scoop-price").toggleClass("text-success text-info")
  // PRODUCT STATUS
  if($(".card-first").hasClass("border-success")) {
    //console.log("1st product selected")
    addToCart(coconut_mango_ID, cart)
  } else {
    //console.log("1st product not selected")
    if (cart.length >= 1) {
      removeFromCartAndUpdateStatus(coconut_mango_ID, cart)
    }
  }  
})

$("#add-btn-saltedCaramel").click(function() {
  $(this).toggleClass('btn-primary btn-success')
  $(".card-second").toggleClass("border border-4 border-success bg-success")
  $(".badge_second_product").toggleClass("badge-success badge-info")
  $("#salted-caramel-description").toggleClass("text-light")
  $("#salted-caramel-scoop-price").toggleClass("text-success text-info")
  // PRODUCT STATUS
  if($(".card-second").hasClass("border-success")) {
    //console.log("2nd product selected")
    addToCart(salted_caramel_ID, cart)
  } else {
    //console.log("2nd product not selected")
    if (cart.length >= 1) {
      removeFromCartAndUpdateStatus(salted_caramel_ID, cart)
    }
  } 
})

$("#add-btn-strawberries").click(function() {
  $(this).toggleClass('btn-primary btn-success')
  $(".card-third").toggleClass("border border-4 border-success bg-success")
  $(".badge_third_product").toggleClass("badge-success badge-info")
  $("#strawberries-cream-description").toggleClass("text-light")
  $("#strawberries-cream-scoop-price").toggleClass("text-success text-info")
  // PRODUCT STATUS
  if($(".card-third").hasClass("border-success")) {
    //console.log("3rd product selected")
    addToCart(strawberries_cream_ID, cart)
  } else {
    //console.log("3rd product not selected")
    if (cart.length >= 1) {
      removeFromCartAndUpdateStatus(strawberries_cream_ID, cart)
    }
  } 
})

// ******************************************************* //
// ************ ADD SELECTED PRODUCTS TO CART ************ //
// ******************************************************* //



// Initializing tooltips everywhere on the page
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

// ************************************ //
// ******* ORDER DETAILS TEXT ********* //
// ************************************ //

$("#quantity_scoops_coconut_mango").on("input change", e => {
  $("label[for='coconutMangoQuantityInput']").text(`Quantity: ${e.target.value}`)
  var quantityInput = e.target.value 
  var price_per_quantity = (quantityInput * 2.30).toFixed(2)
  $(".coconut_mango_prize").text(`$${price_per_quantity}`).addClass("text-success")
})


// ********* CHOOSING GELATO TYPE ********** //

$("input[type='button']").click(() => {

  const gelato_type = $("input[name='gelato-type']:checked").val()
  const gelato_quantity = $("#quantity_scoops_coconut_mango").val()
  const gelato_type_desc = gelato_quantity == 1 ? gelato_type : `${gelato_type}s`

  if (gelato_type) {
    $(".order-detail").text(`You chose ${gelato_quantity} ${gelato_type_desc}`)
  }

})

// *********************************************** //
// ******** SENDING EMAIL TO CUSTOMERS *********** //
// *********************************************** //

// ********************************************** //
// ******** CHECK FORM FIELDS VALIDITY ********** //
// ********************************************** //

const isValidName = name => {
  let regex = /^[a-zA-Z]{2,}$/gi
  return (name.match(regex)) ? true : false
}

/*
$("button[type='submit']").click(e => {
  
  e.preventDefault()
  e.stopPropagation()
  
    $(".spinner-border").removeClass("visually-hidden")
    $(".confirm-button").addClass("visually-hidden")
    $(".loading-btn").removeClass("visually-hidden")
    setTimeout(() => {
      $(".spinner-border").addClass("visually-hidden")
      $(".confirm-button").removeClass("visually-hidden")
      $(".loading-btn").addClass("visually-hidden")
      //$("#invoiceModal").modal('show')
    }, 2800)


  // ******************************************* //
  // ********* GETTING CUSTOMER DATA *********** //
  // ******************************************* //
  
  const customer_first_name = $("#firstNameInput").val()
  const customer_last_name = $("#lastNameInput").val()
  const customer_email = $("#emailInput").val()

  // DETECTING AND REJECTING BAD WORDS

  var myHeaders = new Headers()
  myHeaders.append("apikey", "n1hkql87gggpF32GtVSrq3ZebenC90DQ")

  var raw = customer_first_name

  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders,
    body: raw
  }

  fetch("https://api.promptapi.com/bad_words?censor_character=*", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log(`ERROR: ${error}`))

  setTimeout(() => {
    $("#bad-word-notice").removeClass("visually-hidden")
  }, 1000)


  ///////////////////////////////////////////////////////////////

  if (isValidName(customer_first_name)) {
    console.log("First name is valid")
  } else {
    if (customer_first_name.length == 0) {
      console.log("Please provide your first name!")
    } else {
      console.log("First name is invalid")
    }
  }

  if (isValidName(customer_last_name)) {
    console.log("Last name is valid")
  } else {
    if (customer_last_name.length == 0) {
      console.log("Please provide your last name!")
    } else {
      console.log("Last name is invalid")
    }
  }


  // Add customer's data in toast message 

  $(".customer_name").text(`${customer_first_name} ${customer_last_name}!`)
  $(".customer_name").addClass("alert-link")
  $(".customer_email").text(`${customer_email}`)
  $(".customer_email").addClass("alert-link")
  
  
  setTimeout(() => {
    if (customer_first_name.length >= 2 && customer_last_name.length >= 2) {
      $(".toast").toast('show')
    }
  }, 3000)
  


})

*/

// *********************************************** //
// ************ LIKE PRODUCTS FEATURE ************ //
// *********************************************** //

var liked_products = []


const setLikeBtnStyleOnClick = btn => {
  $(btn).click(function() {
    if ($(this).hasClass("liked")) {
      $(this).removeClass("liked")
    } else {
      $(this).addClass("liked")
    }
  })
}

setLikeBtnStyleOnClick("#like-coconut-mango")

setLikeBtnStyleOnClick("#like-salted-caramel")

setLikeBtnStyleOnClick("#like-strawberries-cream")



// ************************************************** //
// ************ LIKED PRODUCTS SECTION ************** //
// ************************************************** //

const addToLikedSection = (id, name, price) => {

  // Containers
  var prod_header_container = `<div id='liked_product_header_${id}'></div>`
  var prod_name_container = `<h5 id='liked_product_name_${id}'></h5>`
  var prod_price_container = `<span id='liked_product_price_${id}'></span>`

  // Retrieving Products Components IDs
  var prod_header_container_id = $(`${prod_header_container}`).attr("id")
  var prod_name_container_id = $(`${prod_name_container}`).attr("id")
  var prod_price_container_id = $(`${prod_price_container}`).attr("id")


  $("#liked_products_container").append(prod_header_container)

  $(`#${prod_header_container_id}`).append(prod_name_container)

  $(`#${prod_header_container_id}`).append(prod_price_container)

  // Adding text content to products components
  $(`#${prod_name_container_id}`).text(`${name}`)
  $(`#${prod_price_container_id}`).text(`${price}`)

  // Styling Products Components
  $(`#${prod_header_container_id}`).addClass("d-flex bd-highlight mb-3")
  $(`#${prod_name_container_id}`).addClass("p-2 bd-highlight")
  $(`#${prod_price_container_id}`).addClass("p-2 ms-auto bd-highlight text-success")

  var content = $("#liked_products_container").html()
  console.log(content)

  var count = $("#liked_products_container div")
  console.log(count.length)

}

$("#like-coconut-mango").click(function() {

  var coconut_mango_price = $("#coconut-mango-scoop-price").text()

  if ($(this).hasClass("liked")) {
    addToLikedSection(coconut_mango_ID, "Coconut Mango", coconut_mango_price)
  }

})

$("#like-salted-caramel").click(function() {
  var salted_caramel_price = $("#salted-caramel-scoop-price").text()
  if ($(this).hasClass("liked")) {
    addToLikedSection(salted_caramel_ID, "Salted Caramel", salted_caramel_price)
  }
})


// ************************************************* //
// ************ SHARE PRODUCTS FEATURE ************* //
// ************************************************* //

const urlToShare = "https://drolato-part-3-number-calculation-3.amineaouragh.repl.co/index.html"


const text = "I just found an awesome gelato flavor! I cannot wait for you to try it and tell me what you think! YUMMY!"

const textToShareOnTwitter = `${text} You can get a look in here: `

$(".share-link-telegram").attr("onclick", `window.open('https://t.me/share/url?url=${urlToShare}&text=${text}')`)

$(".share-link-twitter").attr("href", `https://twitter.com/intent/tweet?text=${textToShareOnTwitter}&url=${urlToShare}&via=AmineAouragh&hashtags=gelato,icecream`)

$("#share-coconut-mango").click(function () {
  $(".listing").fadeToggle(600);
});

// *********************************************** //
// ************ GENERATING PROMO CODE ************ //
// *********************************************** //

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqr*_stuvwxyz"
const length = 14
let promoCode = ""

for (let i = 0; i < length; i++) {
  const randomNum = Math.floor(Math.random() * characters.length)
  promoCode += characters[randomNum]
}

//console.log(`Your promo code: ${promoCode}`) 
$(".promo-code").text(promoCode)

//****************//
// Disabling form submissions if there are invalid 

$(() => {
  'use strict'

  var forms = document.querySelectorAll(".order-form")

  Array.prototype.slice.call(forms)
    .forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add("was-validated")

      }, false)
    })
})
