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
  }

  static defaultProps = {
    onClickRow: () => {
    },
    onDoubleClickRow: () => () => {},
    tableHeaders: [],
    tableRows: [],
  }

  onDoubleClickRow = index => this.props.onDoubleClickRow(index)

  render() {
    const {onClickRow, tableHeaders, tableRows} = this.props
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            {tableHeaders.map((row, index) => (
              <TableHeaderColumn key={index}>{row}</TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {tableRows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onRowClick={onClickRow}
              onDoubleClick={this.onDoubleClickRow(rowIndex)}>
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