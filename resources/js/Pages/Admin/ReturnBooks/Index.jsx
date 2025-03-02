import HeaderTitle from "@/Components/HeaderTitle"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/Components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { UseFilter } from "@/hooks/UseFilter"
import AppLayout from "@/Layouts/AppLayout"
import { flashMessage, formatToRupiah } from "@/lib/utils"
import { Link, router } from "@inertiajs/react"
import { IconArrowUpCircle, IconEye } from "@tabler/icons-react"
import { IconArrowsDownUp, IconCategory, IconPencil, IconPlus, IconRefresh, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Index(props) {
  const { data: return_books, meta } = props.return_books;
  const [params, setParams] = useState(props.state);

  const onSortable = (field) => {
    setParams({
      ...params,
      field: field,
      direction: params.direction == 'asc' ? 'desc': 'asc',
    })
  }

  UseFilter({
    route: route('admin.return-books.index'),
    values: params,
    only: ['return_books'],
  });

  return (
    <div className="flex flex-col w-full pb-32">
      <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle
          title={props.page_settings.title}
          subtitle={props.page_settings.subtitle}
          icon={IconArrowUpCircle}
        />    
      </div>

      <Card> 
        <CardHeader>
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
            <Input
              className="w-full sm:w-1/4"
              placeholder="Search..."
              value={params?.search}
              onChange={(e) => setParams((prev) => ({...prev, search: e.target.value}))}
            />
            <Select value={params?.load} onValueChange={(e) => setParams({...params, load:e})}>
              <SelectTrigger className="w-full sm:w-24">
                <SelectValue placeholder="Load"/>
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 75, 100].map((number, index) => (
                  <SelectItem key={index} value={number}>
                    {number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="red"
              onClick={() => setParams(props.state)}
              size="xl"
            >
              <IconRefresh className="size-4" />
              Bersihkan
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('id')}
                  >
                    #
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('return_book_code')}
                  >
                    Kode Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('loan_code')}
                  >
                    Kode Peminjaman
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('user_id')}
                  >
                    Nama
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('book_id')}
                  >
                    Buku
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('status')}
                  >
                    Status
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('loan_date')}
                  >
                    Tanggal Peminjaman
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('due_date')}
                  >
                    Batas Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('return_date')}
                  >
                    Tanggal Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>Denda</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>
                <Button
                    variant="ghost"
                    className="group inline-flex"
                    onClick={() => onSortable('created_at')}
                  >
                    Dibuat Pada
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowsDownUp className="size-4 text-muted-foreground"/>
                    </span>
                  </Button>
                </TableHead>
                <TableHead>Opsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {return_books.map((return_book, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                  <TableCell>{return_book.return_book_code}</TableCell>
                  <TableCell>{return_book.loan.loan_code}</TableCell>
                  <TableCell>{return_book.user.name}</TableCell>
                  <TableCell>{return_book.book.title}</TableCell>
                  <TableCell>{return_book.status}</TableCell>
                  <TableCell>{return_book.loan.loan_date}</TableCell>
                  <TableCell>{return_book.loan.due_date}</TableCell>
                  <TableCell>{return_book.return_date}</TableCell>
                  <TableCell className='text-red-500'>
                    {formatToRupiah(return_book.fine)}
                  </TableCell>
                  <TableCell>{return_book.return_book_check}</TableCell>
                  <TableCell>{return_book.created_at}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-1">
                      {return_book.fine && (
                        <Button variant="blue" size="sm" asChild>
                          <Link href={route('admin.fines.create', [return_book])}>
                            <IconEye className="size-4"/>
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
            <p className="mb-2 text-sm text-muted-foreground">
              Menampilkan <span className="font-medium text-orange-500">{meta.from ?? 0}</span> dari {meta.total} pengembalian
          </p>
          <div className="overflow-x-auto">
            {meta.has_pages && (
              <Pagination>
                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                  {meta.links.map((link, index) => (
                    <PaginationItem key={index} className="mx-1 mb-1 lg:mb-0">
                      <PaginationLink
                        href={link.url}
                        isActive={link.active}
                      >
                        {link.label}
                      </PaginationLink>
                    </PaginationItem>
                    ))}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title}/>