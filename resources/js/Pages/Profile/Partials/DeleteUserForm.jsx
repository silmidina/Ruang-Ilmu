import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>

                <CardDescription>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Button variant="red" onClick={confirmUserDeletion}>Hapus Akun</Button>

                <Modal show={confirmingUserDeletion} onClose={closeModal}>
                    <form onSubmit={deleteUser} className="p-6">
                        <h2 className="text-lg font-medium text-foreground">
                            Apakah anda yakin ingin menghapus akun anda?
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Setelah akun anda dihapus, semua resource dan datanya akan dihapus secara permanen. Sebelum menghapus akun anda, harap untuk unduh data atau informasi apapun yang ingin anda simpan.
                        </p>

                        <div className="mt-6">
                            <Label htmlFor="password" value="Password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <InputError message={errors.password} className="mt-2" />
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button variant="ghost" size="lg" onClick={closeModal}>Batal</Button>

                            <Button variant="red" size="lg" className="ms-3" disabled={processing}>
                                Delete Account
                            </Button>
                        </div>
                    </form>
                </Modal>
            </CardContent>
        </Card>
    );
}
