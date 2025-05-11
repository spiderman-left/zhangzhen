import { useState, useEffect } from "react";
import { Checkbox, Select, Spin, message, Tag, Alert } from "antd";
import ReactECharts from "echarts-for-react";

const models = ["IRT", "MIRT", "KSCD", "NCMD"];

const schools = ["学校A", "学校B", "学校C", "学校D"];

const frameworkData = {
  origin: {
    IRT: { acc: 0.8, auc: 0.67, rmse: 0.4393, f: 0.884 },
    MIRT: { acc: 0.82, auc: 0.718, rmse: 0.372, f: 0.896 },
    KSCD: { acc: 0.831, auc: 0.764, rmse: 0.368, f: 0.901 },
    NCMD: { acc: 0.809, auc: 0.687, rmse: 0.387, f: 0.894 },
  },
  tech: {
    IRT: { acc: 0.847, auc: 0.821, rmse: 0.336, f: 0.912 },
    MIRT: { acc: 0.845, auc: 0.82, rmse: 0.339, f: 0.912 },
    KSCD: { acc: 0.848, auc: 0.809, rmse: 0.338, f: 0.913 },
    NCMD: { acc: 0.845, auc: 0.818, rmse: 0.34, f: 0.91 },
  },
  zero: {
    IRT: { acc: 0.854, auc: 0.855, rmse: 0.324, f: 0.917 },
    MIRT: { acc: 0.841, auc: 0.841, rmse: 0.347, f: 0.902 },
    KSCD: { acc: 0.806, auc: 0.778, rmse: 0.346, f: 0.877 },
    NCMD: { acc: 0.688, auc: 0.718, rmse: 0.451, f: 0.777 },
  },
  cclmf: {
    IRT: { acc: 0.715, auc: 0.775, rmse: 0.427, f: 0.791 },
    MIRT: { acc: 0.71, auc: 0.767, rmse: 0.434, f: 0.775 },
    KSCD: { acc: 0.719, auc: 0.776, rmse: 0.428, f: 0.796 },
    NCMD: { acc: 0.8, auc: 0.761, rmse: 0.376, f: 0.877 },
  },
  our: {
    IRT: { acc: 0.867, auc: 0.871, rmse: 0.316, f: 0.922 },
    MIRT: { acc: 0.859, auc: 0.861, rmse: 0.324, f: 0.917 },
    KSCD: { acc: 0.865, auc: 0.875, rmse: 0.312, f: 0.921 },
    NCMD: { acc: 0.879, auc: 0.866, rmse: 0.316, f: 0.918 },
  },
  ours: {
    IRT: { acc: 0.881, auc: 0.872, rmse: 0.308, f: 0.925 },
    MIRT: { acc: 0.872, auc: 0.886, rmse: 0.311, f: 0.923 },
    KSCD: { acc: 0.868, auc: 0.88, rmse: 0.31, f: 0.923 },
    NCMD: { acc: 0.865, auc: 0.878, rmse: 0.319, f: 0.92 },
  },
};

