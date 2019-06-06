let repositories;

const execute = () => {
  let uname= document.getElementById('username').value;
  //api for the username
  let apiCall1 = `https://api.github.com/users/${uname}`;
  //api for repository
  let apicall2 = `https://api.github.com/users/${uname}/repos`;
  $.getJSON(apiCall1, (json) => {
    let fullname   = json.name;
    let username   = json.login;
    let aviurl     = json.avatar_url;
    let profileurl = json.html_url;
    let followersnum = json.followers;
    let followingnum = json.following;
    let reposnum     = json.public_repos;

    if(fullname == undefined) { 
      fullname = username; 
    }

    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = `
    <h1 class="text-center pt-2">USER DETAILS</h1>
    <div class="row p-3">
      <div class="col-md-3">
        <img class="profile mt-3" src=${aviurl} alt="porfile image">
      </div>
      <div class="col-md-9">
        <h3>FULL NAME: <span>${fullname}</span></h3>
        <h3>USER NAME: <span>${username}</span></h3>
        <h3>PROFILE URL: <a href="${profileurl}"><span>${profileurl}</span></a></h3>
        <h3>FOLLOWERS: <span>${followersnum}</span></h3>
        <h3>FOLLOWING: <span>${followingnum}</span></h3>
        <h3>NUMBER OF REPOSITORIES: <span>${reposnum}</span></h3>
      </div>
    </div>`; 
    
    let repositories, outhtml;
    $.getJSON(apicall2, function(json){
      repositories = json;   
      outputPageContent();                
    });          

    function outputPageContent() {
      if(repositories.length == 0) {
        outhtml = '<h1>No Repositories!</h1>'; 
      }
      else {
        outhtml = `<h1>LIST OF REPOSITORIES</h1><ul>`;
        repositories.forEach((index) => {
          outhtml = outhtml + `<li><a href="${index.html_url}" target="_blank">${index.html_url}</a></li>`;
        });
        outhtml = outhtml + '</ul>'; 
      }
      document.getElementById('repo').innerHTML = outhtml;
    }
  })
  .fail(() => { 
    alert("No such username exists!");
    document.getElementById('username').value = "";
    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = "Not Available";
    document.getElementById('repo').innerHTML = "Not Available";
  });
};

document.getElementById('search').addEventListener('click', execute);

document.getElementById('username').addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    execute();
  }
});