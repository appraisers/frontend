import { VictoryTheme, VictoryChart, VictoryBar, VictoryStack } from 'victory';

const BarChart = () => {
  return (
    <div className="bar-chart-main-container">
      <VictoryChart
        height={350}
        width={500}
        theme={VictoryTheme.material}
        domainPadding={{ x: 50, y: [0, 20] }}
      >
        <VictoryStack style={{ zIndex: 1000 }}>
          <VictoryBar
            opacity={1}
            style={{
              data: {
                fill: 'black',
                stroke: 'gold',
                strokeWidth: 2,
                opacity: ({ datum }) => datum.opacity
              }
            }}
            data={[
              { x: 'Петр', y: 5, opacity: 1, },
              { x: 'Иван', y: 4, opacity: 1 },
              { x: 'Олег', y: 3, opacity: 1 },
              { x: 'Никита', y: 2, opacity: 1 }
            ]}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export default BarChart;
