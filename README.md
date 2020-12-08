# Web Desktop Notifier
#### Javascript snippets for auto reload browser add-ons

This is a library of javascript snippets that can be used with various [auto refresh browser add-ons](https://www.reddit.com/r/chrome/comments/8u89am/safe_and_reliable_auto_refresh/) in most modern browsers (quit using IE, please for all us). These scripts reference various HTML elements on the given store's product page and reports back via desktop notifications on product stock status.

## Quick Links
* [Auto Refresher Add-Ons](#arao)
* [How to Use](#htu)
* [Amazon](#amazon)
* [Best Buy](#bestbuy)
* [Playstation Direct](#psdirect)
* [Target](#target)

---

**<a name="arao"></a>My Suggestions on Add-Ons**

_!! Tab Reloader !!_
[Chrome](https://chrome.google.com/webstore/detail/tab-reloader-page-auto-re/dejobinhdiimklegodgbmbifijpppopn?hl=en)
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/tab-reloader/)
[Opera](https://addons.opera.com/en/extensions/details/tab-reloader/)
[Edge](https://microsoftedge.microsoft.com/addons/detail/tab-reloader-page-auto-r/amclpbiglkmdhodbgnchnkmfdghnabik)

**If you use FIREFOX** notifications do not make sounds. I recommend using the add-on [Notification Sound](https://addons.mozilla.org/en-US/firefox/addon/notification-sound/), plus you can customize the sound: 

---

**<a name="htu"></a>How to Use These Scripts**

I suggest using these settings for Tab Reloader:

![tab-reloader](markdown_assets/auto-reloader-screenshot.png)

```
NOTE: click `Permit Code Execution` to give Tab Reloader permission to run javascript code after reloading a tab
```

* Find the javascript snippet for the website you're using and paste the contents of the file into the black text box
* Turn on the reloader by flipping the top switch and you're ready!

```
NOTE: Make sure, when prompted, to give the tab permissions to send desktop notifications
```

**Example Notification**

![notification-example](markdown_assets/notification-example.png)

---

## <a name="amazon"></a>AMAZON

[Amazon Web Notifier Script](https://github.com/DasGinger/web-desktop-notifier/blob/master/web-notifiers/amazon-notifier.js)

The Amazon script will check either for the existence of the "ADD TO CART" button on the product page or the "OUT OF STOCK" message. Either will send a desktop notification so you can get there as quickly as possible.

## <a name="bestbuy"></a>BEST BUY

[Best Buy Web Notifier Script](https://github.com/DasGinger/web-desktop-notifier/blob/master/web-notifiers/best-buy-notifier.js)

The Best Buy script will check either for the existence of the "ADD TO CART" button on the product page or the "OUT OF STOCK" message. Either will send a desktop notification so you can get there as quickly as possible.

## <a name="psdirect"></a>PLAYSTATION DIRECT

[Playstation Direct Web Notifier Script](https://github.com/DasGinger/web-desktop-notifier/blob/master/web-notifiers/playstation-direct-notifier.js)

The Playstation Direct script will check either for the existence of the "ADD" button on the product page or if the website is hosing a queue for customers to get into the store. Either will send a desktop notification so you can get there as quickly as possible.

## <a name="target"></a>TARGET

[Target Web Notifier Script](https://github.com/DasGinger/web-desktop-notifier/blob/master/web-notifiers/target-notifier.js)

**The number of seconds you want to refresh the page on should have 5 seconds added to it.**

**Example**: If you want the page to refresh every 15 seconds, make the time 20 seconds.

Target's website is relatively slow and the HTML elements that provide the ability to purchase an item via local order, local deliver, and shipping are espeically slow due to being affected by Javascript in the background after the page has fully loaded.

Due to the above, this script is more complicated. The code here will use a timeout and wait for the HTML elements of the page to fully load before performing their functions. There is a hard-coded 5 second wait time. 

Overall, this script will check for each possible availability option INCLUDING backup stores and report on their availability.

---

![twitter](markdown_assets/twitter.png) [@dasginger](https://twitter.com/DasGinger) | ![github](markdown_assets/github.png) [My Code](https://github.com/DasGinger) | [:: email me ::](mailto:jcweber90@gmail.com)