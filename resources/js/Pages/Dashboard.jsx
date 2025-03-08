import CardStat from '@/Components/CardStat';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconArrowDownCircle, IconArrowUpCircle, IconArrowUpRight, IconBook, IconBooks, IconDashboard, IconMoneybag, IconUsersGroup } from '@tabler/icons-react';

export default function Dashboard(props) {
    const auth = props.auth.user;
    return (
        <div className="flex flex-col w-full pb-32 space-y-4">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconDashboard}
                />
            </div>

            {/* Dashboard Admin & Operator */}
            {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <CardStat
                    data={{ 
                        title: 'Total Buku',
                        icon: IconBooks,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                        iconClassName:  'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.total_books}</div>
                </CardStat>
                <CardStat
                    data={{ 
                        title: 'Total Pengguna',
                        icon: IconUsersGroup,
                        background: 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500',
                        iconClassName:  'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.total_users}</div>
                </CardStat>
                <CardStat
                    data={{ 
                        title: 'Peminjaman',
                        icon: IconArrowDownCircle,
                        background: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500',
                        iconClassName:  'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
                </CardStat>
                <CardStat
                    data={{ 
                        title: 'Pengembalian',
                        icon: IconArrowUpCircle,
                        background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                        iconClassName:  'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
                </CardStat>
            </div>
            )}

            {/* Dashboard Member */}
            {auth.role.some((role) => ['member'].includes(role)) && (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <CardStat
                    data={{ 
                        title: 'Total Peminjaman',
                        icon: IconArrowDownCircle,
                        background: 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500',
                        iconClassName:  'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
                </CardStat>
                <CardStat
                    data={{ 
                        title: 'Total Pengembalian',
                        icon: IconArrowUpCircle,
                        background: 'text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-500',
                        iconClassName:  'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
                </CardStat>
                <CardStat
                    data={{ 
                        title: 'Denda',
                        icon: IconMoneybag,
                        background: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500',
                        iconClassName:  'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.page_data.total_fines)}</div>
                </CardStat>
            </div>
            )}
            <div className="flex flex-col justify-between w-full gap-2 lg:flex-row">
                <Card className="w-full lg:w-1/2">
                <CardHeader>
                    <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                        <div className="flex flex-col gap-y-2">
                            <CardTitle>Transaksi Peminjaman</CardTitle>
                            <CardDescription>Anda dapat melihat 5 transaksi terakhir peminjaman</CardDescription>
                        </div>
                        <Button variant="orange" asChild>
                            {auth.role.some((role) => ['admin', 'operator'].includes(role)) ? (
                                <Link href={route('admin.loans.index')}>
                                    Lihat Semua
                                    <IconArrowUpRight className='size-4'/>
                                </Link>
                            ): (
                                <Link href='#'>
                                    Lihat Semua
                                    <IconArrowUpRight className='size-4'/>
                                </Link>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                    <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Kode Peminjaman</TableHead>
                                    <TableHead>Buku</TableHead>
                                    <TableHead>Member</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.loans.map((loan, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{loan.loan_code}</TableCell>
                                    <TableCell>{loan.book.title}</TableCell>
                                    <TableCell>{loan.user.name}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </CardContent>
                </Card>

                <Card className="w-full lg:w-1/2">
                <CardHeader>
                    <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                        <div className="flex flex-col gap-y-2">
                            <CardTitle>Transaksi Pengembalian</CardTitle>
                            <CardDescription>Anda dapat melihat 5 transaksi terakhir pengembalian</CardDescription>
                        </div>
                        <Button variant="orange" asChild>
                            {auth.role.some((role) => ['admin', 'operator'].includes(role)) ? (
                                <Link href={route('admin.return-books.index')}>
                                    Lihat Semua
                                    <IconArrowUpRight className='size-4'/>
                                </Link>
                            ): (
                                <Link href='#'>
                                    Lihat Semua
                                    <IconArrowUpRight className='size-4'/>
                                </Link>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                    <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Kode Pengembalian</TableHead>
                                    <TableHead>Buku</TableHead>
                                    <TableHead>Member</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.return_books.map((return_book, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{return_book.return_book_code}</TableCell>
                                    <TableCell>{return_book.book.title}</TableCell>
                                    <TableCell>{return_book.user.name}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </CardContent>
                </Card>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} title="Dashboard" />;
