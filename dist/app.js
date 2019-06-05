"use strict";

var repositories;

var execute = function execute() {
  var uname = document.getElementById('username').value;
  var apiCall1 = "https://api.github.com/users/".concat(uname);
  var apicall2 = "https://api.github.com/users/".concat(uname, "/repos");
  $.getJSON(apiCall1, function (detail) {
    var fullname = detail.name;
    var username = detail.login;
    var aviurl = detail.avatar_url;
    var profileurl = detail.html_url;
    var location = detail.location;
    var followersnum = detail.followers;
    var followingnum = detail.following;
    var reposnum = detail.public_repos;
    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = "\n    <div class=\"row p-3\">\n      <div class=\"col-md-3\">\n        <img class=\"profile mt-3\" src=".concat(aviurl, " alt=\"porfile image\">\n      </div>\n      <div class=\"col-md-9\">\n        <h3>FULL NAME: <span>").concat(fullname, "</span></h3>\n        <h3>USER NAME: <span>").concat(username, "</span></h3>\n        <h3>PROFILE URL: <a href=\"").concat(profileurl, "\"><span>").concat(profileurl, "</span></a></h3>\n        <h3>FOLLOWERS: <span>").concat(followersnum, "</span></h3>\n        <h3>FOLLOWING: <span>").concat(followingnum, "</span></h3>\n        <h3>NUMBER OF REPOSITORIES: <span>").concat(reposnum, "</span></h3>\n      </div>\n    </div>"); // $.getJSON(apicall2, function(json){
    //   repositories = json;   
    //   outputPageContent();                
    // });          
  }).fail(function () {
    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = "Not Available";
  });
}; // let outputPageContent = () => {
//   if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
//   else {
//     outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
//     $.each(repositories, function(index) {
//       outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
//     });
//     outhtml = outhtml + '</ul></div>'; 
//   }
//   $('#ghapidata').html(outhtml);
// } 


document.getElementById('search').addEventListener('click', execute);
document.getElementById('username').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    execute();
  }
});