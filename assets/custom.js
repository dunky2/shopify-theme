async function updateCartItem(e, id) {
    let qty = Number(e.target.value);
    let itemId = Number(id)
    let updates = {
        [itemId]: qty
      };
      const res = await fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates })
      })
      const result = await res.json()
      if(res.ok){
        console.log(result.item_count)
        CartUpdate()
      }     
}

async function CartUpdate(){
    const res = await fetch(window.Shopify.routes.root + "?sections=cart-drawer")
    const result = await res.json()
    
// Create a temporary element to parse the HTML content
const tempElement = document.createElement('div');
tempElement.innerHTML = result['cart-drawer'];

// Use getElementById to retrieve the specific <div> element by its ID
const specificDiv = tempElement.querySelector('#cartDrawer');

// Get the HTML content of the specific <div> element
const specificDivHTML = specificDiv ? specificDiv.innerHTML : '';

document.getElementById("cartDrawer").innerHTML=specificDivHTML
    
}

function simpleVariant(e){
  const id = e.value
  window.history.replaceState(null,null,"?variant="+id)
}

 async function addTocartProductPage(e){
  const resData = await fetch(window.Shopify.routes.root + "?sections=cart-drawer")
  const resultData = await res.json()
  
  return
  $(e).addClass("pending")
 let form  = $(e).closest("form")
 let formData = new FormData(form[0]);

 const res = await fetch('/cart/add.js', {
  method: 'POST',
  body: formData
})
const result = await res.json()
if(res.ok){
  console.log("success to add product!!!")
  $(e).removeClass("pending")
  CartUpdate()
}
}