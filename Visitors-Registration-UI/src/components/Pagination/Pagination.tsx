import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import style from './Pagination.module.css'

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AppPagination = ({ page, totalPages, onPageChange }: AppPaginationProps) => {
  if (totalPages <= 0) return null;

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onPageChange(value)}
        color="primary" className=''
        shape="rounded"
      />
    </Stack>
  );
};

export default AppPagination;
