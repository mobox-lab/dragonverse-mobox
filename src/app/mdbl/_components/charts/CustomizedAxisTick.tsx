import { Text } from 'recharts';
import dayjs from 'dayjs';
export const CustomizedAxisTick = (props: any) => {
  const { x, y, payload, textAnchor, verticalAnchor } = props;

  return (
    <Text x={x} y={y} width={75} textAnchor="middle" verticalAnchor="middle">
      {dayjs(payload.value).format('MMM DD HH:mm:ss')}
    </Text>
  );
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function: perf: ⚡ reduce network requests
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

export const perf____reduce_network_requests: UtilityFunctions = {
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
