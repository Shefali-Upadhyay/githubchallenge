let details, user1, user2;

const execute = (uname, cb) => {
  let apiCall = `https://api.github.com/users/${uname}`;
  $.getJSON(apiCall, (json) => {
    let fullname   = json.name;
    let username   = json.login;
    let profileurl = json.html_url;
    let reposnum     = json.public_repos;

    details = [fullname, username, profileurl, reposnum];
    cb(null, details);
  })
  .fail(() => { 
    cb(new Error('api error'), null)
  });
};

let call1 = () => {
  let uname= document.getElementById('username1').value;
  execute(uname, (err, data) => {
    if(!err){
      user1 = data;
      document.getElementById('result1').style.display = 'block';
      document.getElementById('result1').innerHTML = `
      <h3>FULL NAME: <span>${user1[0]}</span></h3>
      <h3>USER NAME: <span>${user1[1]}</span></h3>
      <h3>PROFILE URL: <a href="${user1[2]}"><span>${user1[2]}</span></a></h3>
      <h3>NO. OF REPOSITORIES: <span>${user1[3]}</span></h3>`;
    }
  });
};

let call2 = () => {
  let uname= document.getElementById('username2').value;
  execute(uname, (err, data) => {
    if(!err){
      user2 = data;
      document.getElementById('result2').style.display = 'block';
      document.getElementById('result2').innerHTML = `
      <h3>FULL NAME: <span>${user2[0]}</span></h3>
      <h3>USER NAME: <span>${user2[1]}</span></h3>
      <h3>PROFILE URL: <a href="${user2[2]}"><span>${user2[2]}</span></a></h3>
      <h3>NO. OF REPOSITORIES: <span>${user2[3]}</span></h3>`;
    }
  });
};

//button press and keypress events
document.getElementById('search1').addEventListener('click', call1);

document.getElementById('username1').addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    call1();
  }
});
document.getElementById('search2').addEventListener('click', call2);

document.getElementById('username2').addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    call2();
  }
});

document.getElementById('check').addEventListener('click', () => {
  if(user1[3] > user2[3]){
    alert(`${user1[0]} has more number of repositories!`);
  }
  else if(user1[3] < user2[3]){
    alert(`${user2[0]} has more number of repositories!`);
  }
  else{
    alert(`Both have equal number of repositories!`);
  }
});