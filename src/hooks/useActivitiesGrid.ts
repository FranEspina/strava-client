import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { kmConvert, meterConvert, timeConvert } from '../services/formatService.ts'
import { getActivitiesAsync } from '../services/stravaService.ts'
import { useEffect, useState } from 'react';
import { useStravaStore } from '../store/strava.ts';
import { StravaActivity } from '../models/StravaActivityModel.ts';

export function useActivitiesGrid () {

  const access_token = useStravaStore(state => state.user?.strava_data.access_token)
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<StravaActivity[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Descripción', width: 300 },
    {
      field: 'distance',
      headerName: 'Kms',
      headerAlign: 'right', 
      type: 'number',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
      `${kmConvert(params.row.distance) || ''}`,
    },
    {
      field: 'elapsed_time',
      headerName: 'Tiempo',
      headerAlign: 'right', 
      sortable: false,
      width: 100,
      align: 'right',
      valueGetter: (params: GridValueGetterParams) =>
      `${timeConvert(params.row.elapsed_time) || ''}`,
    },
    {
      field: 'moving_time',
      headerName: 'En movimiento',
      headerAlign: 'right',
      sortable: false, 
      width: 110,
      align: 'right',
      valueGetter: (params: GridValueGetterParams) =>
      `${timeConvert(params.row.moving_time) || ''}`,
    },
    {
      field: 'total_elevation_gain',
      headerName: 'Elevación',
      headerAlign: 'right', 
      width: 110,
      align: 'right',
      valueGetter: (params: GridValueGetterParams) =>
      `${meterConvert(params.row.total_elevation_gain) || ''}`,
    },
    {
      field: 'type',
      headerName: 'Tipo',
      headerAlign: 'right', 
      width: 80,
      align: 'right',
    },
  ];

    useEffect(() => {
      let active = true;

      (async () => {
        setLoading(true);
        if (!access_token){
          console.log('Se esperaba Token de acceso')
          return
        }
        const result = await getActivitiesAsync({tokenStr: access_token, page: paginationModel.page + 1, perPage: paginationModel.pageSize})
        const newRows = result.value
        if (!active) {
          return;
        }

        if (newRows){
          setRows(newRows);
        }

        setLoading(false);
      })();

      return () => {
        active = false;
      };
    }, [paginationModel.page, paginationModel.pageSize, access_token]);

    return {columns, rows, loading, paginationModel, setPaginationModel}
}