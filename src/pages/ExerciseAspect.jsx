import { useState, useEffect } from "react";
import { Checkbox, Select, Spin, message, Alert } from "antd";
import ReactECharts from "echarts-for-react";

const models = ["IRT", "MIRT", "KSCD", "NCMD"];
const tags = ["语文", "历史", "地理", "数学", "物理", "生物"];

// 你所有的组合对应的数据映射函数
const getFrameworkDataByCombination = (sourceSubjects, targetSubject) => {
  const isLiberalArts = (s) => ["语文", "历史", "地理"].includes(s);
  const isScience = (s) => ["数学", "物理", "生物"].includes(s);

  const sourceSet = new Set(sourceSubjects);

  const isSourceScience = [...sourceSet].every(isScience);
  const isSourceLiberal = [...sourceSet].every(isLiberalArts);

  const targetIsScience = isScience(targetSubject);
  const targetIsLiberal = isLiberalArts(targetSubject);

  const combo = [...sourceSet].sort().join("+") + "=>" + targetSubject;

  switch (combo) {
    case "生物+数学=>地理":
      return frameworkData1;
    case "语文+历史=>地理":
      return frameworkData2;
    case "语文+历史=>物理":
      return frameworkData3;
    case "生物+数学=>物理":
      return frameworkData4;
    default:
      if (isSourceScience && targetIsScience) return frameworkData5;
      if (isSourceScience && targetIsLiberal) return frameworkData1;
      if (isSourceLiberal && targetIsScience) return frameworkData3;
      if (isSourceLiberal && targetIsLiberal) return frameworkData2;
      return null;
  }
};

// 示例数据（你可以替换为真实数据）
const frameworkData1 = {
  origin: {
    IRT: { acc: 0.65, auc: 0.677, rmse: 0.472, f: 0.721 },
    MIRT: { acc: 0.669, auc: 0.695, rmse: 0.459, f: 0.773 },
    KSCD: { acc: 0.687, auc: 0.722, rmse: 0.448, f: 0.77 },
    NCMD: { acc: 0.683, auc: 0.714, rmse: 0.46, f: 0.765 },
  },
  tech: {
    IRT: { acc: 0.705, auc: 0.757, rmse: 0.438, f: 0.784 },
    MIRT: { acc: 0.709, auc: 0.765, rmse: 0.435, f: 0.787 },
    KSCD: { acc: 0.709, auc: 0.761, rmse: 0.435, f: 0.785 },
    NCMD: { acc: 0.715, auc: 0.771, rmse: 0.431, f: 0.788 },
  },
  zero: {
    IRT: { acc: 0.693, auc: 0.734, rmse: 0.446, f: 0.776 },
    MIRT: { acc: 0.686, auc: 0.722, rmse: 0.45, f: 0.763 },
    KSCD: { acc: 0.695, auc: 0.734, rmse: 0.442, f: 0.776 },
    NCMD: { acc: 0.688, auc: 0.718, rmse: 0.451, f: 0.777 },
  },
  cclmf: {
    IRT: { acc: 0.715, auc: 0.775, rmse: 0.427, f: 0.791 },
    MIRT: { acc: 0.71, auc: 0.767, rmse: 0.434, f: 0.775 },
    KSCD: { acc: 0.719, auc: 0.776, rmse: 0.428, f: 0.796 },
    NCMD: { acc: 0.715, auc: 0.769, rmse: 0.435, f: 0.781 },
  },
  our: {
    IRT: { acc: 0.726, auc: 0.791, rmse: 0.422, f: 0.795 },
    MIRT: { acc: 0.72, auc: 0.786, rmse: 0.428, f: 0.794 },
    KSCD: { acc: 0.726, auc: 0.788, rmse: 0.424, f: 0.791 },
    NCMD: { acc: 0.722, auc: 0.786, rmse: 0.427, f: 0.784 },
  },
  ours: {
    IRT: { acc: 0.727, auc: 0.792, rmse: 0.421, f: 0.792 },
    MIRT: { acc: 0.728, auc: 0.791, rmse: 0.423, f: 0.789 },
    KSCD: { acc: 0.724, auc: 0.788, rmse: 0.424, f: 0.794 },
    NCMD: { acc: 0.722, auc: 0.786, rmse: 0.424, f: 0.783 },
  },
};

