# balaaagiGeekyNews

### Dependencies
- mongodb



### Getting Started
```bash
$ npm install

# To start the application
$ node ./bin/www

# To start the MongoServer
$mongod
```

The REST services runs on port 7575 by default and you can query the data

| API | Type | Operation |
| --- |------|--- |
| /posts| GET | Returns the list of posts in json format |
| /posts| POST | Add a new post with current data, fetching the title from URL, HOSTNAME from URL and zero upvotes|
| /posts/[postid]/upvote| PUT | Increments the upvotes of the post with post id as [postid]| 


<hr />

### Problem Description
The goal is to build a clone of [hackernews](https://news.ycombinator.com) clone.

### System Requirements

- News listing: This will be the home page - publicly visible to everyone. There will be a paginated list of news articles along with their vote counts. The news articles need to be sorted in a reverse chronological order.
- User Login: There should be a user sign-up / sign-in mechanism. The sign-up can be based on email / password (ie, tying up with Google / Facebook / Twitter logins not necessary).
- When a user who is not signed-in does any operation that is intended for logged-in users, you should prompt them with a sign-in / sign-up popup.




### Technology

MEAN Stack with bootstrap hosted in Digital Ocean
Passport.js for user authentication


### To Do 
...later...
