// "part": "snippet",
// "maxResults": 5,
// "q": "food"
//API Key: AIzaSyCQgFGJgmjg_1koyrMY8nt8OK-fdRkt7Es

var queryURL =
  "https://youtube/v3/docs/search/playlistItems?part=contentDetails,snippet?q=" +
  food +
  "&key=AIzaSyCQgFGJgmjg_1koyrMY8nt8OK-fdRkt7Es";

// "https://www.googleapis.com/youtube/v3/search";

console.log(queryURL);

// created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});



// Youtube API result
https://developers.google.com/youtube/v3/docs/search/list?apix_params=%7B%22part%22%3A%22snippet%22%2C%22maxResults%22%3A5%2C%22q%22%3A%22food%22%7D&apix=true

<script src="https://apis.google.com/js/api.js"></script>
<script>
  {/* /**
   * Sample JavaScript code for youtube.search.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */ */}

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 5,
      "q": "food"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });
</script>
<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>
