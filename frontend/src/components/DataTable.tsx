import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import LoadingSpinner from './LoadingSpinner';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (value: any, item: T, index: number) => React.ReactNode;
  className?: string;
  width?: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  onRowClick?: (item: T, index: number) => void;
  rowActions?: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
  rowClassName?: (item: T, index: number) => string;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  sortConfig,
  onSort,
  onRowClick,
  rowActions,
  emptyMessage = 'No data available',
  className = '',
  rowClassName,
}: DataTableProps<T>) => {
  const handleSort = (key: string) => {
    if (onSort) {
      onSort(key);
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return null;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  const getValue = (item: T, key: keyof T | string): any => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj, k) => obj?.[k], item);
    }
    return item[key as keyof T];
  };

  if (loading) {
    return (
      <div className="card p-8">
        <LoadingSpinner size="lg" message="Loading data..." />
      </div>
    );
  }

  return (
    <div className={clsx('card overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={clsx(
                    'table-header',
                    {
                      'cursor-pointer hover:bg-gray-100': column.sortable,
                    },
                    column.className
                  )}
                  style={{ width: column.width }}
                  onClick={column.sortable ? () => handleSort(column.key as string) : undefined}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="text-gray-400">
                        {getSortIcon(column.key as string)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {rowActions && (
                <th className="table-header w-12">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (rowActions ? 1 : 0)}
                  className="table-cell text-center py-8 text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={index}
                  className={clsx(
                    'hover:bg-gray-50 transition-colors',
                    {
                      'cursor-pointer': onRowClick,
                    },
                    rowClassName?.(item, index)
                  )}
                  onClick={onRowClick ? () => onRowClick(item, index) : undefined}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={clsx('table-cell', column.className)}>
                      {column.render
                        ? column.render(getValue(item, column.key), item, index)
                        : getValue(item, column.key) || '-'}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="table-cell">
                      <div className="flex justify-end">
                        {rowActions(item, index)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;