import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

export default function FloatLabelDemo() {
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="card flex justify-content-left">
      <div className="card flex flex-wrap justify-content-center gap-3">
        <div>
          <Button
            label="下載最近上傳檔案"
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
      </div>
    </div>
  );
}
