/**
 * Created by ryankalla on 6/5/17.
 */



var mongoose = require('mongoose');

mongoose.Promise = require('q').promise;

mongoose.connect('mongodb://127.0.0.1:27017/test');

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: Date,
    thumbsUp: Number
}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);


function findBlogPostById(postId){
    return blogModel.findOne({_id: postId});

}

function findAllBlogPosts(){
    return blogModel.find();
}


function createBlogPost(blogPost) {
    return blogModel.create(blogPost);
}

function findBlogPostByTitle(title){
    return blogModel.find({title: title});
}

function updateBlogPost(postId, newPost){
    return blogModel.update({_id: postId}, {
        $set: newPost
    });
}

function deleteBlogPostById(postId) {
    return blogModel.remove({_id: postId});
}


// updateBlogPost("5935e93428cfa057c4990293", {body: "test test test"})
//     .then(function (post){
//         console.log(post);
//     }, function(err){
//         console.log(err);
//     });



// findAllBlogPosts()
//     .then(function (posts){
//         console.log(posts);
//     });


// createBlogPost(
//     {title: "Post 123",
//         body: "body 123",
//         postDate: new Date(),
//         thumbsUp: 123});


findBlogPostById("5935e93428cfa057c4990293")
    .then(function (post){
        console.log(post);
    }, function (err){
        console.log(err);
    });

// findBlogPostByTitle("Post 123")
//     .then(function (post){
//         console.log(post);
//     });
