import axios from 'axios';
import { GlobalFilter } from './GlobalFilter';
import { useTable, useGlobalFilter } from 'react-table';
import { useEffect, useState, useMemo } from 'react';
import './App.css';


function App() {

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://api.publicapis.org/categories')
      .then(res => {
        const dataSet = res.data.categories
        let arrangedData = []
        for (let x in dataSet) {
          arrangedData.push({ col1: dataSet[x] })
        }
        setData(arrangedData)
      })
  }, [])

  const dataTable = useMemo(
    () => [
      data,
    ], [])


  const columns = useMemo(
    () => [
      {
        Header: 'Catagories',
        accessor: 'col1',
      },
    ], [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({ columns, data }, useGlobalFilter)
  const { globalFilter } = state
  return (
    <>

      <div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table className='m-4' {...getTableProps()} style={{ border: 'solid 1px' }}>
          <thead >
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 "
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'white',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </>

  );
}

export default App;
