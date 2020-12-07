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
var backupStoreStr = '';
// HTML elements on page
var localStoreBlock = document.querySelector('[data-test="storeFulfillmentAggregator"]');
var pickItUpBtn = document.querySelector('[data-test="orderPickupButton"]');
var outOfStockMsg = document.querySelector('[data-test="outOfStockMessage"]');
var backupStore = document.querySelector('[data-test="inStoreOnlyMessage"]');

var sameDayDeliveryBlock = document.querySelector('[data-test="scheduledDeliveryBlock"]');
var deliverItBtn = document.querySelector('[data-test="scheduledDeliveryButton"]');
var scheduledDeliveryNotAvailableMsg = document.querySelector('[data-test="scheduledDeliveryNotEligible"]');


var shippingBlock = document.querySelector('[data-test="shippingBlock"]');
var shipItBtn = document.querySelector('[data-test="shipItButton"]');
var shippingUnavailableMsg = document.querySelector('[data-test="notAvailableForShippingMessage"]');

const interval = setInterval(function(){
    if(localStoreBlock == null && sameDayDeliveryBlock == null && shippingBlock == null && shippingUnavailableMsg == null){
        console.log('NOTIFICATION: waiting for HTML elements...');
        localStoreBlock = document.querySelector('[data-test="storeFulfillmentAggregator"]');
        pickItUpBtn = document.querySelector('[data-test="orderPickupButton"]');
        outOfStockMsg = document.querySelector('[data-test="outOfStockMessage"]');
        backupStore = document.querySelector('[data-test="inStoreOnlyMessage"]');
        
        sameDayDeliveryBlock = document.querySelector('[data-test="scheduledDeliveryBlock"]');
        deliverItBtn = document.querySelector('[data-test="scheduledDeliveryButton"]');
        scheduledDeliveryNotAvailableMsg = document.querySelector('[data-test="scheduledDeliveryNotEligible"]');
        
        shippingBlock = document.querySelector('[data-test="shippingBlock"]');
        shipItBtn = document.querySelector('[data-test="shipItButton"]');
        shippingUnavailableMsg = document.querySelector('[data-test="notAvailableForShippingMessage"]');
    } else {
        console.log('starting notification function !!!');
        // Booleans
        var isInStock = false;
        var pickUpInStock = false;
        var localDeliveryInStock = false;
        var shipInStock = false;
        var availabilityType = [];
        
        // str variables
        var productTitle = document.querySelector('[data-test="product-title"]').textContent;
        var productImg = document.querySelector('.slide--active a .slideDeckPicture div div div img').attributes['src'].value;
    
        setTimeout(function(){
            try{
                console.log('NOTIFICATION: checking for HTML elements...');
                // Analyze localStoreBlock

                if(localStoreBlock !== null) {
                    console.log('localStoreBlock found!');
                    if (pickItUpBtn !== null) {
                        if(!pickItUpBtn.classList.contains('hide')){
                            console.log('pickItUpBtn is not hidden');
                            availabilityType.push('pick up');
                            pickUpInStock = true;
                        }
                    } else if(backupStore !== null){
                        console.log('backupStore has a value');
                        availabilityType.push('another store');
                        backupStoreStrSplit = backupStore.textContent.toLowerCase().split(' ');
                        backupStoreStr = backupStoreStrSplit.slice(3,backupStoreStrSplit.length).join(' ');
                        pickUpInStock = true;
                    } else if(outOfStockMsg !== null){
                        console.log('pickItUp is unavailable');
                        pickUpInStock = false;
                    } else {
                        throw "No valid option present on page for localStoreBlock. Code base might need to be updated.";
                    }
                }
                
                if(sameDayDeliveryBlock !== null){
                    console.log('sameDayDeliverBlock found!');
                    if(deliverItBtn !== null){
                        if(!deliverItBtn.classList.contains('hide')){
                            console.log('deliverItBtn is not hidden');
                            availabilityType.push('local delivery');
                            localDeliveryInStock = true;
                        }
                    } else if(scheduledDeliveryNotAvailableMsg !== null){
                        console.log('scheduledDelivery is unavilable');
                        localDeliveryInStock = false;
                    } else {
                        throw "No valid option present on page for sameDayDeliveryBlock. Code base might need to be updated.";
                    }
                }

                if(shippingBlock !== null){
                    console.log('shippingBlock found!');
                    if(shipItBtn !== null){
                        if(!shipItBtn.classList.contains('hide')){
                            console.log('shipItBtn is not hidden');
                            availabilityType.push('shipping');
                            shipInStock = true;
                        }
                    } else if(shippingUnavailableMsg !== null){
                        console.log('shipping unavailable');
                        shipInStock = false;
                    } else {
                        throw "No valid option present on page for shippingBlock. Code base might need to be updated.";
                    }
                }
            } catch(err) {
                console.log(err);
            }
        
        
            pickUpInStock || localDeliveryInStock || shipInStock ? isInStock = true : isInStock = false;

            if(isInStock){
                console.log('ITEM IS IN STOCK');
                var notificationTitle = `${productTitle} :: ${toTitleCase(availabilityType.join(', '))}`;
                var n_options = {
                    body: `${productTitle} is now in stock and available via ${availabilityType.join(', ')}!\nClick this notification to view this product now.`,
                    silent: false,
                    icon: productImg,
                    tag: `target:${productTitle.toLowerCase().replace(' ','_')}`,
                    renotify: true,
                    requireInteraction: true,
                    vibrate: true
                };
                if(availabilityType == 'another store'){
                    n_options.body += `\nStore: ${toTitleCase(backupStoreStr)}`;
                }
                

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
        }, 5000);
        clearInterval(interval);
    }
}, 100);

