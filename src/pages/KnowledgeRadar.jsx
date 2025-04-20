import { useState } from 'react';
import { Input, Select, Button, message } from 'antd';
import ReactECharts from 'echarts-for-react';

const knowledgeBase = {
  k001: "一元一次方程",
  k002: "函数的图像",
  k003: "三角函数",
  k004: "概率与统计",
  k005: "集合与简易逻辑",
  k006: "不等式与不等式组",
  k007: "二次函数",
  k008: "指数与对数函数",
  k009: "数列基础",
  k010: "平面向量",
  k011: "立体几何初步",
  k012: "解析几何",
  k013: "圆与方程",
  k014: "导数及其应用",
  k015: "排列组合与二项式定理",
  k016: "概率与统计综合题",
  k017: "复数的初步认识",
  k018: "函数性质与图像变换",
  k019: "线性规划问题",
  k020: "空间几何体与投影"
};

const generateData = (length, base = 75, spread = 5) =>
  Array.from({ length }, () =>
    Math.round(base + (Math.random() * spread * 2 - spread))
  );

const KnowledgeRadarChart = () => {
  const [studentId, setStudentId] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [option, setOption] = useState(null);

  const handleConfirm = () => {
    if (!studentId || selectedKeys.length === 0) {
      message.warning('请输入学号并至少选择一个知识点');
      return;
    }

    const data = generateData(selectedKeys.length, 68, 15);

    const indicators = selectedKeys.map((key) => ({
      name: knowledgeBase[key],
      max: 100,
    }));

    const radarOption = {
      title: {
        text: `学号 ${studentId} 的知识掌握情况`,
        left: 'center',
        textStyle: { color: '#fff' },
      },
      tooltip: {},
      radar: {
        indicator: indicators,
        name: {
          color: '#fff',
          fontSize: 14,
        },
        axisLine: { lineStyle: { color: '#ccc' } },
        splitLine: { lineStyle: { color: '#555' } },
        splitArea: { areaStyle: { color: ['#111', '#222'] } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: data,
              name: '掌握程度',
              areaStyle: { color: 'rgba(0, 255, 255, 0.3)' },
            },
          ],
        },
      ],
    };

    setOption(radarOption);
  };

  return (
    <div style={{ padding: 24, backgroundColor: '#1f1f1f', minHeight: '100vh', color: '#fff' }}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <Input
          placeholder="请输入学号"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          mode="multiple"
          placeholder="请选择知识点"
          value={selectedKeys}
          onChange={setSelectedKeys}
          options={Object.entries(knowledgeBase).map(([key, label]) => ({ value: key, label }))}
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={handleConfirm}>
          确认
        </Button>
      </div>
      {option && <ReactECharts option={option} style={{ height: 500 }} />}
    </div>
  );
};

export default KnowledgeRadarChart;
