import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { groupBy } from 'lodash';
import { callApi } from 'utils/apiCaller';

export default function FloatLabelDemo() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [templatelist, setTemplatelist] = useState([]);

  const fetchTemplatelist = useCallback(async () => {
    try {
      const data = await callApi('/template/templatelist');
      if (data?.list) {
        setTemplatelist(data?.list);
      } else {
        throw new Error('GG');
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchTemplatelist();
  }, [fetchTemplatelist]);

  const years = useMemo(() => {
    const listGroupByYear = groupBy(templatelist, 'year');
    return Object.keys(listGroupByYear).map((v) => ({ name: `${v}年`, code: v }));
  }, [templatelist]);

  const [selectedOrg, setSelectedOrg] = useState(null);

  const org = useMemo(() => {
    const listGroupByOrg = groupBy(templatelist, 'orgType');
    return Object.keys(listGroupByOrg).map((v) => ({ name: `${v}`, code: v }));
  }, [templatelist]);

  const [selectedArea, setSelectedArea] = useState(null);
  const handleAreaChange = (e) => {
    setSelectedArea(e?.value);
    setSelectedOrg(null);
    setSelectedYear(null);
  };
  const area = useMemo(() => {
    const listGroupByDistrict = groupBy(templatelist, 'district');
    return Object.keys(listGroupByDistrict).map((v) => ({ name: `${v}`, code: v }));
  }, [templatelist]);

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const { text, template } = useMemo(() => {
    if (!selectedArea && !selectedOrg && !selectedYear) {
      return { text: '請選擇所需下載的範本', template: {} };
    }

    const filtedTemplateList = templatelist.filter(({ year, orgType, district }) => {
      if (selectedArea && selectedArea.code !== district) {
        return false;
      }
      if (selectedOrg && selectedOrg.code !== orgType) {
        return false;
      }
      if (selectedYear && +selectedYear.code !== +year) {
        return false;
      }
      return true;
    });
    if (filtedTemplateList.length < 1) {
      return { text: '此縣市尚未公告相關範本', template: {} };
    }
    return { text: `選擇的範本： ${filtedTemplateList[0].name}`, template: filtedTemplateList[0] };
  }, [selectedArea, selectedOrg, selectedYear, templatelist]);
  console.log(template);

  return (
    <div className="card">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', rowGap: '30px' }}>
        {/* <div className="flex flex-row"></div> 可以把三個按鈕包住 變成三個按鈕為一長排(因目前有影片在右側 故不使用) */}
        <div>
          <span className="p-float-label">
            <Dropdown
              inputId="id-area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e?.value)}
              options={area}
              optionLabel="name"
              className="w-full md:w-25rem"
            />
            <label htmlFor="id-area">選擇地區</label>
          </span>
        </div>

        <div>
          <span className="p-float-label">
            <Dropdown
              inputId="id-org"
              value={selectedOrg}
              onChange={handleAreaChange}
              options={org}
              optionLabel="name"
              className="w-full md:w-25rem"
            />
            <label htmlFor="id-org">選擇機構類型</label>
          </span>
        </div>

        <div>
          <span className="p-float-label">
            <Dropdown
              inputId="id-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e?.value)}
              options={years}
              optionLabel="name"
              className="w-full md:w-25rem"
            />
            <label htmlFor="id-year">選擇評鑑年度</label>
          </span>
        </div>

        <div className="flex flex-row">
          <div>
            <Button
              label="下載該檔案範本"
              icon="pi pi-download"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#00B4BC',
                color: '#00B4BC',
                borderRadius: '999px',
                boxShadow: 'none'
              }}
              loading={loading}
              onClick={load}
              raised
            />
          </div>

          <div style={{ width: '20px' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="selected-values" style={{ fontSize: '16px', textAlign: 'center' }}>
              {text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
