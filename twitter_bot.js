
/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = 'plumber';
var REPLY = "Hey, you may want to check out Dedal app http://beta.ded.al!";

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: "",
	consumer_secret: "",
	access_token: "", 
	access_token_secret: ""
});

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {

	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot initiated');
		}
	}
	
	BotReply();
}

/* BotReply() : To reply to the matching recent tweet */
function BotReply() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			var user = data.statuses[0].user.screen_name;
			var msg = "@" + user + " " + REPLY;
    		Bot.post('statuses/update', { status: msg }, function(err, data, response) {
			  console.log(data)
			});

		}
	}
	
}

/* Initiate the Bot */
BotInit();