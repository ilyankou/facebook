/* Taken from Stack Overflow */

function generateArray(o) {
  var ids = Object.keys(o);

  return ids.map(function(id) {
    return Object.assign(JSON.parse(JSON.stringify(o[id])), {'object_id': id});
  });
}

function convertArrayOfObjectsToCSV(args) {
  var keys = ['object_id', 'parent_id', 'timestamp', 'from_name', 'from_id', 'type', 'contents'];
  var result, ctr, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
      return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key] ? item[key] : '';
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}


window.downloadCSV = function(args) {
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: generateArray(allObjects)
    });

    if (csv == null) return;

    filename = args.filename || 'data.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}
