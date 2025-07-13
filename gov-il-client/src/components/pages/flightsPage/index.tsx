import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import data from "../../../types_def/flight.json"
import { useEffect, useState } from 'react';
import { getFlightsApi, type FlightClient } from './service/getFlightsApi';
import { Alert, Button } from '@mui/material';
// import { extractColumnsFromData } from './utils';

export type FlightType = typeof data;

const columns: GridColDef<FlightClient>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'airlineCompany',
        headerName: 'Airline',
        width: 150,
        editable: false,
    },
    {
        field: 'flightNumber',
        headerName: 'Flight number',
        width: 150,
        editable: false,
        // disableColumnMenu: true
    },
    {
        field: 'destinationAlphaCode',
        headerName: 'Destination Code',
        width: 150,
        editable: false,
    },
    {
        field: 'destinationCountry',
        headerName: 'Destination',
        width: 150,
        editable: false,

    },
    {
        field: 'status',
        headerName: 'Flight Status',
        width: 150,
        editable: false,
    },
    {
        field: 'country',
        headerName: 'Country',
        width: 150,
        editable: false,
    },

];
const LOCAL_STORAGE_HIDDEN_COLUMNS = "hiddenColumns"
const INCREASE_LIMIT = 10
export default function FlightsPage() {
    const [flights, setFlights] = useState<Array<FlightClient>>([])
    const [isLoadingFlights, setIsLoadingFlights] = useState(false)
    const [isErrorFlights, setIsErrorFlights] = useState(false)
    const [columnVisibilityModel, setColumnVisibilityModel] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_HIDDEN_COLUMNS) || "{}") || {})
    const [paginationLimit, setPaginationLimit] = useState(INCREASE_LIMIT)

    useEffect(() => {
        async function getFlights() {
            try {
                setIsLoadingFlights(true)
                const result = await getFlightsApi(paginationLimit)
                // const columnsResult = extractColumnsFromData(result[0])
                // setColumns(columnsResult as any)
                setFlights(result)
            } catch (error) {
                setIsErrorFlights(true)
                setFlights([])
            } finally {
                setIsLoadingFlights(false)
            }
        }
        getFlights()
    }, [paginationLimit])

    const resetColumnsSelection = () => {
        localStorage.removeItem(LOCAL_STORAGE_HIDDEN_COLUMNS)
        setColumnVisibilityModel({})
    }
    const showResetColumnsSelection = typeof columnVisibilityModel === "object" && Object.keys(columnVisibilityModel).length === 0

    return <div style={{ margin: "auto", position: "relative", width: "80%" }}>
        <h1> Flights  </h1>
        {!showResetColumnsSelection ? <Button onClick={resetColumnsSelection}> Reset Columns Selection </Button> : null}
        {isErrorFlights ? <Alert severity="error">Something went wrong!</Alert> : null}
        {<Button onClick={() => { setPaginationLimit(paginationLimit + INCREASE_LIMIT) }}> Load </Button>}
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                loading={isLoadingFlights}
                rows={flights}
                columns={columns}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(currentState) => {
                    localStorage.setItem(LOCAL_STORAGE_HIDDEN_COLUMNS, JSON.stringify(currentState))
                    setColumnVisibilityModel(currentState)
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,

                        },
                    },
                }}
                onPaginationModelChange={(a, b) => {
                    console.log("call?", a, b)
                }}
                rowCount={1000}
                pageSizeOptions={[10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    </div>
}