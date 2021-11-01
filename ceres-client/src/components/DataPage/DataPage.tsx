import React from 'react';
import '../../App.css';
import './dataPage.css';
import ReportElement from '../ReportElement';
import ReportData from '../ReportData';
import NavBar from '../../components/Navbar/Navbar';

class DataPage extends React.Component<any[], any> {
  constructor(props: any[]) {
    super(props);
    this.state = {
      isLoaded: false,
      reports: [],
      displayingData: null,
      indexOfSelectedReport: null
    };
  }
  async componentDidMount() {
    const url = 'http://localhost:8080/rehab_report/get/rehab_report';
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched Rehab Reports are: ' + data);
      this.setState({
        isLoaded: true,
        reports: data
      });
    } catch (error) {
      console.log('Error: Unable to fetch from ' + url);
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="flex">
          <div className=" data-list border-black font-bold text-center p-4 m-6 row-span-3 bg-gray-300 relative rounded">
            <h4 className="text-center">Submitted Reports</h4>
            <ul className="list-of-reports">
              {this.state.reports.map((report: any, index: number) => (
                <ReportElement data={report} onClick={() => this.handleClick(index)} />
              ))}
            </ul>
            <button className=" button bg-green-400 text-white hover:bg-green-200 w-80">Add Report</button>
          </div>
          <ReportData data={this.state.displayingData} />
        </div>
      </React.Fragment>
    );
  }
  handleClick(index: number): void {
    this.setState({ displayingData: this.state.reports[index], indexOfSelectedReport: index });
  }
}

export default DataPage;
