var pageID = 'TrinityCollege';
var accessToken = '2117684761791935|802f059657c6aeabc453b2ba31854625';

function loadComments(id, url=false) {
  $.ajax({
    url: url ? url : 'https://graph.facebook.com/{0}/comments?access_token={1}'.format(id, accessToken),
    success: function(json) {
      comments = json.data;

      if (comments.length == 0) return;

      for (i in comments) {
        $('ul.' + id).append(
          '<li> \
            <i>{1} ({2}) on {0}:</i> <br> \
            {3} \
            <ul class="{4}"></ul> \
          </li>'.format(moment(comments[i].created_time).format('LLL'), comments[i].from.name, comments[i].from.id, comments[i].message, comments[i].id));

        // Load comments of the current comment
        loadComments(comments[i].id);
      }

      // Facebook returns 25 comments by default. Check if more exist and load the next comments page
      if (json.paging && json.paging.next) {
        loadComments(id, json.paging.next);
      }
    }
  });
}

$.ajax({
  url: 'https://graph.facebook.com/{0}/feed?access_token={1}'.format(pageID, accessToken),
  success: function(json) {
    var posts = json.data;

    for (i in posts) {
      $('#posts').append(
        '<li><b> \
          <i>{0}</i> <br> \
          {1} </b> \
          <ul class="{2}"></ul> \
        </li>'
        .format(moment(posts[i].created_time).format('LLL'), posts[i].message, posts[i].id));

      loadComments(posts[i].id);
    }
}});
