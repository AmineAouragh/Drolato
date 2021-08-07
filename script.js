$('.cup-type').click(() => {
  $('.cone-type').addClass("disabled")
})

// Initializing tooltips everywhere on the page
$(() => {
  $('[data-toggle="tooltip"]').tooltip()
})

// ******* ORDER DETAILS TEXT ********* //
$("#quantity_scoops_coconut_mango").on("input change", e => {
  $("label[for='coconutMangoQuantityInput']").text(`Quantity: ${e.target.value}`)
  $(".coconut_mango_prize").text(`${e.target.value}` * 2.30).addClass("text-success")
})

$("input[type='button']").click(() => {

  const gelato_type = $("input[name='gelato-type']:checked").val()
  const gelato_quantity = $("#quantity_scoops_coconut_mango").val()
  const gelato_type_desc = gelato_quantity == 1 ? gelato_type : `${gelato_type}s`

  if (gelato_type) {
    $(".order-detail").text(`You chose ${gelato_quantity} ${gelato_type_desc}`)
  }

})

// ******** SENDING EMAIL TO CUSTOMERS *********** //


// ******** CHECK FORM FIELDS VALIDITY ********** //
const isValidName = name => {
  let regex = /[^0-9.*_?!]{2,}/gi
  return (name.match(regex)) ? true : false
}

$("button[type='submit']").click(e => {

  e.preventDefault()
  e.stopPropagation()

  const customer_first_name = $("#firstNameInput").val()
  const customer_last_name = $("#lastNameInput").val()
  const customer_email = $("#emailInput").val()

  $(".customer_name").text(`${customer_first_name} ${customer_last_name}!`)
  $(".customer_email").text(`${customer_email}`)

  setTimeout(() => {
    $(".toast").toast('show')
  }, 2000)

  setTimeout(() => {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "drolato@gmail.com",
      Password: "michaelcorleone1974",
      To: `${customer_email}`,
      From: "drolato@gmail.com",
      Subject: "Drolato Order",
      Body: `Dear ${customer_first_name} ${customer_last_name}`
    })
    .then(() => {
      console.log("Email sent successfully")
    })
  }, 3000)


})

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
//****************//
/*
$('.checkout-button').click(() => {
  // Check whether the user wants a cone or a cup
  const getIcecreamType = $('.icecream-type').val()
  localStorage.setItem("Icecream Type", getIcecreamType)
  

  // Get the quanity of scoops of items //
  const getQuantityCoconutMango = $('.quantity-scoops-coconut-mango').val()
  localStorage.setItem("Coconut Mango Quantity", getQuantityCoconutMango)

  const getQuantitySaltedCaramel = $('.quantity-scoops-salted-caramel').val()
  localStorage.setItem("Salted Caramel Quantity", getQuantitySaltedCaramel)

  const getQuantityStrawberriesCream = $('.quantity-scoops-strawberries-cream').val()
  localStorage.setItem("Strawberries and Cream Quantity", getQuantityStrawberriesCream)

  const total_quantity = parseInt(getQuantityCoconutMango) + parseInt(getQuantitySaltedCaramel) + parseInt(getQuantityStrawberriesCream)

  // calculate the total cost of the order //
  let total_coconut_mango = coconut_mango_price * getQuantityCoconutMango
  let total_salted_caramel = salted_caramel_price * getQuantitySaltedCaramel
  let total_strawberries_cream = strawberries_cream_price * getQuantityStrawberriesCream

  let total_price = total_coconut_mango + total_salted_caramel + total_strawberries_cream

  let messageText = `Nice to meet you ${localStorage.getItem("Customer Name")}! You ordered ${total_quantity} ice creams in type: ${getIcecreamType}. \nYour total order cost is: $ ${total_price.toFixed(2)}`; 

  // Alert with final amount
  alert(messageText);
});
*/
