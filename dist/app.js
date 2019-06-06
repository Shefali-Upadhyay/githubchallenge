"use strict";

var repositories;

var execute = function execute() {
  var uname = document.getElementById('username').value; //api for the username

  var apiCall1 = "https://api.github.com/users/".concat(uname); //api for repository

  var apicall2 = "https://api.github.com/users/".concat(uname, "/repos");
  $.getJSON(apiCall1, function (json) {
    var fullname = json.name;
    var username = json.login;
    var aviurl = json.avatar_url;
    var profileurl = json.html_url;
    var followersnum = json.followers;
    var followingnum = json.following;
    var reposnum = json.public_repos;

    if (fullname == undefined) {
      fullname = username;
    }

    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = "\n    <h1 class=\"text-center pt-2\">USER DETAILS</h1>\n    <div class=\"row p-3\">\n      <div class=\"col-md-3\">\n        <img class=\"profile mt-3\" src=".concat(aviurl, " alt=\"porfile image\">\n      </div>\n      <div class=\"col-md-9\">\n        <h3>FULL NAME: <span>").concat(fullname, "</span></h3>\n        <h3>USER NAME: <span>").concat(username, "</span></h3>\n        <h3>PROFILE URL: <a href=\"").concat(profileurl, "\"><span>").concat(profileurl, "</span></a></h3>\n        <h3>FOLLOWERS: <span>").concat(followersnum, "</span></h3>\n        <h3>FOLLOWING: <span>").concat(followingnum, "</span></h3>\n        <h3>NUMBER OF REPOSITORIES: <span>").concat(reposnum, "</span></h3>\n      </div>\n    </div>");
    var repositories, outhtml;
    $.getJSON(apicall2, function (json) {
      repositories = json;
      outputPageContent();
    });

    function outputPageContent() {
      if (repositories.length == 0) {
        outhtml = '<h1>No Repositories!</h1>';
      } else {
        outhtml = "<h1>LIST OF REPOSITORIES</h1><ul>";
        repositories.forEach(function (index) {
          outhtml = outhtml + "<li><a href=\"".concat(index.html_url, "\" target=\"_blank\">").concat(index.html_url, "</a></li>");
        });
        outhtml = outhtml + '</ul>';
      }

      document.getElementById('repo').innerHTML = outhtml;
    }
  }).fail(function () {
    alert("No such username exists!");
    document.getElementById('username').value = "";
    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = "Not Available";
    document.getElementById('repo').innerHTML = "Not Available";
  });
};

document.getElementById('search').addEventListener('click', execute);
document.getElementById('username').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    execute();
  }
});