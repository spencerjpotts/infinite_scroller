
/* 
File : InfiniteScroller.v0.0.1.js.
Author: Spencer j Potts.
Description: 
Version: v0.0.1.js.

Example Usage: 

    window.onload = function(event) {
        let options = {
        debug: false,
        selector: "#infinite"
        };

        let infiniteScroller = new InfiniteScroller(options);
    };

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
  * with each list item, push it to the items list attribute. 
  * Using Array prototype so that each list item can be later used or copied.
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

      // create a new text node with the options loading text supplied by options variable.
      var content = document.createTextNode(this.options.content);
      
      // create the a new list element 'li'.
      var template = document.createElement("li");
      // add the css style loading class 'lading.' to the created template element.
      template.classList.add("loading");
      // append the newly created text node to the 'li' template variable.
      template.appendChild(content);

      var loading = this.list.appendChild(template);

      // get the list context and set its scoller to the bottom. 
      // this will help the loading content appear more smoothly.
      this.view.scrollTop = this.view.scrollHeight;

      // set a timeout for the loading template to be removed.
      // when the 2 second wait has ended set the 'isLoading' variable to false.
      // and then remove the added 'list' loading template.
      // then add the original set of list items into the 'list' using 'this.addNewItem()' function.      
      setTimeout( () => {
        this.isLoading = false;
        loading.remove();
        this.addNewItem();
      }, 2000);
      
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
      this.addNewItem();
    }
  });

};
