import { FileBarChart } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

const Reports = () => {
  return (
    <div className="w-full min-h-screen bg-page flex flex-col font-ui text-primary">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Reports' }]} />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-[600px] mx-auto -mt-16">
        <FileBarChart className="w-12 h-12 text-muted mb-4" />
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Reports</h1>
        <p className="text-[14px] text-secondary">Coming soon — this page is under construction.</p>
      </div>
    </div>
  );
};

export default Reports;
