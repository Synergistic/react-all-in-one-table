# react-all-in-one-table
A table component that comes virtualized, sortable and searchable, out of the box.

[Demo](http://www.vr-together.net/leaderboard)


# Requirements
```
"react": "^17.0.2",
"react-dom": "^17.0.2",
"lodash": "^4.17.21",
"react-virtualized": "^9.22.3"
```

# Install
```
npm install react-all-in-one-table

yarn add react-all-in-one-table
```

# Usage
```
import Table from 'react-all-in-one-table';
function MyDataTable() {

    const data = [
        { kills: 1, deaths: 2, points: 1, name: "John Doe", id: 0 },
        { kills: 2, deaths: 1, points: 2, name: "Jane Doe", id: 1 }
    ]

    const columns = [
        { dataKey: 'name', label: 'Player', width: 75 },
        { dataKey: 'kills', label: 'Kills', width: 75 },
        { dataKey: 'deaths', label: 'Deaths', width: 75 },
        { dataKey: 'points', label: 'Points', width: 75 },
    ]

    const tableHeight = '500px'

    return (
        <div style={{ height: tableHeight }}>
            <Table
                data={data}
                columns={columns}
                defaultOrder="desc"
                defaultOrderBy="points"
                ignoreSearchColumns={["id"]}
                onRowClick={({rowData}) => console.log(rowData.name)}
            />
        </div>
    );
}
```
### Prop Types
|       Property      |                         Type                        | Required? | Default |                                Description                               |
|:-------------------:|:---------------------------------------------------:|:---------:|:-------:|:------------------------------------------------------------------------:|
|       columns       | { dataKey: string, label: string, width: number }[] |     x     |         | The header label, field to search on data items, and width of the column |
|         data        |                        any[]                        |     x     |         |                           Any array of objects                           |
|     defaultOrder    |             "desc" \| "asc" \| undefined            |           |  "asc"  |          The default sort order if supplying an order by column          |
|    defaultOrderBy   |                        string                       |           |    ""   |                 The column/field to sort by on first load                |
| ignoreSearchColumns |                       string[]                      |           |    []   |           Fields/columns to ignore when using the search input           |
|    inputClassName   |                        string                       |           |    ""   |                 CSS class applied to search input element                |
|      showSearch     |                       boolean                       |           |   TRUE  |                      Show/hide the search input box                      |
|      onRowClick     |                     () => any                       |           |         |Callback invoked when a user clicks on a table row. `({ event: Event, index: number, rowData: any }): void`|
# Styling
You can style the table using the css classes described in the [react-virtualized docs](https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md#class-names).