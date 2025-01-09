import { Column } from "@ant-design/plots";
import { Card, Col, Flex, Row, Select, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { getStats } from "../../apis/BillingApi";
import Billing from "../../constants/interfaces/Billing";
import Formatter from "../../utils/Formatter";
import { getCurrentYear } from "../../utils/DateUtils";

const BillingStats = () => {
  const currentYear = getCurrentYear();
  const [statsData, setStatsData] = useState<Array<Billing>>([]);

  const getStatsData = async (year: string) => {
    const res = await getStats(year);
    if (res) {
      setStatsData(res.data as Array<Billing>);
    } else {
      setStatsData([]);
    }
  };

  const handleChangeYear = (value: string) => {
    getStatsData(value);
  };

  const config = {
    data: statsData,
    xField: "useYmd",
    yField: "useAmt",
    axis: {
      x: {
        labelFormatter: (value: string) => value + "월",
      },
      y: {
        labelFormatter: (value: string | number) => Formatter.addComma(value),
      },
    },
  };

  const columns: TableColumnsType<Billing> = [
    {
      title: "년월",
      dataIndex: "useYmd",
      render: (value: string) => Formatter.formatDate(value),
    },
    {
      title: "금액",
      dataIndex: "useAmt",
      render: (value: number) => Formatter.addComma(value) + "원",
    },
  ];

  useEffect(() => {
    getStatsData(currentYear.toString());
  }, [currentYear]);

  return (
    <>
      <Flex>
        <Select
          onChange={handleChangeYear}
          defaultValue={currentYear}
          options={[
            { value: "2023", label: "2023" },
            { value: "2024", label: "2024" },
            { value: "2025", label: "2025" },
            { value: "2026", label: "2026" },
            { value: "2027", label: "2027" },
            { value: "2028", label: "2028" },
          ]}
        />
      </Flex>
      <Row gutter={[16, 16]}>
        <Col span="13">
          <Card title="Statistics">
            {Array.isArray(statsData) && statsData.length > 0 ? (
              <Column {...config} />
            ) : (
              <p>No Data Available</p>
            )}
          </Card>
        </Col>
        <Col span="11">
          <Card title="List">
            <Table<Billing>
              rowKey={"sn"}
              columns={columns}
              dataSource={statsData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BillingStats;
