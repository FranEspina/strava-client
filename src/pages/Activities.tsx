import { LogoStrava } from '../components/LogoStrava'
import { Box} from '@mui/material'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useActivitiesGrid } from '../hooks/useActivitiesGrid';

export function Activities () {

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const navigate = useNavigate()
  const {columns, rows, loading, paginationModel, setPaginationModel} = useActivitiesGrid()

  return (
    <section>
      <Box component="hgroup" sx={{mb:2,  display: 'flex', flexDirection: 'row', gap:2, alignItems: 'center', justifyContent: 'star' }}>
        <LogoStrava size={20}></LogoStrava>
        <h3>Listado de actividades</h3>
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={[10, 20, 50]}
          rowCount={5000}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          onRowDoubleClick={(newRowClickModel) => {
            navigate(`/activities/${newRowClickModel.id}`)}
          }
          rowSelectionModel={rowSelectionModel}
          loading={loading}
          keepNonExistentRowsSelected
        />
      </Box>
    </section>
  )
}