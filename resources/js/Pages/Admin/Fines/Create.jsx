import GetFineStatusBadge from "@/Components/GetFineStatusBadge"
import HeaderTitle from "@/Components/HeaderTitle"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/Components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Textarea } from "@/Components/ui/textarea"
import { UseFilter } from "@/hooks/UseFilter"
import AppLayout from "@/Layouts/AppLayout"
import { flashMessage, formatToRupiah } from "@/lib/utils"
import { Link, router } from "@inertiajs/react"
import { IconArrowsDownUp, IconCategory, IconMoneybag, IconPencil, IconPlus, IconRefresh, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Index(props) {
  return (
    <div className="flex flex-col w-full pb-32">
      <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle
          title={props.page_settings.title}
          subtitle={props.page_settings.subtitle}
          icon={IconMoneybag}
        />  
      </div>

      <Card> 
        <CardContent className="p-6 space-y-20">
          <div>
            <div className="px-4 py-6 rounded-lg">
              <dl className="flex flex-col text-sm leading-relaxed gap-x-12 gap-y-4 text-foreground lg:flex-row">
                <div className="flex flex-col">
                  <dt className="font-semibold">Kode Peminjaman</dt>
                  <dd>{props.return_book.loan.loan_code}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-semibold">Kode Pengembalian</dt>
                  <dd>{props.return_book.return_book_code}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-semibold">Tanggal Peminjaman</dt>
                  <dd>{props.return_book.loan.loan_date}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-semibold">Batas Pengembalian</dt>
                  <dd>{props.return_book.loan.due_date}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-semibold">Tanggal Pengembalian</dt>
                  <dd>{props.return_book.return_date}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-semibold">Total Denda</dt>
                  <dd>{formatToRupiah(props.return_book.fine.total_fee)}</dd>
                </div>
              </dl>
            </div>
          </div>
          <Table className="w-full mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Buku</TableHead>
                <TableHead>Denda Keterlambatan</TableHead>
                <TableHead>Denda Lain-lain</TableHead>
                <TableHead>Total Denda</TableHead>
                <TableHead>Status Pembayaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{props.return_book.user.name}</TableCell>
                <TableCell>{props.return_book.user.title}</TableCell>
                <TableCell>
                  {formatToRupiah(props.return_book.fine.late_fee)}
                  <span className="text-red-500">({props.return_book_dayslate})</span>
                </TableCell>
                <TableCell>
                  {formatToRupiah(props.return_book.fine.other_fee)}
                  <span className="text-red-500">({props.return_book.return_book_check.condition})</span>
                </TableCell>
                <TableCell>{formatToRupiah(props.return_book.fine.total_fee)}</TableCell>
                <TableCell>
                  <GetFineStatusBadge status={props.return_book.fine.payment_status}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-6 grid w-full items-center gap-1.5">
            <Label>Catatan</Label>
            <Textarea
              className="resize-none"
              value={props.return_book.return_book_check.notes ?? '-'}
              disabled
            ></Textarea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title}/>