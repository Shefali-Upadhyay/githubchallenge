let repositories;

const execute = () => {
  let uname= document.getElementById('username').value;
  let apiCall1 = `https://api.github.com/users/${uname}`;
  let apicall2 = `https://api.github.com/users/${uname}/repos`;
  $.getJSON(apiCall1, (detail) => {
    let fullname   = detail.name;
    let username   = detail.login;
    let aviurl     = detail.avatar_url;
    let profileurl = detail.html_url;
    let location   = detail.location;
    let followersnum = detail.followers;
    let followingnum = detail.following;
    let reposnum     = detail.public_repos;
    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = `
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
    
    // $.getJSON(apicall2, function(json){
    //   repositories = json;   
    //   outputPageContent();                
    // });          
  })
  .fail(() => { 
    document.getElementById('view').style.display = 'block';
    document.getElementById('result').innerHTML = "Not Available";
  });
};

// let outputPageContent = () => {
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

document.getElementById('username').addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    execute();
  }
});

