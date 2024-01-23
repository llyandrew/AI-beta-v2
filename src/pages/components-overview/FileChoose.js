import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';  
import 'primeicons/primeicons.css';

export default function FloatLabelDemo() {
    const [selectedYear, setSelectedYear] = useState(null);
    const [loading, setLoading] = useState(false);

    const years = [
        { name: '110年', code: 'year110' },
        { name: '111年', code: 'year111' },
        { name: '112年', code: 'year112' },
        { name: '113年', code: 'year113' },
        { name: '114年', code: 'year114' },
        { name: '115年', code: 'year115' }
    ];

    const [selectedOrg, setSelectedOrg] = useState(null);
    const org = [
        { name: '長照', code: 'longtermCare' },
        { name: '日照', code: 'dayCare' },
        { name: '居服', code: 'homeCare' }
    ];

    const [selectedArea, setSelectedArea] = useState(null);
    const area = [
        { name: '台北市', code: 'Taipei' },
        { name: '新北市', code: 'NewTaipei' },
        { name: '桃園市', code: 'Taoyuan' },
        { name: '基隆市', code: 'Keelung' },
        { name: '新竹市', code: 'Hsinchu_country' },
        { name: '新竹縣', code: 'Hsinchu_city' },
        { name: '苗栗縣', code: 'Miaoli' },
        { name: '台中市', code: 'Taichung' },
        { name: '彰化縣', code: 'Changhua' },
        { name: '南投縣', code: 'Nantou' },
        { name: '雲林縣', code: 'Yunlin' },
        { name: '嘉義縣', code: 'Chiayi' },
        { name: '台南市', code: 'Tainan' },
        { name: '高雄市', code: 'Kaohsiung' },
        { name: '屏東縣', code: 'Pingtung ' },
        { name: '宜蘭縣', code: 'Yilan' },
        { name: '花蓮縣', code: 'Hualien' },
        { name: '台東縣', code: 'Taitung' }
    ];

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="card flex justify-content-left">
            <span className="p-float-label">
                <Dropdown inputId="id-area" value={selectedArea} onChange={(e) => setSelectedArea(e.value)} options={area} optionLabel="name" className="w-full md:w-14rem" />
                <label htmlFor="id-area">選擇地區</label>
            </span>

            <div style={{ width: '20px' }}></div>

            <span className="p-float-label">
                <Dropdown inputId="id-org" value={selectedOrg} onChange={(e) => setSelectedOrg(e.value)} options={org} optionLabel="name" className="w-full md:w-14rem" />
                <label htmlFor="id-org">選擇機構類型</label>
            </span>

            <div style={{ width: '20px' }}></div>

            <span className="p-float-label">
                <Dropdown inputId="id-year" value={selectedYear} onChange={(e) => setSelectedYear(e.value)} options={years} optionLabel="name" className="w-full md:w-14rem" />
                <label htmlFor="id-year">選擇評鑑年度</label>
            </span>

            <div style={{ width: '40px' }}></div>
            
            <div className="card flex flex-wrap justify-content-center gap-3"> 
                <Button label="下載檔案" icon="pi pi-download"  style={{ backgroundColor: 'var(--blue-300)', color: 'var(--primary-color-text)'}} loading={loading} onClick={load} raised/>
            </div>

        </div>
    )
}
        