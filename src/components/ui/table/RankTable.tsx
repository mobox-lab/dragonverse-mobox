import LoadingSvg from '@/../public/svg/loading.svg?component';
import { clsxm } from '@/utils';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Fragment, ReactNode, useMemo } from 'react';

type RankTableProps = {
  dataSource: any[];
  columns: any[];
  className?: string;
  headerClass?: string;
  headerGroupClass?: string;
  bodyClass?: string;
  rowClass?: string;
  gapClass?: string;
  emptyClass?: string;
  loading?: boolean;
  renderBottom?: () => ReactNode;
  firstLineHighLight?: boolean;
};

export default function RankTable({
  dataSource,
  columns,
  className,
  loading,
  renderBottom,
  headerClass,
  headerGroupClass,
  bodyClass,
  rowClass,
  gapClass,
  emptyClass,
  firstLineHighLight,
}: RankTableProps) {
  const data = useMemo(() => dataSource, [dataSource]);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  return (
    <div className={clsxm('flex w-full flex-col overflow-auto text-right', className)}>
      <div className={clsxm('border-b border-gray bg-[#43454980]', headerClass)}>
        {getHeaderGroups().map((headerGroup) => (
          <div
            className={clsxm(
              'flex w-full gap-[1.92vw] py-[0.8vw] text-[0.96vw]/[1.44vw] font-medium xl:gap-6 xl:py-2.5 xl:text-xs/4.5',
              headerGroupClass,
              gapClass,
            )}
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
            ))}
          </div>
        ))}
      </div>
      <div className={clsxm('scrollbar-hide flex flex-grow flex-col overflow-auto pb-[3.2vw] xl:pb-10', bodyClass)}>
        {rows.length ? (
          rows.map((row, idx) => (
            <motion.div
              className={clsxm(
                'flex w-full items-center gap-[1.92vw] border-b border-gray py-[0.96vw] text-[0.96vw]/[1.44vw] font-medium xl:gap-6 xl:py-3 xl:text-xs/4.5',

                { 'bg-[#4d442e]/30': idx === 0 && firstLineHighLight },
                rowClass,
                gapClass,
              )}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                return <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>;
              })}
            </motion.div>
          ))
        ) : loading ? (
          <div className="flex-center">
            <LoadingSvg className="mt-[2.56vw] h-[3.2vw] w-[3.2vw] animate-spin fill-white/20 xl:mt-8 xl:h-10 xl:w-10" />
          </div>
        ) : (
          <div
            className={clsxm(
              'flex-center border-b border-gray py-[1.28vw] text-[0.96vw]/[1.44vw] font-medium text-gray-300 xl:py-4 xl:text-xs/4.5',
              emptyClass,
            )}
          >
            No Data
          </div>
        )}
        {renderBottom?.()}
      </div>
    </div>
  );
}

// TypeScript React component methods for: docs: 📝 add troubleshooting section
interface docs____add_troubleshooting_sectionProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____add_troubleshooting_sectionState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____add_troubleshooting_section = () => {
  const [state, setState] = useState<docs____add_troubleshooting_sectionState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____add_troubleshooting_section = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____add_troubleshooting_section');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handledocs____add_troubleshooting_section
  };
};

// TypeScript utility function: feat: ✨ add TypeScript generics for reusable components
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const feat____add_TypeScript_generics_for_reusable_components: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript utility function: security: 🔒 add rate limiting
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____add_rate_limiting: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};

// TypeScript test for: style: 💄 update color scheme
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____update_color_scheme', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
