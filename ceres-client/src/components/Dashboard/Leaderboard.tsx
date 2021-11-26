import Chart from 'react-google-charts';

/*
    Citations:
    https://react-google-charts.com/bar-chart
    https://www.codegrepper.com/code-examples/javascript/javascript+random+color+generator+never+repeat
*/

class Leaderboard {

  private generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

    //outputs bar data for the leaderboard
    private getBarData() {
      const json: any = {
        leaderboard: [
          { department: 'Rehab', score: 1 },
          { department: 'Maternity', score: 5 },
          { department: 'NCIUPaeds', score: 10 },
          { department: 'Community Health', score: 4 },
          { department: 'Community Health', score: 4 },
          { department: 'Community Health', score: 4 },
          { department: 'Community Health', score: 4 },
          { department: 'Community Health', score: 4 }
        ]
      }; //dummy data
  
      let departmentBars = [];
      let lengthJSON = Object.keys(json.leaderboard).length;
      for (let i = 0; i < lengthJSON; i++) {
        var randomColor=this.generateRandomColor();
        departmentBars.push([json.leaderboard[i].department, json.leaderboard[i].score, 'color: ' + randomColor + ";", null]);
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
  
    //outputs the html code coming from the imported google chart library
    public generateLeaderboard() {
      let barData = this.getBarData();
      
      return (
        <div style={{ display: 'flex' }}>
          <Chart
            width={'95%'}
            height={'100%'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={barData}
            options={{
              bar: { groupWidth: '50%' },
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