import CardStat from '@/Components/CardStat';
import HeaderTitle from '@/Components/HeaderTitle';
import AppLayout from '@/Layouts/AppLayout';
import { IconCalendar, IconChartDots2 } from '@tabler/icons-react';

export default function Index(props) {
  return (
    <div className="flex flex-col w-full pb-32 space-y-4">
      <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle
          title={props.page_settings.title}
          subtitle={props.page_settings.subtitle}
          icon={IconChartDots2}
        />
      </div>
      <h2 className='font-semibold leading-relaxed text-foreground'>Total Peminjaman</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
{/* Harian */}
        <CardStat
          data={{ 
            title: 'Harian',
            icon: IconCalendar,
            background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
            iconClassName: 'text-white'
          }}
        >
        <div className="text-2xl font-bold">0</div>
        </CardStat>
{/* Mingguan */}
        <CardStat
          data={{ 
            title: 'Mingguan',
            icon: IconCalendar,
            background: 'text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500',
            iconClassName: 'text-white'
          }}
        >
        <div className="text-2xl font-bold">0</div>
        </CardStat>
{/* Bulanan */}
        <CardStat
          data={{ 
            title: 'Bulanan',
            icon: IconCalendar,
            background: 'text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-500',
            iconClassName: 'text-white'
          }}
        >
        <div className="text-2xl font-bold">0</div>
        </CardStat>
{/* Tahunan */}
        <CardStat
          data={{ 
            title: 'Tahunan',
            icon: IconCalendar,
            background: 'text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-500',
            iconClassName: 'text-white'
          }}
        >
        <div className="text-2xl font-bold">0</div>
        </CardStat>
      </div>
    </div>
  )
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;