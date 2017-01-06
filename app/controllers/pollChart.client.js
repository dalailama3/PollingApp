'use strict';

(function () {
    
    var pollUrl = document.querySelector(".hidden").getAttribute("data-id")
    var url = appUrl + '/api/' + pollUrl + '/json'
    console.log(url)
    
    function getVoteCountData(votes) {
        console.log(votes)
        var arr = [];
        var sortedVotes = votes.sort(function(a,b) {
            return a.idx - b.idx
        })
        
       return sortedVotes.map((obj)=> { return obj.count;} );
    }
    
    function randomColorList(length) {
        var results = []
        for (var i = 0; i < length; i++) {
            results.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
        }
       return results;
    }
    
    function createPollChart(data) {
        var ctx = document.getElementById("pollChart").getContext("2d");
        console.log(data)
        var data = JSON.parse(data);
        var colors = randomColorList(data.options.length)
        console.log(colors)
        var voteData = getVoteCountData(data.votes)
        var myChart = new Chart(ctx, 
    {
        type: 'pie',
        data: {
        labels: data.options,
        datasets: [{
            label: '# of Votes',
            data: voteData,
            backgroundColor: 
                ["#e41a1c",
                "#377eb8",
                "#4daf4a",
                "#984ea3",
                "#ff7f00",
                "#ffff33",
                "#a65628",
                "#f781bf"
                ]
        }]
        }
    });
      
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', url, createPollChart))
    

    
})();