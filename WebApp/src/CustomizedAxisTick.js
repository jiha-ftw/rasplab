const CustomizedAxisTick = ({ x, y, payload }) => {
  const splits = payload.value.split(' '),
    date = splits[0],
    time = splits[1];

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill="#666">
        <tspan textAnchor="middle" x="0">{date}</tspan>
        <tspan textAnchor="middle" x="0" dy="20">{time}</tspan>
      </text>
    </g>
  );
};

export default CustomizedAxisTick;