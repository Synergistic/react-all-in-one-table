# react-all-in-one-table
 
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
            />
        </div>
    );
}
```