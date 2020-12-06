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

console.log('TAB RELOADER SCRIPT TRIGGERED');
// HTML elements on page
var pickItUpBtn = document.querySelector('[data-test="orderPickupButton"]');
var deliverItBtn = document.querySelector('[data-test="scheduledDeliveryButton"]');
var shipItBtn = document.querySelector('[data-test="shipItButton"]');
var outOfStockMsg = document.querySelector('[data-test="outOfStockMessage"]');
var backupStore = document.querySelector('[data-test="inStoreOnlyMessage"]');

const interval = setInterval(function(){
    if(shipItBtn == null && deliverItBtn == null && pickItUpBtn == null && outOfStockMsg == null){
        console.log('NOTIFICATION: waiting for HTML elements...');
        pickItUpBtn = document.querySelector('[data-test="orderPickupButton"]');
        deliverItBtn = document.querySelector('[data-test="scheduledDeliveryButton"]');
        shipItBtn = document.querySelector('[data-test="shipItButton"]');
        outOfStockMsg = document.querySelector('[data-test="outOfStockMessage"]');
        backupStore = document.querySelector('[data-test="inStoreOnlyMessage"]');
    } else {
        console.log('starting notification function !!!');
        // Booleans
        var isInStock = false;
        var availabilityType = '';
        
        // constant variables
        var productTitle = document.querySelector('[data-test="product-title"]').textContent;
        var productImg = document.querySelector('.slide--active a .slideDeckPicture div div div img').attributes['src'].value;
        
        // Check each button for a class named 'hide' denoting that it is hidden and unavailable
        // There is a heirachy of priority - realized by the below logic statement
        var doubleCheck = true;
        setTimeout(function(){
            while(true){
                try{
                    console.log('NOTIFICATION: checking for HTML elements...');
                    if(outOfStockMsg == null){
                        if(!shipItBtn.classList.contains('hide')){
                            if(doubleCheck){
                                doubleCheck = false;
                                continue;
                            } else {
                                console.log(shipItBtn);
                                availabilityType = 'shipping';
                                isInStock = true;
                                break;
                            }
                        } else if (!deliverItBtn.classList.contains('hide')) {
                            if(doubleCheck){
                                doubleCheck = false;
                                continue;
                            } else {
                                availabilityType = 'delivery';
                                isInStock = true;
                                break;
                            }
                        } else if (!pickItUpBtn.classList.contains('hide')) {
                            if(doubleCheck){
                                doubleCheck = false;
                                continue;
                            } else {
                                availabilityType = 'pick up';
                                isInStock = true;
                                break;
                            }
                        } else {
                            throw 'No valid HTML elements are present on the webpage. Make sure you are on a product page on target.com';
                            break;
                        }
                    } else if(backupStore !== null) {
                        if(backupStore.textContent.toLowerCase().includes('in stock')){
                            availabilityType = 'another store';
                            isInStock = true;
                            break;
                        }
                    } else {
                        // product is out of stock
                        console.log(`${productTitle} is out of stock. Skipping notification...`);
                        break;
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        }, 2000);
    
        var notificationTitle = `${productTitle} :: ${toTitleCase(availabilityType)}`;
        var n_options = {
            body: `${productTitle} is now in stock and available via ${availabilityType}!\nClick this notification to view this product now.`,
            silent: false,
            icon: productImg,
            tag: `target:${productTitle.toLowerCase().replace(' ','_')}`,
            renotify: true,
            requireInteraction: true,
            vibrate: true
        };
        if(availabilityType == 'another store'){
            n_options.body += `\nStore: ${toTitleCase(backupStore.textContent.toLowerCase().split('in stock')[1])}`;
        }
        
        console.log('NOTIFICATION: Logically handling notification creation...');
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
        clearInterval(interval);
    }
}, 100);

