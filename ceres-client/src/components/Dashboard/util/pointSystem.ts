import { LeaderboardDepartment } from '../../../models/leaderboardDepartment';
import { Department } from '../../../models/department';
import { ToDoStatus } from '../../../models/toDoStatus';

const calculateScore = (currDepartmentStatus: ToDoStatus) => {
  return currDepartmentStatus.caseStudies + Number(currDepartmentStatus.dataForm) + Number(currDepartmentStatus.employeeOfTheMonth) * 3;
};

export const calculateDepartmentPoints = (departments: Department[], departmentStatus: ToDoStatus[]) => {
  let monthlyLeaderboard: LeaderboardDepartment[] = [];
  let leaderboardDepartment: LeaderboardDepartment;
  departments.forEach((department: Department, index: number) => {
    leaderboardDepartment = {
      department: '',
      points: 0
    };
    leaderboardDepartment.department = department.name;
    leaderboardDepartment.points += calculateScore(departmentStatus[index]);
    monthlyLeaderboard.push(leaderboardDepartment);
  });
  return monthlyLeaderboard;
};