const frameworkData2 = {
  origin: {
    IRT: { acc: 0.659, auc: 0.687, rmse: 0.465, f: 0.731 },
    MIRT: { acc: 0.671, auc: 0.689, rmse: 0.436, f: 0.763 },
    KSCD: { acc: 0.688, auc: 0.722, rmse: 0.448, f: 0.771 },
    NCMD: { acc: 0.679, auc: 0.717, rmse: 0.453, f: 0.752 },
  },
  tech: {
    IRT: { acc: 0.707, auc: 0.754, rmse: 0.438, f: 0.782 },
    MIRT: { acc: 0.709, auc: 0.761, rmse: 0.435, f: 0.781 },
    KSCD: { acc: 0.702, auc: 0.749, rmse: 0.443, f: 0.778 },
    NCMD: { acc: 0.678, auc: 0.721, rmse: 0.451, f: 0.749 },
  },
  zero: {
    IRT: { acc: 0.705, auc: 0.76, rmse: 0.437, f: 0.78 },
    MIRT: { acc: 0.662, auc: 0.724, rmse: 0.454, f: 0.724 },
    KSCD: { acc: 0.702, auc: 0.749, rmse: 0.443, f: 0.778 },
    NCMD: { acc: 0.687, auc: 0.728, rmse: 0.445, f: 0.775 },
  },
  cclmf: {
    IRT: { acc: 0.711, auc: 0.776, rmse: 0.433, f: 0.786 },
    MIRT: { acc: 0.704, auc: 0.758, rmse: 0.439, f: 0.776 },
    KSCD: { acc: 0.711, auc: 0.772, rmse: 0.432, f: 0.787 },
    NCMD: { acc: 0.711, auc: 0.766, rmse: 0.438, f: 0.775 },
  },
  our: {
    IRT: { acc: 0.722, auc: 0.783, rmse: 0.425, f: 0.79 },
    MIRT: { acc: 0.714, auc: 0.778, rmse: 0.431, f: 0.793 },
    KSCD: { acc: 0.723, auc: 0.785, rmse: 0.425, f: 0.794 },
    NCMD: { acc: 0.717, auc: 0.774, rmse: 0.43, f: 0.78 },
  },
  ours: {
    IRT: { acc: 0.724, auc: 0.787, rmse: 0.424, f: 0.793 },
    MIRT: { acc: 0.728, auc: 0.792, rmse: 0.422, f: 0.787 },
    KSCD: { acc: 0.724, auc: 0.788, rmse: 0.424, f: 0.794 },
    NCMD: { acc: 0.72, auc: 0.786, rmse: 0.426, f: 0.783 },
  },
};

