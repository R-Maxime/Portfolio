import React from 'react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis
} from 'recharts';
import { IInteractionStatsByWeekOnLastFiveWeeks } from '../../../datas/Models/Discord';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import '../../../styles/Work/Stats.scss';

const CustomLegend = ({ data }: {
  data: IInteractionStatsByWeekOnLastFiveWeeks[]
}): React.ReactElement => {
  const totalInteractions = data.reduce((acc, curr) => acc + curr.count, 0);
  const firstInteraction = data[0]?.startOfWeek;
  const lastInteraction = data[data.length - 1]?.endOfWeek;
  return (
    <div>
      <p>{`${totalInteractions.toLocaleString()} interactions entre le ${firstInteraction} et le ${lastInteraction}`}</p>
    </div>
  );
};

const CustomTooltip = ({ active, payload }:
  TooltipProps<ValueType, NameType>): React.ReactElement => {
  if (!active || !payload) {
    return <></>;
  }

  const startOfWeek = payload[0].payload.startOfWeek;
  const endOfWeek = payload[0].payload.endOfWeek;
  const count = payload[0].payload.count;

  return (
    <div className="stats__tooltip">{`${count.toLocaleString()} interactions réalisées entre le ${startOfWeek} et le ${endOfWeek}`}</div>
  );
};

function StatisticsGraph({ interactionStats }: {
  interactionStats: IInteractionStatsByWeekOnLastFiveWeeks[]
}): React.ReactElement {
  return (
    <div className='stats'>
      <div className='stats__container'>
        <ResponsiveContainer>
          <BarChart width={250} height={250} data={interactionStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="weekNumber" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend data={interactionStats} />
    </div>
  );
}

export default StatisticsGraph;
