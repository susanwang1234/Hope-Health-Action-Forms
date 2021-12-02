import Chart from 'react-google-charts';
import './Dashboard.css';

const Leaderboard = (pointSystem: any[]) => {
  function stringToColor(str: String) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  //outputs bar data for the leaderboard
  function getBarData() {
    let departmentBars = [];
    let lengthJSON = Object.keys(pointSystem).length;
    for (let i = 0; i < lengthJSON; i++) {
      var randomColor = stringToColor(pointSystem[i].department);
      let departmentName = pointSystem[i].department;
      let score = pointSystem[i].score;
      let departmentNamePartial = '';
      if (departmentName.length >= 10) {
        departmentNamePartial = departmentName.substring(0, 9) + '...'; //if department name is over 10 characters, the name gets cut off when being displayed
      } else {
        departmentNamePartial = departmentName;
      }
      let tooltipInfo = "<p style='padding: 15px 10px 0 10px'>" + '<b>Department: </b>' + departmentName + '<br>' + '<b>Score: </b>' + pointSystem[i].score.toString() + '</p>';
      departmentBars.push([departmentNamePartial, score, 'color: ' + randomColor + ';', null, tooltipInfo]);
    }

    let barData = [
      [
        'Department',
        'Points',
        { role: 'style' },
        {
          sourceColumn: 0,
          role: 'annotation',
          type: 'string',
          calc: 'stringify'
        },
        { role: 'tooltip', type: 'string', p: { html: true } }
      ]
    ];
    for (let i = 0; i < lengthJSON; i++) {
      barData.push(departmentBars[i]);
    }
    return barData;
  }

  //outputs the html code coming from the imported google chart library
  let barData = getBarData();

  return (
    <div style={{ display: 'flex' }}>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={barData}
        options={{
          bar: { groupWidth: '50%' },
          legend: { position: 'none' },
          tooltip: { isHtml: true, trigger: 'visible' }
        }}
        // For tests
        rootProps={{ 'data-testid': '0' }}
      />
    </div>
  );
};

export default Leaderboard;
