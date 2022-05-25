import { VictoryTheme, VictoryChart, VictoryBar, VictoryStack } from 'victory';
import useWindowDimensions from '../windowSizeHook/windowSize.js';

const BarChart = ({ users }) => {
  const data = users
    .map((user) => {
      if (user.rating != null) {
        return {
          x: user.fullname,
          y: user.rating
        };
      }
      return null;
    })
    .filter(Boolean);

  const { width, height } = useWindowDimensions();

  const countedHeight = height > 800 ? height - height * 0.35 : height-40;
  const countedWidth = width > 800 ? width - width * 0.35 : width - 30;

  return (
    <div className="bar-chart-main-container">
      <VictoryChart
        height={countedHeight}
        width={countedWidth}
        theme={VictoryTheme.material}
        domainPadding={{ x: 50, y: [0, 85] }}
      >
        <VictoryStack style={{ zIndex: 1000 }}>
          <VictoryBar
            opacity={1}
            style={{
              data: {
                fill: 'black',
                stroke: 'gold',
                strokeWidth: 3
              }
            }}
            data={data}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export default BarChart;
