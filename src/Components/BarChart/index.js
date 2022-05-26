import {
  VictoryTheme,
  VictoryChart,
  VictoryBar,
  VictoryStack
} from 'victory';
import useWindowDimensions from '../windowSizeHook/windowSize.js';

const BarChart = ({ users }) => {
  const { width, height } = useWindowDimensions();
  const data = users
    .map((user) => {
      if (user.rating != null) {
        let temp = user.fullname.split(" ")
        let  userName = temp[0]+ ". " + temp[1][0];
        return {
          x:  width > 950 ? user.fullname : userName,
          y: user.rating
        };
      }
      return null;
    })
    .filter(Boolean);

  const countedHeight = height > 800 ? height - height * 0.45 : height - 65;
  const countedWidth = width > 800 ? width - width * 0.35 : width - 30;

  return (
    <div className="bar-chart-main-container">
      <VictoryChart
        height={countedHeight}
        width={countedWidth}
        theme={VictoryTheme.material}
        domainPadding={{ x: 50, y: [0, 90] }}
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
