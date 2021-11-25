import Chart from 'react-google-charts';

/*
    Citations:
    https://react-google-charts.com/bar-chart
*/

class Leaderboard {
    private getBarData() {
      const json: any = {
        leaderboard: [
          { department: 'Rehab', score: 1 },
          { department: 'Maternity', score: 5 },
          { department: 'NCIUPaeds', score: 10 },
          { department: 'Community Health', score: 4 }
        ]
      }; //dummy data
  
      let departmentBars = [];
      let lengthJSON = Object.keys(json.leaderboard).length;
      for (let i = 0; i < lengthJSON; i++) {
        let opacityValue = Math.round((1 / (i + 1)) * 100) / 100;
        let opacityStr = 'opacity: ' + opacityValue.toString() + ';';
        departmentBars.push([json.leaderboard[i].department, json.leaderboard[i].score, 'color: #764a90; ' + opacityStr, null]);
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
          }
        ]
      ];
      for (let i = 0; i < lengthJSON; i++) {
        barData.push(departmentBars[i]);
      }
      return barData;
    }
  
    public generateLeaderboard() {
      let barData = this.getBarData();
  
      return (
        <div>
          <Chart
            width={'95%'}
            height={'200px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={barData}
            options={{
              bar: { groupWidth: '95%' },
              legend: { position: 'none' }
            }}
            // For tests
            rootProps={{ 'data-testid': '0' }}
          />
        </div>
      );
    }
  }
  
  export default Leaderboard;