const frameworkData3 = {
  origin: {
    IRT: { acc: 0.686, auc: 0.747, rmse: 0.46, f: 0.731 },
    MIRT: { acc: 0.718, auc: 0.775, rmse: 0.439, f: 0.779 },
    KSCD: { acc: 0.728, auc: 0.798, rmse: 0.426, f: 0.771 },
    NCMD: { acc: 0.721, auc: 0.782, rmse: 0.435, f: 0.764 },
  },
  tech: {
    IRT: { acc: 0.753, auc: 0.829, rmse: 0.407, f: 0.791 },
    MIRT: { acc: 0.744, auc: 0.828, rmse: 0.416, f: 0.807 },
    KSCD: { acc: 0.753, auc: 0.826, rmse: 0.409, f: 0.805 },
    NCMD: { acc: 0.743, auc: 0.821, rmse: 0.414, f: 0.799 },
  },
  zero: {
    IRT: { acc: 0.73, auc: 0.804, rmse: 0.424, f: 0.766 },
    MIRT: { acc: 0.721, auc: 0.794, rmse: 0.428, f: 0.757 },
    KSCD: { acc: 0.733, auc: 0.809, rmse: 0.45, f: 0.791 },
    NCMD: { acc: 0.729, auc: 0.798, rmse: 0.426, f: 0.787 },
  },
  cclmf: {
    IRT: { acc: 0.762, auc: 0.844, rmse: 0.399, f: 0.81 },
    MIRT: { acc: 0.756, auc: 0.838, rmse: 0.399, f: 0.81 },
    KSCD: { acc: 0.761, auc: 0.836, rmse: 0.404, f: 0.806 },
    NCMD: { acc: 0.754, auc: 0.831, rmse: 0.408, f: 0.791 },
  },
  our: {
    IRT: { acc: 0.773, auc: 0.854, rmse: 0.39, f: 0.815 },
    MIRT: { acc: 0.764, auc: 0.843, rmse: 0.405, f: 0.813 },
    KSCD: { acc: 0.769, auc: 0.848, rmse: 0.395, f: 0.804 },
    NCMD: { acc: 0.757, auc: 0.832, rmse: 0.407, f: 0.806 },
  },
  ours: {
    IRT: { acc: 0.774, auc: 0.854, rmse: 0.39, f: 0.814 },
    MIRT: { acc: 0.852, auc: 0.771, rmse: 0.397, f: 0.806 },
    KSCD: { acc: 0.772, auc: 0.849, rmse: 0.393, f: 0.815 },
    NCMD: { acc: 0.776, auc: 0.848, rmse: 0.397, f: 0.814 },
  },
};
const frameworkData4 = {
  origin: {
    IRT: { acc: 0.706, auc: 0.761, rmse: 0.442, f: 0.757 },
    MIRT: { acc: 0.717, auc: 0.771, rmse: 0.44, f: 0.774 },
    KSCD: { acc: 0.729, auc: 0.797, rmse: 0.426, f: 0.772 },
    NCMD: { acc: 0.725, auc: 0.79, rmse: 0.432, f: 0.771 },
  },
  tech: {
    IRT: { acc: 0.767, auc: 0.845, rmse: 0.397, f: 0.808 },
    MIRT: { acc: 0.766, auc: 0.847, rmse: 0.395, f: 0.807 },
    KSCD: { acc: 0.732, auc: 0.798, rmse: 0.398, f: 0.807 },
    NCMD: { acc: 0.732, auc: 0.797, rmse: 0.423, f: 0.784 },
  },
  zero: {
    IRT: { acc: 0.736, auc: 0.805, rmse: 0.421, f: 0.799 },
    MIRT: { acc: 0.735, auc: 0.802, rmse: 0.42, f: 0.781 },
    KSCD: { acc: 0.732, auc: 0.798, rmse: 0.428, f: 0.788 },
    NCMD: { acc: 0.714, auc: 0.791, rmse: 0.438, f: 0.776 },
  },
  cclmf: {
    IRT: { acc: 0.761, auc: 0.85, rmse: 0.403, f: 0.813 },
    MIRT: { acc: 0.768, auc: 0.843, rmse: 0.398, f: 0.813 },
    KSCD: { acc: 0.765, auc: 0.843, rmse: 0.397, f: 0.813 },
    NCMD: { acc: 0.769, auc: 0.839, rmse: 0.403, f: 0.809 },
  },
  our: {
    IRT: { acc: 0.776, auc: 0.858, rmse: 0.387, f: 0.818 },
    MIRT: { acc: 0.775, auc: 0.855, rmse: 0.398, f: 0.822 },
    KSCD: { acc: 0.764, auc: 0.848, rmse: 0.397, f: 0.796 },
    NCMD: { acc: 0.764, auc: 0.848, rmse: 0.397, f: 0.796 },
  },
  ours: {
    IRT: { acc: 0.781, auc: 0.864, rmse: 0.384, f: 0.823 },
    MIRT: { acc: 0.785, auc: 0.865, rmse: 0.389, f: 0.821 },
    KSCD: { acc: 0.776, auc: 0.855, rmse: 0.389, f: 0.816 },
    NCMD: { acc: 0.782, auc: 0.861, rmse: 0.386, f: 0.82 },
  },
};
const frameworkData5 = {
  origin: {
    IRT: { acc: 0.706, auc: 0.761, rmse: 0.442, f: 0.757 },
    MIRT: { acc: 0.717, auc: 0.771, rmse: 0.44, f: 0.774 },
    KSCD: { acc: 0.729, auc: 0.797, rmse: 0.426, f: 0.772 },
    NCMD: { acc: 0.725, auc: 0.79, rmse: 0.432, f: 0.771 },
  },
  tech: {
    IRT: { acc: 0.767, auc: 0.845, rmse: 0.397, f: 0.808 },
    MIRT: { acc: 0.766, auc: 0.847, rmse: 0.395, f: 0.807 },
    KSCD: { acc: 0.732, auc: 0.798, rmse: 0.398, f: 0.807 },
    NCMD: { acc: 0.732, auc: 0.797, rmse: 0.423, f: 0.784 },
  },
  zero: {
    IRT: { acc: 0.736, auc: 0.805, rmse: 0.421, f: 0.799 },
    MIRT: { acc: 0.735, auc: 0.802, rmse: 0.42, f: 0.781 },
    KSCD: { acc: 0.732, auc: 0.798, rmse: 0.428, f: 0.788 },
    NCMD: { acc: 0.714, auc: 0.791, rmse: 0.438, f: 0.776 },
  },
  cclmf: {
    IRT: { acc: 0.761, auc: 0.85, rmse: 0.403, f: 0.813 },
    MIRT: { acc: 0.768, auc: 0.843, rmse: 0.398, f: 0.813 },
    KSCD: { acc: 0.765, auc: 0.843, rmse: 0.397, f: 0.813 },
    NCMD: { acc: 0.769, auc: 0.839, rmse: 0.403, f: 0.809 },
  },
  our: {
    IRT: { acc: 0.776, auc: 0.858, rmse: 0.387, f: 0.818 },
    MIRT: { acc: 0.775, auc: 0.855, rmse: 0.398, f: 0.822 },
    KSCD: { acc: 0.764, auc: 0.848, rmse: 0.397, f: 0.796 },
    NCMD: { acc: 0.764, auc: 0.848, rmse: 0.397, f: 0.796 },
  },
  ours: {
    IRT: { acc: 0.781, auc: 0.864, rmse: 0.384, f: 0.823 },
    MIRT: { acc: 0.785, auc: 0.865, rmse: 0.389, f: 0.821 },
    KSCD: { acc: 0.776, auc: 0.855, rmse: 0.389, f: 0.816 },
    NCMD: { acc: 0.782, auc: 0.861, rmse: 0.386, f: 0.82 },
  },
};

