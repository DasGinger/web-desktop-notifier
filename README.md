# Web Desktop Notifier
#### Javascript snippets for auto reload browser add-ons

This is a library of javascript snippets that can be used with various [auto refresh browser add-ons](https://www.reddit.com/r/chrome/comments/8u89am/safe_and_reliable_auto_refresh/) in most modern browsers (quit using IE, please for all us). These scripts reference various HTML elements on the given store's product page and reports back via desktop notifications on product stock status.

**My Suggestions on Add-Ons**

_!! Tab Reloader !!_
[Chrome](https://chrome.google.com/webstore/detail/tab-reloader-page-auto-re/dejobinhdiimklegodgbmbifijpppopn?hl=en)
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/tab-reloader/)
[Opera](https://addons.opera.com/en/extensions/details/tab-reloader/)
[Edge](https://microsoftedge.microsoft.com/addons/detail/tab-reloader-page-auto-r/amclpbiglkmdhodbgnchnkmfdghnabik)

**If you use FIREFOX** notifications do not make sounds. I recommend using the add-on [Notification Sound](https://addons.mozilla.org/en-US/firefox/addon/notification-sound/), plus you can customize the sound: 

**How to Use These Scripts**

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

## TARGET

The Target script will simply check to see if the three "in stock" buttons are available on the page and determine which options is most optimal, then report the in stock item via a desktop notification.

## PLAYSTATION DIRECT

The Playstation Direct script will check either for the existence of the "ADD" button on the product page or if the website is hosing a queue for customers to get into the store. Either will send a desktop notification so you can get there as quickly as possible.

---

![twitter](markdown_assets/twitter.png) [@dasginger](https://twitter.com/DasGinger) | ![github](markdown_assets/github.png) [My Code](https://github.com/DasGinger) | [:: email me ::](mailto:jcweber90@gmail.com)