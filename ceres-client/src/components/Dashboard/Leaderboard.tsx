import Chart from 'react-google-charts';
import './Dashboard.css';
import { barDataLabel } from '../../models/barDataLabel';
import { LeaderboardDepartment } from '../../models/leaderboardDepartment';
import { currMonth, months } from './util/timezone';

const Leaderboard = (pointSystem: LeaderboardDepartment[]) => {
  const createColor = (departmentName: string) => {
    let hash = 0;
    for (let i = 0; i < departmentName.length; i++) {
      hash = departmentName.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  };

  const createBarData = (item: LeaderboardDepartment) => {
    return [
      item.department.length >= 10 ? item.department.substring(0, 9).concat('...') : item.department,
      item.points,
      `${item.points} `.concat(item.points === 1 ? 'point' : 'points'),
      'color: '.concat(createColor(item.department)).concat(';'),
      "<p class='bar-data'>"
        .concat("<em class='pop-up-label'>Department: </em>")
        .concat(item.department)
        .concat('<br>')
        .concat("<em class='pop-up-label'>Points: </em>")
        .concat(item.points.toString())
        .concat('</p>')
    ];
  };

  const getBarData = () => {
    let departmentBarData: any[] = [];
    pointSystem.forEach((item: LeaderboardDepartment) => {
      departmentBarData.push(createBarData(item));
    });
    return barDataLabel.concat(departmentBarData);
  };

  const getThisMonth = () => {
    return months[currMonth];
  };

  return (
    <div className="leaderboard-container">
      <p className="leaderboard-title">Leaderboard for the month of {getThisMonth()}</p>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="BarChart"
        data={getBarData()}
        options={{
          hAxis: {
            title: 'Points'
          },
          bar: { groupWidth: '50%' },
          legend: { position: 'none' },
          tooltip: { isHtml: true, trigger: 'visible' }
        }}
      />
    </div>
  );
};

export default Leaderboard;
