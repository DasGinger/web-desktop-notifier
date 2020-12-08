// Install an auto refresh add-on for your browser that allows you to execute Javascript code when refreshed
// Firefox: https://addons.mozilla.org/en-US/firefox/addon/tab-reloader/
// Chrome: https://chrome.google.com/webstore/detail/tab-reloader-page-auto-re/dejobinhdiimklegodgbmbifijpppopn?hl=en
//
// MAKE SURE TO ALLOW DESKTOP NOTIFICATIONS FROM THE BEST BUY TAB

const TIMEOUT = 2000;

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  };

console.log('TAB RELOADER SCRIPT TRIGGERED');
// HTML elements on page
var addToCartBtn = document.querySelector('.add-to-cart-button');

const interval = setInterval(function(){
    if(addToCartBtn == null){
        console.log('NOTIFICATION: waiting for HTML elements...');
        addToCartBtn = document.querySelector('#add-to-cart-button');
    } else {
        console.log('starting notification function !!!');
        // Booleans
        var isInStock = false;
        
        // str variables
        var productTitle = document.querySelector('.heading-5').textContent.replace(/\n/g,'');
        var productImg = document.querySelector('.primary-image-container .primary-button img').attributes['src'].value;
    
        setTimeout(function(){
            try{
                console.log('NOTIFICATION: analyzing HTML elements...');
                // Analyze localStoreBlock
                if(addToCartBtn.textContent.toLowerCase() == 'add to cart'){
                    isInStock = true;
                } else if(addToCartBtn.textContent.toLowerCase() == 'sold out') {
                    isInStock = false;
                } else {
                    throw "The text value in the add to cart button is unknown. Code base might need to be updated.";
                }
            } catch(err) {
                console.log(err);
            }

            if(isInStock){
                console.log('ITEM IS IN STOCK');
                var notificationTitle = `${productTitle} is in stock!}`;
                var n_options = {
                    body: `${productTitle} is now in stock and available!\nClick this notification to view this product now.`,
                    silent: false,
                    icon: productImg,
                    tag: `amazon:${productTitle.toLowerCase().replace(' ','_')}`,
                    renotify: true,
                    requireInteraction: true,
                    vibrate: true
                };

                console.log('NOTIFICATION: Logically handling notification creation...');
                if (!("Notification" in window)) {
                    alert("This browser does not support desktop notification");
                }
            
                else if (Notification.permission === "granted") {
                    var notification = new Notification(notificationTitle, n_options);
                }
            
                else if (Notification.permission !== 'denied' || Notification.permission === "default") {
                    Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        var notification = new Notification(notificationTitle, n_options);
                    }
                    });
                }
            } else {
                console.log(`This item is unavailable. Skipping notification...`);
            }
        }, TIMEOUT);
        clearInterval(interval);
    }
}, 100);

