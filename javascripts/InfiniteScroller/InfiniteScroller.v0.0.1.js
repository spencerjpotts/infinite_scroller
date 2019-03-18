
/* 
File : InfiniteScroller.v0.0.1.js.
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
  
  /*
  *
  *
  * 
  */
  // if user enables debugging, some information will be logged into the browser console window logs.
   this.log = function(msg) {
    if(this.debug == true) {
      console.log(msg);
    }
  };


  /*
  *
  *
  * 
  */
  this.debug = options.debug;
  this.options = options;
  this.view = document.querySelector(this.options.selector);

  this.list = this.view.getElementsByTagName("ul")[0];
  this.items = [];
  this.isLoading = false;
  

  // Save the existing items.
  /*
  * get each '<li>' element from the list specified in the current context (self/this). 
  * with each list item, push it to the items list. 
  * using Array prototype so that each list item can be later used or copied.
  */
  Array.prototype.forEach.call(this.list.getElementsByTagName("li"), (item) => {
    this.items.push(item);
    this.log(item);
  });




  /*
  *
  *
  * 
  */
  this.loading = function() {
    if (this.options.loadEnabled == true && this.isLoading == false) {
      this.isLoading = true;
      this.log("Loading content...");
      var content = document.createTextNode(this.options.content);
      var template = document.createElement("li");
      template.classList.add("loading");
      template.appendChild(content);

      var loading = this.list.appendChild(template);
      this.view.scrollTop = this.view.scrollHeight;
      setTimeout(()=> {
        this.isLoading = false;
        loading.remove();
        this.addNewItem();
      }, 2000);
      // loading.remove();
    }
  };





  // Using arrow functions to keep the objects self/this context.
  /*
  *
  *
  * 
  */
  this.addNewItem = function() {
    this.items.forEach( (item) => {
      this.list.appendChild(item.cloneNode(true));
      this.log(item);
    });
  };




  /*
  *
  *
  * 
  */
  this.view.addEventListener('scroll', () => {
    // logs the current position of the scroller for debugging information.
    this.log(this.view.scrollTop)
    
    // When the current position is equal to the height of the view in use, then perform next actions.
    if (this.view.scrollTop + this.view.clientHeight >= this.view.scrollHeight) {
      this.log(this)
      this.loading();
      // this.addNewItem();
    }
  });

};
