import * as React from 'react'
import * as _ from 'lodash';
import './styles.scss'
import { AutoSizer, Column, Table } from 'react-virtualized';

const { useState, useEffect } = React

export type ITableProps = {
    defaultOrder?: "desc" | "asc" | undefined
    defaultOrderBy?: string
    defaultSearchTerm?: string
    data: any[]
    columns: { dataKey: string, label: string, width: number }[]
    ignoreSearchColumns?: string[]
    showSearch?: boolean
    inputClassName?: string
    onRowClick?: () => any;
    actionButtons?: JSX.Element[]
}

const App: React.FC<ITableProps> = ({ data, columns, showSearch = true, ignoreSearchColumns = undefined, defaultOrder = 'asc', defaultOrderBy = '', inputClassName = '', onRowClick = undefined, defaultSearchTerm = "", actionButtons = [] }) => {
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm)
    const [sortedData, setSortedData] = useState<any[]>([]);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);
    const [order, setOrder] = useState<"desc" | "asc">(defaultOrder);

    useEffect(() => {
        let filtered = data;
        if (showSearch) {
            filtered = _.filter(data, (d: any) => {
                let match = false;
                let keys = Object.keys(d);
                for (let i = 0; i < keys.length; i++) {
                    if (match) break;
                    if (ignoreSearchColumns) {
                        if (ignoreSearchColumns.indexOf(keys[i]) > -1) continue;
                    }
                    if (d[keys[i]]) {
                        if (d[keys[i]].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                            match = true;
                        }
                    }
                }
                return match;
            })
        }
        setFilteredData(filtered)
    }, [searchTerm, data, ignoreSearchColumns, showSearch]);

    useEffect(() => {
        setSortedData(_.orderBy(filteredData, [orderBy], order));
    }, [filteredData, orderBy, order])

    const handleSort = ({ sortBy }: { sortBy: string }) => {
        setOrder((orderBy === sortBy && order === 'asc') ? 'desc' : 'asc');
        setOrderBy(sortBy);
    };

    return (
        <div style={{ height: '100%' }}>
            {showSearch &&
                <input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    className={inputClassName}
                    style={{ marginBottom: '8px' }}
                />
            }
            {actionButtons}
            {filteredData.length > 0 &&
                <AutoSizer>
                    {({ width, height }: { height: number, width: number }) => (
                        <Table
                            height={height}
                            width={width}
                            rowHeight={40}
                            headerHeight={40}
                            sortBy={orderBy}
                            sort={handleSort}
                            rowCount={sortedData.length}
                            rowGetter={({ index }: { index: number }) => sortedData[index]}
                            onRowClick={onRowClick}
                        >
                            {columns.map(({ dataKey, label, width }: { dataKey: string, label: string, width: number }) => {
                                return (
                                    <Column
                                        width={width ? width : 200}
                                        key={dataKey}
                                        dataKey={dataKey}
                                        label={label}
                                    />
                                );
                            })}
                        </Table>
                    )}
                </AutoSizer>
            }
        </div>

    );
}

export default App