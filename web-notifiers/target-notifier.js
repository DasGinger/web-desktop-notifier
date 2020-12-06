// Install an auto refresh add-on for your browser that allows you to execute Javascript code when refreshed
// Firefox: https://addons.mozilla.org/en-US/firefox/addon/tab-reloader/
// Chrome: https://chrome.google.com/webstore/detail/tab-reloader-page-auto-re/dejobinhdiimklegodgbmbifijpppopn?hl=en
//
// MAKE SURE TO ALLOW DESKTOP NOTIFICATIONS FROM THE TARGET TAB

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  };

window.addEventListener('load', function(){
    // Booleans
    var isInStock = false;
    var availabilityType = '';
    
    // constant variables
    var productTitle = document.querySelector('[data-test="product-title"]').textContent;
    var productImg = document.querySelector('.slide--active a .slideDeckPicture div div div img').attributes['src'].value;

    // HTML elements on page
    pickItUpBtn = document.querySelector('[data-test="orderPickupButton"]');
    deliverItBtn = document.querySelector('[data-test="scheduledDeliveryButton"]');
    shipItBtn = document.querySelector('[data-test="shipItButton"]');
    outOfStockMsg = document.querySelector('[data-test="outOfStockMessage"]');

    // Check each button for a class named 'hide' denoting that it is hidden and unavailable
    // There is a heirachy of priority - realized by the below logic statement
    try{
        while((shipItBtn == null && deliverItBtn == null && pickItUpBtn == null) && outOfStockMsg == null) {
            continue;
        }

        if(outOfStockMsg == null){
            // wait for elements to load - target's website is slow :)
            if(!shipItBtn.classList.contains('hide')){
                availabilityType = 'shipping';
                isInStock = true;
            } else if (!deliverItBtn.classList.contains('hide')) {
                availabilityType = 'delivery';
                isInStock = true;
            } else if (!pickItUpBtn.classList.contains('hide')) {
                availabilityType = 'pick up';
                isInStock = true;
            } else {
                throw 'No valid HTML elements are present on the webpage. Make sure you are on a product page on target.com';
            }
        } else {
            // product is out of stock
            console.log(`${productTitle} is out of stock. Skipping notification...`);
        }
    } catch(err) {
        console.log(err);
    }


    var notificationTitle = `${productTitle} :: ${toTitleCase(availabilityType)}`;
    var n_options = {
        body: `${productTitle} is now in stock and available via ${availabilityType}!\nClick this notification to view this product now.`,
        silent: false,
        icon: productImg,
        tag: `target:${productTitle}`,
        renotify: true,
        requireInteraction: true,
        vibrate: true
    };

    if(isInStock){
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
    }
});