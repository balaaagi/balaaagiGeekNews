var mongoose=require('mongoose');

var PostSchema=new mongoose.Schema({
	title:String,
	url:String,
	hostname:String,
	upvotes: {type: Number, default: 0}
});

PostSchema.methods.upvote = function(pv) {
  this.upvotes += 1;
  this.save(pv);
};

mongoose.model('Post',PostSchema);