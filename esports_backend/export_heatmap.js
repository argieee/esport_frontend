const http = require('http');
const fs = require('fs');

http.get('http://localhost:5000/api/stats/heatmap', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if(json.length === 0) {
        console.log('No heatmap data found.');
        return;
      }
      const keys = Object.keys(json[0]);
      const csv = [
        keys.join(','),
        ...json.map(row => keys.map(k => {
           let val = row[k];
           if(val === null || val === undefined) val = '';
           return typeof val === 'string' ? '"' + val.replace(/"/g, '""') + '"' : val;
        }).join(','))
      ].join('\n');
      fs.writeFileSync('heatmap_data.csv', csv);
      console.log('heatmap_data.csv generated successfully. ' + json.length + ' rows.');
    } catch(e) {
      console.error('Error parsing JSON:', e);
    }
  });
}).on('error', (e) => {
  console.error('Error fetching data:', e);
});