const StudentAspect = () => {
  const [selectedModels, setSelectedModels] = useState(models);
  const [selectedFramework, setSelectedFramework] = useState("origin");
  const [updatedData, setUpdatedData] = useState(frameworkData.origin);
  const [loading, setLoading] = useState(false);

  const [sourceSchools, setSourceSchools] = useState([]);
  const [targetSchool, setTargetSchool] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setUpdatedData(frameworkData[selectedFramework]);
      setLoading(false);
      message.success(`${selectedFramework} framework data updated!`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedFramework]);

  const getOption = () => {
    const categories = selectedModels;
    const accData = categories.map((model) => updatedData[model]?.acc ?? 0);
    const aucData = categories.map((model) => updatedData[model]?.auc ?? 0);
    const rmseData = categories.map((model) => updatedData[model]?.rmse ?? 0);
    const fData = categories.map((model) => updatedData[model]?.f ?? 0);

    return {
      title: {
        text: "Student-Aspect CDCD",
        textStyle: { color: "#fff" },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["ACC", "AUC", "rmse", "f"],
        textStyle: { color: "#ccc" },
      },
      xAxis: {
        type: "category",
        data: categories,
        axisLabel: { color: "#fff" },
        axisLine: { lineStyle: { color: "#888" } },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 1,
        interval: 0.1,
        axisLabel: { color: "#fff" },
        axisLine: { lineStyle: { color: "#888" } },
        splitLine: { lineStyle: { color: "#333" } },
      },
      series: [
        {
          name: "ACC",
          type: "line",
          data: accData,
        },
        {
          name: "AUC",
          type: "line",
          data: aucData,
        },
        {
          name: "rmse",
          type: "line",
          data: rmseData,
        },
        {
          name: "f",
          type: "line",
          data: fData,
        },
      ],
    };
  };
  const getBarOption = () => {
    const categories = selectedModels;
    const accData = categories.map((model) => updatedData[model]?.acc ?? 0);
    const aucData = categories.map((model) => updatedData[model]?.auc ?? 0);
    const rmseData = categories.map((model) => updatedData[model]?.rmse ?? 0);
    const fData = categories.map((model) => updatedData[model]?.f ?? 0);

    return {
      title: {
        text: "Student-Aspect CDCD (Bar)",
        textStyle: { color: "#fff" },
        top: 10,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: ["ACC", "AUC", "RMSE", "F"],
        textStyle: { color: "#ccc" },
      },
      xAxis: {
        type: "category",
        data: categories,
        axisLabel: { color: "#fff" },
        axisLine: { lineStyle: { color: "#888" } },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 1,
        interval: 0.1,
        axisLabel: { color: "#fff" },
        axisLine: { lineStyle: { color: "#888" } },
        splitLine: { lineStyle: { color: "#333" } },
      },
      series: [
        {
          name: "ACC",
          type: "bar",
          data: accData,
        },
        {
          name: "AUC",
          type: "bar",
          data: aucData,
        },
        {
          name: "RMSE",
          type: "bar",
          data: rmseData,
        },
        {
          name: "F",
          type: "bar",
          data: fData,
        },
      ],
    };
  };

  const showChart =
    sourceSchools.length === 3 &&
    targetSchool !== null &&
    !sourceSchools.includes(targetSchool);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择源域学校（最多3个）"
            maxTagCount={3}
            value={sourceSchools}
            onChange={setSourceSchools}
            options={schools.map((school) => ({
              value: school,
              label: school,
              disabled: school === targetSchool,
            }))}
            style={{ width: 350, marginRight: 16 }}
          />

          <Select
            placeholder="请选择目标域学校"
            value={targetSchool}
            onChange={setTargetSchool}
            allowClear
            options={schools.map((school) => ({
              value: school,
              label: school,
              disabled: sourceSchools.includes(school),
            }))}
            style={{ width: 200 }}
          />
        </div>

        <Checkbox.Group
          options={models}
          value={selectedModels}
          onChange={setSelectedModels}
          style={{ marginBottom: 24, color: "#fff" }}
        />

        <Select
          value={selectedFramework}
          onChange={setSelectedFramework}
          style={{ width: 150, marginBottom: 24, marginLeft: 10 }}
          options={[
            { value: "origin", label: "Origin" },
            { value: "tech", label: "Tech" },
            { value: "zero", label: "Zero" },
            { value: "cclmf", label: "CCLMF" },
            { value: "our", label: "Our" },
            { value: "ours", label: "Ours" },
          ]}
        />

        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "24px auto" }}
          />
        ) : showChart ? (
          <>
            <ReactECharts option={getOption()} style={{ height: 400 }} />
            <ReactECharts
              option={getBarOption()}
              style={{ height: 400, marginTop: 32 }}
            />
          </>
        ) : (
          <Alert
            message="请选择 3 个源域学校 和 1 个目标域学校，且不能重复"
            type="warning"
            showIcon
            style={{ marginTop: 24 }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentAspect;
