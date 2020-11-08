'use-strict';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

    let user = responseJson[0].owner.login
    let userinfo = `
      <h4>User: ${user}</h4>
      <h4>Repos: ${responseJson.length}</h4>
    `

  $('#results-list').append(userinfo)

  for (let i = 0; i < responseJson.length; i++){

    $('#results-list').append(
      `<li><h4>${responseJson[i].name}</h4>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        <p>${responseJson[i].description}</p>
        </li>
        `)};
 
  $('#results').removeClass('hidden');
};

function getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`
    console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const username = $('#js-username').val();
    getRepos(username);
  });
}

$(watchForm);