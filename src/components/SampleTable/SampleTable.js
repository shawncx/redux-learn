/**
 * Created by chenxiao on 9/21/16.
 */
import React, {PropTypes} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'


class SimpleTable extends React.Component {

  static propTypes = {
    onClickRow: PropTypes.func,
    onDoubleClickRow: PropTypes.func,
    tableHeaders: PropTypes.array,
    tableRows: PropTypes.array,
    selectedIndex: PropTypes.number,
  }

  static defaultProps = {
    onClickRow: () => {},
    onDoubleClickRow: () => () => {},
    tableHeaders: [],
    tableRows: [],
    selectedIndex: -1,
  }

  headerSort = index => {
    return () => {
      alert(index)
    }
  }

  onClickRow = index => this.props.onClickRow(index)

  onDoubleClickRow = index => this.props.onDoubleClickRow(index)

  render() {
    const {tableHeaders, tableRows} = this.props
    return (
      <Table onRowSelection={this.onClickRow}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            {tableHeaders.map((row, index) => (
              <TableHeaderColumn key={index}>
                <span onClick={this.headerSort(index)}>{row}</span>
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          displayRowCheckbox={false}>
          {tableRows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onDoubleClick={this.onDoubleClickRow(rowIndex)}
              selected={rowIndex == this.props.selectedIndex}>
              {row.map((col, colIndex) => (
                <TableRowColumn key={colIndex}>{col}</TableRowColumn>)
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

}

export default SimpleTable