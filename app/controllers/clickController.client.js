'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var usersUl = document.querySelector('.all-users');
   var pollsUl = document.querySelector('.all-polls');

   var apiUrl = appUrl + '/api/:id/clicks';
   var usersUrl = appUrl + '/api/users'
   var pollsUrl = appUrl + '/api/polls'
   
   var editPoll = document.querySelector('input.edit-poll')
   
   // editPoll.addEventListener('click', function () {
   //    console.log("Yes")
   // })

   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
   
   
   function populateUL (data) {
      var users = JSON.parse(data);
      users.forEach((user) => {
         var li = document.createElement("li")
         li.textContent = user.github.username;
         usersUl.appendChild(li)
     
      })
   }
   
   function showPolls (data) {
      var polls = JSON.parse(data)
      polls.forEach((poll)=> {
         var pollLi = document.createElement("li")
         pollLi.textContent = poll.question
         var pollLink  = document.createElement("a")
         pollLink.textContent = "go to poll"
         pollLink.href = "/api/polls/" + poll._id
         
         pollLi.appendChild(pollLink)
         pollsUl.appendChild(pollLi)
         
      })
   }
   
   

// ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));
        
ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', usersUrl, populateUL))
ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', pollsUrl, showPolls))

   

addButton.addEventListener('click', function () {

   ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
      ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
   });

}, false);

deleteButton.addEventListener('click', function () {

   ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
      ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
   });

}, false);



   



})();
