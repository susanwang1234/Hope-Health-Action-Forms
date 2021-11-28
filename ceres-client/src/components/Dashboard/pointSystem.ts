interface LeaderboardDepartment {
  department: string;
  score: number;
}

interface Department {
  id: number;
  name: string;
}

interface ToDoStatus {
  departmentId: number;
  dataForm: boolean;
  caseStudies: number;
}

const calculateScore = (currDepartmentStatus: ToDoStatus) => {
  return currDepartmentStatus.caseStudies + Number(currDepartmentStatus.dataForm);
};

export const calculateDepartmentPoints = (departments: Department[], departmentStatus: ToDoStatus[]) => {
  let monthlyLeaderboard: LeaderboardDepartment[] = new Array();
  let leaderboardDepartment: LeaderboardDepartment;
  departments.forEach((department: Department, index: number) => {
    leaderboardDepartment = {
      department: '',
      score: 0
    };
    leaderboardDepartment.department = department.name;
    leaderboardDepartment.score += calculateScore(departmentStatus[index]);
    monthlyLeaderboard.push(leaderboardDepartment);
  });
  return monthlyLeaderboard;
};
