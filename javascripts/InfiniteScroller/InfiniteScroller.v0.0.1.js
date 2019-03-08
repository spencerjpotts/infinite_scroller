
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
  
  this.options = options;
  this.view = document.querySelector(this.options.selector);

  // this.view.scrollTop(0); // reset scroll position to top of view/screen. 

  this.list = this.view.getElementsByTagName("ul")[0];
  this.items = [];

  // if user neables debuging, some information will be logged into the browser console window logs.
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

  // 
  this.addNewItem = function() {
    this.items.forEach( (item) => {
      this.log(item);
      this.list.appendChild(item.cloneNode(true));
    });
  };

  //
  this.view.addEventListener('scroll', () => {
    if (this.view.scrollTop + this.view.clientHeight >= this.view.scrollHeight - 100) {
      this.log(this)
      this.addNewItem();
    }
  });
};

// window.pageYOffset

