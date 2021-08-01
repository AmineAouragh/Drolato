$('.cup-type').click(() => {
  $('.cone-type').addClass("disabled")
})

// Initializing tooltips everywhere on the page
$(() => {
  $('[data-toggle="tooltip"]').tooltip()
})
// This function checks whether the name is empty
const isValidName = name => {

  let regex = /[a-zA-Z]{2,}\D/gi
  return (name.match(regex)) ? true : false

}
//****************//

//****************//
/*
$('.checkout-button').click(() => {
  // Check whether the user wants a cone or a cup
  const getIcecreamType = $('.icecream-type').val()
  localStorage.setItem("Icecream Type", getIcecreamType)
  
  // Get the user's name at checkout
  const getName = $('.name-for-checkout').val();
  localStorage.setItem("Customer Name", getName)

  // Check if the name input is empty
  if (!isValidName(getName)) {
    alert('Please enter a name for the order!');
    return;
  }

  // This is the price of each product //
  const coconut_mango_price = 2.3;
  const salted_caramel_price = 2.5;
  const strawberries_cream_price = 1.90;

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
