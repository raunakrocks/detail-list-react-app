import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Fabric, DetailsList, IColumn, Selection } from 'office-ui-fabric-react';

interface IEmployeData {
    name: string;
    empID: number;
}

interface IEmployeeDataListState {
  employeeDataList: IEmployeData[];
  columns: IColumn[];
  selectionDetails: string;
}

class EmployeeList extends React.Component<{}, IEmployeeDataListState> {
    private _selection: Selection;
    private dataList: IEmployeData[];

    constructor(props: {}) {
      super(props);
      this.dataList = _generateDataList();
      const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Name',
            fieldName: 'modifiedBy',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            isCollapsible: true,
            data: 'string',
            onRender: (item: IEmployeData) => {
                return <div>{item.name}</div>
            },
            isPadded: true
          },
          {
            key: 'column2',
            name: 'Employee ID',
            fieldName: 'fileSizeRaw',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            isCollapsible: true,
            data: 'number',
            onRender: (item: IEmployeData) => {
                return <div>{item.empID}</div>
            }
          }
      ];

      this._selection = new Selection({
        onSelectionChanged: () => {
          this.setState({
            selectionDetails: this._getSelectionDetails()
          });
        }
      });

      this.state = {
          columns: columns,
          employeeDataList: this.dataList,
          selectionDetails: this._getSelectionDetails()
 
      };
    }

    render() {
        const {columns, employeeDataList, selectionDetails}= this.state;
        return (
            <Fabric>
                 <div>{selectionDetails}</div>
                <DetailsList 
                    columns={columns}
                    items={employeeDataList}
                    
                />
            </Fabric>
        );
    }
    
    private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        this.setState({
            employeeDataList: text ? this.dataList.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this.dataList
        });
    };

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();
    
        switch (selectionCount) {
          case 0:
            return 'No items selected';
          case 1:
            return '1 item selected: ' + (this._selection.getSelection()[0] as IEmployeData).name;
          default:
            return `${selectionCount} items selected`;
        }
      }
}

export default EmployeeList;

function  _generateDataList() {
  const dataList: IEmployeData[] = [];
  for (let i = 0; i< 100; i++) {
    const empName = i%2==0 ? 'raunak': 'xyz';
    let employeeID = i + 1;
    dataList.push({name: empName, empID: employeeID})
  }
  return dataList;
}