import { useRef, useState } from "react";
import { Select } from "antd";
import ReactECharts from "echarts-for-react";

const { Option } = Select;

const RadarChartPage = () => {
  const frameworks = ["origin", "tech", "zero", "cclmf", "our", "ours"];
  const modelOptions = ["IRT", "MIRT", "KSCD", "NCMD"];

  const indicators = [
    { name: "AUC", max: 1 },
    { name: "ACC", max: 1 },
    { name: "RMSE", max: 1 },
    { name: "F1", max: 1 },
  ];

  const modelDataMap = {
    IRT: [
      { name: "origin", value: [0.667, 0.652, 0.466, 0.738] },
      { name: "tech", value: [0.779, 0.729, 0.421, 0.800] },
      { name: "zero", value: [0.721, 0.696, 0.460, 0.809] },
      { name: "cclmf", value: [0.775, 0.723, 0.452, 0.808] },
      { name: "our", value: [0.798, 0.742, 0.411, 0.815] },
      { name: "ours", value: [0.799, 0.743, 0.411, 0.816] },
    ],
    MIRT: [
      { name: "origin", value: [0.672, 0.669, 0.459, 0.763] },
      { name: "tech", value: [0.779, 0.727, 0.422, 0.797] },
      { name: "zero", value: [0.723, 0.706, 0.439, 0.799] },
      { name: "cclmf", value: [0.771, 0.726, 0.426, 0.805] },
      { name: "our", value: [0.793, 0.738, 0.415, 0.816] },
      { name: "ours", value: [0.801, 0.743, 0.411, 0.809] },
    ],
    NCMD: [
      { name: "origin", value: [0.706, 0.655, 0.456, 0.724] },
      { name: "tech", value: [0.780, 0.727, 0.421, 0.795] },
      { name: "zero", value: [0.734, 0.697, 0.437, 0.792] },
      { name: "cclmf", value: [0.775, 0.723, 0.452, 0.811] },
      { name: "our", value: [0.785, 0.735, 0.417, 0.815] },
      { name: "ours", value: [0.788, 0.731, 0.418, 0.812] },
    ],
    KSCD: [
      { name: "origin", value: [0.710, 0.691, 0.445, 0.779] },
      { name: "tech", value: [0.778, 0.729, 0.422, 0.799] },
      { name: "zero", value: [0.728, 0.703, 0.431, 0.792] },
      { name: "cclmf", value: [0.782, 0.732, 0.420, 0.799] },
      { name: "our", value: [0.795, 0.741, 0.413, 0.818] },
      { name: "ours", value: [0.796, 0.739, 0.414, 0.812] },
    ],
  };
  

  const [selectedModel, setSelectedModel] = useState("IRT");
  const [data, setData] = useState(modelDataMap["IRT"]);
  const chartRef = useRef();

  const handleChange = (value) => {
    const chart = chartRef.current?.getEchartsInstance();
    chart?.showLoading({ text: "加载中...", color: "#00f" });

    setTimeout(() => {
      setSelectedModel(value);
      setData(modelDataMap[value]);
      chart?.hideLoading();
    }, 500);
  };

  const option = {
    title: {
      text: `多框架雷达图对比（${selectedModel}）`,
      textStyle: { color: "#fff" },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: frameworks,
      textStyle: { color: "#ccc" },
    },
    radar: {
      indicator: indicators,
      name: {
        textStyle: { color: "#fff" },
      },
      splitLine: { lineStyle: { color: "#444" } },
      splitArea: { areaStyle: { color: ["#1f2a38", "#203a43"] } },
    },
    series: [
      {
        type: "radar",
        data: data,
      },
    ],
  };

  return (
    <div>
      <Select
        value={selectedModel}
        onChange={handleChange}
        style={{ width: 160, marginBottom: 20 }}
        options={modelOptions.map((model) => ({
          value: model,
          label: model,
        }))}
      />
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: 500 }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default RadarChartPage;
