import React, {Fragment} from 'react';
import {Button, Table} from "rsuite";
const {Column, Cell, HeaderCell} = Table;
const TicketTable = ({data, sendToWidget, title}) => {

    return (
        <Table  bordered cellBordered rowHeight={45} height={data.length> 3 ? 500 : 200}  data={data} loading={false}>
            <Column flexGrow={1}>
                <HeaderCell>SEC</HeaderCell>
                <Cell>
                    {(rowData, rowIndex) => {
                        return <span>{rowData.SEC}</span>
                    }}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell>ROW</HeaderCell>
                <Cell>
                    {(rowData, rowIndex) => {
                        return <span>{rowData.ROW}</span>
                    }}
                </Cell>
            </Column>
            <Column width={100} flexGrow={1}>
                <HeaderCell>SEAT</HeaderCell>
                <Cell>
                    {(rowData, rowIndex) => {
                        return <span>{rowData.SEAT}</span>
                    }}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell>TOTAL AMOUNT</HeaderCell>
                <Cell>
                    {(rowData, rowIndex) => {
                        return <span>{rowData.TOTAL}</span>
                    }}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell>TIME</HeaderCell>
                <Cell>
                    {(rowData, rowIndex) => {
                        return <span>{rowData.TIME}</span>
                    }}
                </Cell>
            </Column>
            <Column flexGrow={1} align="center">
                <HeaderCell>Actions</HeaderCell>
                <Cell>
                    {(rowData, rowIndex) => {
                        return  <Fragment>
                            <div className="row">
                                <div className="col-6">
                                    <Button
                                        size="xs"
                                        block
                                        appearance="primary"
                                        className="mb-2"
                                        onClick={() =>sendToWidget(rowData.id, rowData.SEC,rowData.ROW,rowData.SEAT, title, "YES")}
                                    >
                                        YES
                                    </Button>
                                </div>
                                <div className="col-6">
                                    <Button
                                        size="xs"
                                        block
                                        color="red"
                                        appearance="primary"
                                        className="mb-2"
                                        onClick={() =>sendToWidget(rowData.id, rowData.SEC,rowData.ROW,rowData.SEAT, title, "NO")}
                                    >
                                        NO
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    }}
                </Cell>
            </Column>
        </Table>
    );
};

export default TicketTable;
