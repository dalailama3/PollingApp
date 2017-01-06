'use strict';

(function () {
    
    var pollUrl = document.querySelector(".hidden").getAttribute("data-id")
    var url = appUrl + '/api/' + pollUrl + '/json'
    console.log(url)
    
    function findVote(arr, idx) {
        var result = 0;
        arr.forEach((obj)=> {
            if (idx === obj.idx) {
                result = obj.count
            }
        })
        return result;
    }
    function getVoteCountData(options, votes) {
        var voteCounts = [];
    
        options.forEach((option,i)=> {
            var count = findVote(votes, i)
            voteCounts.push(count)
        })
        return voteCounts;
    }
    
    function randomColorList(length, arr) {
        var results = []
        for (var i = 0; i < length; i++) {
            if (arr.indexOf('#'+(Math.random()*0xFFFFFF<<0).toString(16)) === -1) {
                results.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            }
            
        }
       return results;
    }
    
    function createPollChart(data) {
        var ctx = document.getElementById("pollChart").getContext("2d")
        ctx.canvas.width = 300;
        ctx.canvas.height = 300;
        console.log(data)
        var data = JSON.parse(data);
        var voteData = getVoteCountData(data.options,data.votes)
        console.log(voteData)
        var presetColors = ["#e41a1c",
                "#377eb8",
                "#4daf4a",
                "#984ea3",
                "#ff7f00",
                "#ffff33",
                "#a65628",
                "#f781bf"
                ]
                
        var extras = randomColorList(data.options.length - 8, presetColors);
        console.log(extras)
        
        if (data.options.length > 8) {
            presetColors = presetColors.concat(extras);
        }
        console.log(presetColors);
        var myChart = new Chart(ctx, 
    {
        type: 'pie',
        data: {
        labels: data.options,
        datasets: [{
            label: '# of Votes',
            data: voteData,
            backgroundColor: presetColors
        }]
        }
    });
      
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', url, createPollChart))
    

    
})();