const ExerciseAspect = () => {
  const [selectedModels, setSelectedModels] = useState(models);
  const [selectedFramework, setSelectedFramework] = useState("origin");
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(false);

  const [sourceSubjects, setSourceSubjects] = useState([]);
  const [targetSubject, setTargetSubject] = useState(null);

  // 更新图表数据
  useEffect(() => {
    if (
      sourceSubjects.length === 2 &&
      targetSubject &&
      !sourceSubjects.includes(targetSubject)
    ) {
      const dataMap = getFrameworkDataByCombination(
        sourceSubjects,
        targetSubject
      );
      if (!dataMap) return;
      setLoading(true);
      const timer = setTimeout(() => {
        setUpdatedData(dataMap[selectedFramework]);
        setLoading(false);
        message.success(`${selectedFramework} framework data updated!`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedFramework, sourceSubjects, targetSubject]);

  const getOption = () => {
    const categories = selectedModels;
    const accData = categories.map((model) => updatedData[model]?.acc ?? 0);
    const aucData = categories.map((model) => updatedData[model]?.auc ?? 0);
    const rmseData = categories.map((model) => updatedData[model]?.rmse ?? 0);
    const fData = categories.map((model) => updatedData[model]?.f ?? 0);

    return {
      title: {
        text: "Exercise-Aspect CDCD",
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
        text: "Exercise-Aspect CDCD (Bar)",
        textStyle: { color: "#fff" },
        top: 20,
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
          barGap: 0,
          barWidth: "15%",
        },
        {
          name: "AUC",
          type: "bar",
          data: aucData,
          barWidth: "15%",
        },
        {
          name: "RMSE",
          type: "bar",
          data: rmseData,
          barWidth: "15%",
        },
        {
          name: "F",
          type: "bar",
          data: fData,
          barWidth: "15%",
        },
      ],
    };
  };

  const showChart =
    sourceSubjects.length === 2 &&
    targetSubject !== null &&
    !sourceSubjects.includes(targetSubject);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择源域学科（最多2个）"
            maxTagCount={2}
            value={sourceSubjects}
            onChange={setSourceSubjects}
            options={tags.map((tag) => ({
              value: tag,
              label: tag,
              disabled: tag === targetSubject,
            }))}
            style={{ width: 300, marginRight: 16 }}
          />

          <Select
            placeholder="请选择目标域学科"
            value={targetSubject}
            onChange={setTargetSubject}
            allowClear
            options={tags.map((tag) => ({
              value: tag,
              label: tag,
              disabled: sourceSubjects.includes(tag),
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
          options={["origin", "tech", "zero", "cclmf", "our", "ours"].map(
            (v) => ({ value: v, label: v })
          )}
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
            message="请选择 2 个源域学科 和 1 个目标域学科，且不能重复"
            type="warning"
            showIcon
            style={{ marginTop: 24 }}
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseAspect;
