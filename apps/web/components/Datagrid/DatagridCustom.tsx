import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CustomNoRowsOverlay = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Typography variant="subtitle1" color="text.secondary">
      Nenhum dado encontrado.
    </Typography>
  </Box>
);

export function DatagridCustom() {
  const rows: any = [
    {
      id: 1,
      tipo: "Nota Fiscal",
      numero: "123456",
      cliente: "Cliente A",
      valor: "R$ 100,00",
      status: "Pendente",
      data: "01/01/2023",
    }
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "tipo", headerName: "Tipo", width: 90 },
    { field: "numero", headerName: "Número", width: 150 },
    { field: "cliente", headerName: "Cliente", width: 110 },
    { field: "valor", headerName: "Valor", width: 110 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "data", headerName: "Data", width: 110 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%", padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        checkboxSelection={false}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </Box>
  );
}
