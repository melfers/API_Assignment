function displayResults(responseJson) {
    console.log(responseJson);
    console.log(responseJson.length);
    $('#listResults').empty();
    for (let i = 0; i < responseJson.length; i++){
        $('#listResults').append(
        `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
        </li>`
      )};
    $('#results').removeClass('hidden');
  }
  
  function getRepos(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;
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
    $("form").submit(event => {
      event.preventDefault();
      const userInput = $(".userInput").val();
      getRepos(userInput);
    });
  }
  
  $(watchForm);