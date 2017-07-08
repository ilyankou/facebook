var accessToken = '2117684761791935|802f059657c6aeabc453b2ba31854625';

function addComments(id) {
  $.ajax({url: 'https://graph.facebook.com/' + id + '/comments?access_token=' + accessToken, success: function(json) {
    comments = json.data;
    if (comments.length == 0) return;

    for (i in comments) {
      $('ul.' + id).append('<li>' + comments[i].created_time + '<br>' + comments[i].message + '<ul class="' + comments[i].id + '"></ul></li>');
      addComments(comments[i].id);
    }
  }});
}

$.ajax({url: 'https://graph.facebook.com/TrinityCollege/feed?access_token=' + accessToken, success: function(json) {
  var posts = json.data;
  console.log(posts);

  for (i in posts) {
    $('#posts').append(' \
      <li><b> \
        {0} <br> \
        {1} </b> \
        <ul class="{2}"></ul> \
      </li>'
      .format(posts[i].created_time, posts[i].message, posts[i].id));

    addComments(posts[i].id);
  }

}});
