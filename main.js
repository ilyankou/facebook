var googleSheetUrl = 'https://docs.google.com/spreadsheets/d/12diI3t7gfX-ysGFhsf1FGRH-J2D6DOJb3ZVmAASxNbg/pubhtml';

Tabletop.init({
  key: googleSheetUrl,
  callback: processData,
  simpleSheet: true,
});

function processData(data, tabletop) {
  for (i in data) {
    var keys = Object.keys(data[i]);
    for (j in keys) {
      var k = keys[j];
      $('body').append('<h4>' + k + '</h4>');
      $('body').append('<div>' + data[i][k] + '</div>');
    }
    $('body').append('<hr>')
  }
}
