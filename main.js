var googleSheetUrl = 'https://docs.google.com/spreadsheets/d/12diI3t7gfX-ysGFhsf1FGRH-J2D6DOJb3ZVmAASxNbg/pubhtml';

Tabletop.init({
  key: googleSheetUrl,
  callback: processData,
  simpleSheet: true,
});

function processData(data, tabletop) {
  if (!data[0])
    return;

  var skipColumns = ['Timestamp', 'Display'];

  for (i in data) {
    if (!data[i].Display || data[i].Display.toLowerCase() !== 'y') {
      continue;
    }
    
    $('body').append('<h4>' + data[i].Timestamp.split(' ')[0] + '</h4>');

    var keys = Object.keys(data[i]);

    for (j in keys) {
      var k = keys[j];
      if (skipColumns.indexOf(k) > -1) continue;

      $('body').append('<h4>' + k + '</h4>');
      $('body').append('<div>' + data[i][k] + '</div>');
    }

    $('body').append('<hr>');
  }
}
