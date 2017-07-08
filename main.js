var accessToken = '2117684761791935|802f059657c6aeabc453b2ba31854625';

$.getJSON('https://graph.facebook.com/TrinityCollege/feed?access_token=' + accessToken, function(json) {
  var data = json.data;

  for (i in data) {
    var id = data[i].id;
    $.getJSON('https://graph.facebook.com/' + id + '/comments?accessToken=' + accessToken, function(data) {
      console.log(data);
    });
  }

});
