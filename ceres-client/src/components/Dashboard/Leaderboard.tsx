import { stringify } from 'querystring';
import Chart from 'react-google-charts';
import './Dashboard.css';

/*
    Citations:
    https://react-google-charts.com/bar-chart
    https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
*/

const Leaderboard = () => {

  function stringToColor(str: String) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  //outputs bar data for the leaderboard
  function getBarData() {
    const json: any = {
      leaderboard: [
        { department: 'Rehab', score: 1},
        { department: 'Maternity', score: 5 },
        { department: 'NICUPaeds', score: 10 },
        { department: 'Community Health', score: 4 }
      ]
    }; //dummy data

    let departmentBars = [];
    let lengthJSON = Object.keys(json.leaderboard).length;
    for (let i = 0; i < lengthJSON; i++) {
      var randomColor = stringToColor(json.leaderboard[i].department);
      let departmentName = json.leaderboard[i].department;
      let score = json.leaderboard[i].score;
      let departmentNamePartial = ""; 
      if(departmentName.length >= 10) {
        departmentNamePartial = departmentName.substring(0,9) + "..."; //if department name is over 10 characters, the name gets cut off when being displayed
      }
      else {
        departmentNamePartial = departmentName;
      }
      let tooltipInfo = "<p style='padding: 15px 10px 0 10px'>" + "<b>Department: </b>" + departmentName + '<br>' + "<b>Score: </b>" + (json.leaderboard[i].score).toString() + "</p>";
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
        { role: "tooltip", type: "string", p: { html: true } },
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
          tooltip: { isHtml: true, trigger: "visible"}
        }
    
        }
        // For tests
        rootProps={{ 'data-testid': '0' }}
      />
    </div>
  );
};

export default Leaderboard;
