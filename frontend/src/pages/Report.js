import { Link } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import './Report.css';

const columns = [
    {
        field: 'id',
        headerAlign: 'center',
        headerName: 'ID',
        align: 'center',
        flex: 1.3,
    },
    {
        field: 'plateau_size',
        headerAlign: 'center',
        headerName: 'Plateau Size',
        align: 'center',
        flex: 0.6,
    },
    {
        field: 'initial_position',
        headerAlign: 'center',
        headerName: 'Initial Position',
        align: 'center',
        flex: 0.6,
    },
    {
        field: 'instruction',
        headerAlign: 'center',
        headerName: 'Instruction',
        align: 'center',
        flex: 1,
    },
    {
        field: 'final_position',
        headerAlign: 'center',
        headerName: 'Final Position',
        align: 'center',
        flex: 0.6,
    },
    {
        field: 'createdAt',
        headerAlign: 'center',
        headerName: 'Time',
        align: 'center',
        flex: 1,
    },
];

function Report() {
    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 5,
    });

    useEffect(() => {
        const fetchData = async () => {
            setPageState((old) => ({ ...old, isLoading: true }));
            const response = await fetch(
                `${process.env.REACT_APP_API}?page=${pageState.page}&limit=${pageState.pageSize}`
            );
            const json = await response.json();
            setPageState((old) => ({
                ...old,
                isLoading: false,
                data: json.data,
                total: json.total,
            }));
        };
        fetchData();
    }, [pageState.page, pageState.pageSize]);

    return (
        <Box>
            <AppBar
                style={{
                    background: '#25518f',
                    border: '2px solid black',
                    borderRadius: '12px',
                }}
            >
                <Toolbar
                    style={{
                        float: 'none',
                        width: '600px',
                        marginLeft: '35%',
                        marginRight: '50%',
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        style={{
                            fontSize: '26px',
                            fontFamily: 'Lucida Console',
                        }}
                    >
                        ROVER DEPLOYMENT REPORT
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: 100, marginBottom: 100 }}>
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#25518f',
                            border: '1px solid black',
                            color: 'white',
                            borderRadius: '8px',
                            fontSize: 16,
                        },
                    }}
                    autoHeight
                    disableSelectionOnClick
                    rows={pageState.data || []}
                    columns={columns}
                    rowCount={pageState.total || 0}
                    loading={pageState.isLoading}
                    rowsPerPageOptions={[5, 10, 20, 30, 40]}
                    pagination
                    page={pageState.page - 1}
                    pageSize={pageState.pageSize}
                    paginationMode="server"
                    onPageChange={(newPage) => {
                        setPageState((old) => ({
                            ...old,
                            page: newPage + 1,
                        }));
                    }}
                    onPageSizeChange={(newPageSize) =>
                        setPageState((old) => ({
                            ...old,
                            pageSize: newPageSize,
                        }))
                    }
                />
            </Container>
            <Link to="/">
                <button style={{ textAlign: 'right' }} className="btn-home">
                    Back
                </button>
            </Link>
        </Box>
    );
}

export default Report;
