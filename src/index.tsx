import * as React from 'react'
import * as _ from 'lodash';
import './styles.scss'
import { AutoSizer, Column, Table } from 'react-virtualized';

const { useState, useEffect } = React

export type INestedTableProps = {
  defaultOrder?: "desc"|"asc"|undefined
  defaultOrderBy?: string
  data: any[]
  columns: { dataKey: string, label: string, width: number }[]
}

const VirtualizedSortableTable: React.FC<INestedTableProps> = ({ data, columns, defaultOrder='asc', defaultOrderBy='' }) => {
    const [sortedData, setSortedData] = useState<any[]>([]);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);
    const [order, setOrder] = useState<"desc"|"asc">(defaultOrder);

    useEffect(() => {
        setSortedData(_.orderBy(data, [orderBy], order));
    }, [data, orderBy, order])

    const handleSort = ({ sortBy }: { sortBy: string }) => {
        setOrder((orderBy === sortBy && order === 'asc') ? 'desc' : 'asc');
        setOrderBy(sortBy);
    };

    return (
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
                    rowGetter={({ index }: { index: number}) => sortedData[index]}
                >
                    {columns.map(({ dataKey, label, width }: {dataKey: string, label: string, width: number}) => {
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
    );
}

export type ITableProps = {
  defaultOrder?: "desc"|"asc"|undefined
  defaultOrderBy?: string
  data: any[]
  columns: { dataKey: string, label: string, width: number }[]
  ignoreSearchColumns?: string[]
}

const App: React.FC<ITableProps> = ({ data, columns, ignoreSearchColumns=undefined, defaultOrder='asc', defaultOrderBy=''}) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
      let filtered = _.filter(data, (d: any) => {
          let match = false;
          let keys = Object.keys(d);
          for(let i = 0; i < keys.length; i++){
              if(match) break;
              if(ignoreSearchColumns) {
                  if(ignoreSearchColumns.indexOf(keys[i]) > -1) continue;
              }
              if (d[keys[i]]) {
                  if(d[keys[i]].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                      match = true;
                  }
              }
          }
          return match;
      })
      setFilteredData(filtered)
  }, [searchTerm, data, ignoreSearchColumns]);

  const updateInput = (e: any) => {
      setSearchTerm(e.target.value);
  }

  return (
      <div style={{ height: '100%' }}>
          <input placeholder="Search" value={searchTerm} onChange={updateInput} type="text" />
          <hr />
          {filteredData.length > 0 &&
              <VirtualizedSortableTable
                  data={filteredData}
                  columns={columns}
                  defaultOrderBy={defaultOrderBy}
                  defaultOrder={defaultOrder}
              />
          }
      </div>

  );
}

export default App