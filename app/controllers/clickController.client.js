'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var usersUl = document.querySelector('.all-users');
   var pollsUl = document.querySelector('.all-polls');

   var apiUrl = appUrl + '/api/polls/:id';
   var usersUrl = appUrl + '/api/users'
   var pollsUrl = appUrl + '/api/polls'
   
   // function populateUL (data) {
   //    var users = JSON.parse(data);
   //    users.forEach((user) => {
   //       var li = document.createElement("li")
   //       li.textContent = user.github.username;
   //       usersUl.appendChild(li)
     
   //    })
   // }
   
   function showPolls (data) {
      var polls = JSON.parse(data)
      polls.forEach((poll)=> {
         var pollLi = document.createElement("li")
         
         var pollLink  = document.createElement("a")
         pollLi.textContent = poll.question
         // pollLink.textContent = poll.question
         pollLink.href = "/api/polls/" + poll._id
         
         pollLi.addEventListener('click', function () {
            window.location = "/api/polls/" + poll._id;
         })
         
         pollLi.appendChild(pollLink)
         pollsUl.appendChild(pollLi)
         
      })
   }
   

// ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', usersUrl, populateUL))
ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', pollsUrl, showPolls))


})();
