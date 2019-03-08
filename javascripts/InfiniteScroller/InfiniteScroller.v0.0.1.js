
/* 
File : InfiniteScroller.v0.0.1.js
Author: Spencer j Potts.
Description: 
Version: v0.0.1.js.

Example Usage: 

    window.onload = new InfiniteScroller({
       debug: false,
       selector: '#infinite'
    }, true);

*/

var InfiniteScroller = function(options) {
  console.log("InfiniteScroller Loaded...");
  this.debug = options.debug;
  this.options = options;
  this.view = document.querySelector(this.options.selector);

  this.list = this.view.getElementsByTagName("ul")[0];
  this.items = [];

  // if user enables debugging, some information will be logged into the browser console window logs.
  this.log = function(msg) {
    if(this.debug == true) {
      console.log(msg);
    }
  };

  // Save the existing items onload.
  Array.prototype.forEach.call(this.list.getElementsByTagName("li"), (item) => {
    this.log(item);
    this.items.push(item);
  });

  // Using arrow functions to keep the objects self/this context.
  this.addNewItem = function() {
    this.items.forEach( (item) => {
      this.log(item);
      this.list.appendChild(item.cloneNode(true));
    });
  };

  //
  this.view.addEventListener('scroll', () => {
    // logs the current position of the scroller for debugging information.
    this.log(this.view.scrollTop)
    
    // When the current position is equal to the height of the view in use, then perform next actions.
    if (this.view.scrollTop + this.view.clientHeight >= this.view.scrollHeight - this.options.offsetFromBottom) {
      this.log(this)
      this.addNewItem();
    }
  });
};

// window.pageYOffset

