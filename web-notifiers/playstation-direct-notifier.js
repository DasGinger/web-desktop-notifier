// Install an auto refresh add-on for your browser that allows you to execute Javascript code when refreshed
// Firefox: https://addons.mozilla.org/en-US/firefox/addon/tab-reloader/
// Chrome: https://chrome.google.com/webstore/detail/tab-reloader-page-auto-re/dejobinhdiimklegodgbmbifijpppopn?hl=en
//
// MAKE SURE TO ALLOW DESKTOP NOTIFICATIONS FROM THE PLAYSTATION DIRECT TAB

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  };

// Booleans
var isInStock = false;
var queueIsLive = false;

// constant variables
var productTitle = document.querySelector('.sony-text-h1').textContent;
var productImg = document.querySelector('.productContainer hero-image picture .hero-banner').attributes['src'].value;
var notificationTitle = '';
var n_options = {
    body: `${productTitle} is now in stock!\nClick this notification to view this product now.`,
    silent: false,
    icon: productImg,
    tag: `playstation_direct:${productTitle.toLowerCase().replace(' ','_')}`,
    renotify: true,
    requireInteraction: true,
    vibrate: true
};

// HTML elements on page
var addToCartBtn = document.querySelector('[aria-label="Add to Cart"]');
var outOfStockMsg = document.querySelector('.button-placeholder .out-stock-wrpr .sony-text-body-1');
var siteTitle = document.querySelector('head title');

try {
    if(!siteTitle.textContent.toLowerCase().includes('queue')){
        while(addToCartBtn == null && outOfStockMsg == null) {
            continue;
        }

        if(outOfStockMsg.parentElement.classList.contains('hide')){
            if(!addToCartBtn.classList.contains('hide')){
                isInStock = true;
                notificationTitle = `${productTitle} is in stock!`;
            } else {
                throw 'No valid HTML elements are present on the webpage. Make sure you are on a product page on direct.playstation.com';
            }
        } else {
            // product is out of stock
            console.log(`${productTitle} is out of stock. Skipping notification...`);
        }
    } else {
        queueIsLive = true;
        notificationTitle = 'Playstation Direct queue has started!';
        n_options.body = 'Click this notification to go to Playstation Direct and take your place in line. Good luck!';
    }
} catch(err) {
    console.log(err);
}

if(isInStock || queueIsLive){
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
        var notification = new Notification(notificationTitle, n_options);
    }

    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification(notificationTitle, n_options);
          }
        });
      }
}