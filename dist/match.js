"use strict";

var details, user1, user2;

var execute = function execute(uname, cb) {
  var apiCall = "https://api.github.com/users/".concat(uname);
  $.getJSON(apiCall, function (json) {
    var fullname = json.name;
    var username = json.login;
    var profileurl = json.html_url;
    var reposnum = json.public_repos;
    details = [fullname, username, profileurl, reposnum];
    cb(null, details);
  }).fail(function () {
    cb(new Error('api error'), null);
  });
};

var call1 = function call1() {
  var uname = document.getElementById('username1').value;
  execute(uname, function (err, data) {
    if (!err) {
      user1 = data;
      document.getElementById('result1').style.display = 'block';
      document.getElementById('result1').innerHTML = "\n      <h3>FULL NAME: <span>".concat(user1[0], "</span></h3>\n      <h3>USER NAME: <span>").concat(user1[1], "</span></h3>\n      <h3>PROFILE URL: <a href=\"").concat(user1[2], "\"><span>").concat(user1[2], "</span></a></h3>\n      <h3>NO. OF REPOSITORIES: <span>").concat(user1[3], "</span></h3>");
    }
  });
};

var call2 = function call2() {
  var uname = document.getElementById('username2').value;
  execute(uname, function (err, data) {
    if (!err) {
      user2 = data;
      document.getElementById('result2').style.display = 'block';
      document.getElementById('result2').innerHTML = "\n      <h3>FULL NAME: <span>".concat(user2[0], "</span></h3>\n      <h3>USER NAME: <span>").concat(user2[1], "</span></h3>\n      <h3>PROFILE URL: <a href=\"").concat(user2[2], "\"><span>").concat(user2[2], "</span></a></h3>\n      <h3>NO. OF REPOSITORIES: <span>").concat(user2[3], "</span></h3>");
    }
  });
}; //button press and keypress events


document.getElementById('search1').addEventListener('click', call1);
document.getElementById('username1').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    call1();
  }
});
document.getElementById('search2').addEventListener('click', call2);
document.getElementById('username2').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    call2();
  }
});
document.getElementById('check').addEventListener('click', function () {
  if (user1[3] > user2[3]) {
    alert("".concat(user1[0], " has more number of repositories!"));
  } else if (user1[3] < user2[3]) {
    alert("".concat(user2[0], " has more number of repositories!"));
  } else {
    alert("Both have equal number of repositories!");
  }
});