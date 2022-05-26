import { VictoryTheme, VictoryChart, VictoryBar, VictoryStack } from 'victory';
import useWindowDimensions from '../windowSizeHook/windowSize.js';

const BarChart = ({ users }) => {
  const { width, height } = useWindowDimensions();
  const data = users
    .map((user) => {
      if (user.rating != null) {
        let splittedUserName = user.fullname.split(' ');
        let shortenedName = splittedUserName[0];
        if (splittedUserName[1]?.[0] != null)
          shortenedName += `. ${splittedUserName[1][0].toUpperCase()}`;
        return {
          x: width > 950 ? user.fullname : shortenedName,
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
