'use strict';


(function () {
    
    var deleteButtons = document.querySelectorAll('.delete-poll')
    var apiUrl = appUrl + '/api/mypolls';

    
    console.log(deleteButtons)
    
    function addEventListenerToEls(list, cb) {
        list.forEach(function (el) {
            el.addEventListener('click', cb)
        })
    }
    
    function callback(data) {
        window.location.href = '/api/mypolls'
    }
    
    function sendDeleteRequest() {
        var url = this.getAttribute('data-url')
        console.log(url)
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', url, callback))
    }

    addEventListenerToEls(deleteButtons, sendDeleteRequest)
    
    
    
})();