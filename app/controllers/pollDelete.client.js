'use strict';


(function () {
    
    var deleteButtons = document.querySelectorAll('.delete-poll')
    
    console.log(deleteButtons)
    
    function addEventListenerToEl(list, cb) {
        list.forEach(function (el) {
            el.addEventListener('click', cb)
        })
    }
    
    
    
    
})();