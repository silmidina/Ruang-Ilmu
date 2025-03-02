import ComboBox from '@/Components/ComboBox';
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowDownCircle, IconArrowLeft } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Edit(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        user: props.page_data.loan.user.name ?? null,
        book: props.page_data.loan.book.title ?? null,
        loan_date: props.page_data.date.loan_date,
        due_date: props.page_data.date.due_date,
        _method: props.page_settings.method,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    const onHandleReset = () => {
        reset();
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconArrowDownCircle}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.loans.index')}>
                        <IconArrowLeft className="size-4" />
                        Back
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="5 grid w-full items-center gap-1">
                            <Label htmlFor="user">Nama</Label>
                            <ComboBox
                                items={props.page_data.users}
                                selectedItem={data.user}
                                onSelect={(currentValue) => setData('user', currentValue)}
                            />
                            {errors.user && <InputError message={errors.user} />}
                        </div>
                        <div className="5 grid w-full items-center gap-1">
                            <Label htmlFor="book">Buku</Label>
                            <ComboBox
                                items={props.page_data.books}
                                selectedItem={data.book}
                                onSelect={(currentValue) => setData('book', currentValue)}
                            />
                            {errors.book && <InputError message={errors.book} />}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="orange" size="lg" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
