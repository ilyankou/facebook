var googleSheetUrl = 'https://docs.google.com/spreadsheets/d/12diI3t7gfX-ysGFhsf1FGRH-J2D6DOJb3ZVmAASxNbg/pubhtml';

Tabletop.init({
  key: googleSheetUrl,
  callback: processData,
  simpleSheet: true,
});

function processData(data, tabletop) {
  for (i in data) {
    var columns = Object.keys(data[i]);
    for (j in columns) {
      var column = columns[j];
      $('body').append('<h4>' + column + '</h4>');
      $('body').append('<div>' + data[i][column] + '</div>');
    }
    $('body').append('<hr>')
  }
  console.log(data);
}
