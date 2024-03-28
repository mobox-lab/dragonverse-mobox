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
