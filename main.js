var pageID = 'TrinityCollege';
var accessToken = '2117684761791935|802f059657c6aeabc453b2ba31854625';

function addComments(id) {
  $.ajax({
    url: 'https://graph.facebook.com/{0}/comments?access_token={1}'.format(id, accessToken),
    success: function(json) {
      comments = json.data;
      if (comments.length == 0) return;

      for (i in comments) {
        console.log(comments[i])
        $('ul.' + id).append(
          '<li> \
            <i>{1} ({2}) on {0}:</i> <br> \
            {3} \
            <ul class="{4}"></ul> \
          </li>'.format(moment(comments[i].created_time).format('LLL'), comments[i].from.name, comments[i].from.id, comments[i].message, comments[i].id));

        addComments(comments[i].id);
      }
    }
  });
}

$.ajax({
  url: 'https://graph.facebook.com/{0}/feed?access_token={1}'.format(pageID, accessToken),
  success: function(json) {
    var posts = json.data;
    console.log(posts);

    for (i in posts) {
      $('#posts').append(
        '<li><b> \
          <i>{0}</i> <br> \
          {1} </b> \
          <ul class="{2}"></ul> \
        </li>'
        .format(moment(posts[i].created_time).format('LLL'), posts[i].message, posts[i].id));

      addComments(posts[i].id);
    }
}});
