'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');


var ObjectId = require('mongoose').Types.ObjectId;
var userPolls = [];

function queryPolls(arr, res, cb) {
	Polls.find({'_id': { $in: arr}}).exec(function (err, results) {
		if (err) { throw err }
		cb(results, res)
	});
}

function callback(data, res) {

	res.render('pages/userPolls', {
		polls: JSON.parse(JSON.stringify(data))
	})
}


function ClickHandler () {

	this.getClicks = function (req, res) {
		console.log("got the clicks")
		Users
			.find({}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};
	
	this.getUsers = function (req, res) {
		console.log("got the users")
		Users
			.find({}, { '_id': false })
        	.exec(function (err, result) {
                if (err) { throw err; }

                
                    res.json(result);
		
        	});
	}
	
	this.getPolls = function (req, res) {
		Polls
			.find({})
			.exec(function (err, polls) {
				if (err) { throw err; }
				res.json(polls)
			})
	
	}
	
	this.showPoll = function (req, res) {
		Polls 
			.findOne({'_id': req.params.id})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.render('pages/showPoll', {
					user: req.user,
					votes: result.votes,
					pollId: req.params.id,
					question: result.question,
					options: result.options
				
				})
				
			})
		
	},
	
	this.showPollJson = function (req, res) {
		Polls 
			.findOne({'_id': req.params.id})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json({
					votes: result.votes,
					pollId: req.params.id,
					question: result.question,
					options: result.options
				
				})
				
			})
	},
	
	this.votePoll = function (req, res) {
		
		
		var body = req.body.choice.replace(/\s+/g, '').split(',');
		console.log(body)
		var vote = body[0];
		var idx = parseInt(body[1]);
	
	
		
		Polls
			.findOneAndUpdate({'_id': req.params.id, "votes.idx": idx }, {$inc: {"votes.$.count": 1} },{new:true})
			.exec(function (err, poll) {
				if (err) { throw err }
				if (poll) {
				
					res.render('pages/showPoll', {
						user: req.user,
						pollId: req.params.id,
						question: poll.question,
						options: poll.options,
						votes: poll.votes
					})
				} else {
					Polls
						.findOneAndUpdate({'_id': req.params.id}, { $push: { votes: { idx: idx, count: 1 } }}, {new:true})
						.exec(function (err, result) {
							if (err) { throw err }
							
							res.render('pages/showPoll', {
								user: req.user,
								pollId: req.params.id,
								question: result.question,
								options: result.options,
								votes: result.votes
							})
						})
				}
			})
	}

		
	this.editPoll = function (req, res) {
		var newOption = req.body['add-option']
		var pollId = req.params.id
		Polls
			.findOneAndUpdate({'_id': pollId}, { $push: { options: newOption } }, {new:true})
			.exec(function (err, poll) {
				if (err) { throw err }
				res.render('pages/showPoll', {
					user: req.user,
					pollId: req.params.id,
					votes: poll.votes,
					question: poll.question,
					options: poll.options
				})
			})
				
	}	

	
	this.userPolls = function (req, res) {
		console.log("hit /api/mypolls")

		
		Users
			.find({'github.id': req.user.github.id, polls: { $exists: true }}, { '_id': false })
    		.exec( function (err, result) {
    			if (err) { throw err }
			
				queryPolls(result[0].polls, res, callback)
				

    			
    	})
	


	}
	
	
	this.addPoll = function (req, res) {
		console.log(req.body)
		var body = req.body
		var options = body.options.replace(/\s+/g, '').split(',')
		
		var poll = new Polls({
			question: body.question,
			options: options
		})
		
		poll.save(function (err, poll) {
			if (err) { throw err }
			Users.findOneAndUpdate({'github.id': req.user.github.id}, { $push: { polls: poll._id }})
				.exec(function (err, result) {
						if (err) { throw err; }
	
						res.redirect('/')
					}
				);

			
		})
		
	}
	
	this.deletePoll = function (req, res) {
		Polls.findByIdAndRemove(req.params.id, function (err) {
			if (err) { throw err }
			Users.update({'github.id': req.user.github.id}, { $pull: { polls: req.params.id }})
			.exec(function (err) {
				if (err) { throw err }
				res.end()
			})
		})
			

	}
}

module.exports = ClickHandler;
