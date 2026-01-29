import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '../../lib/schema'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { signIn } from '@/features/authSlice'
import { useNavigate } from 'react-router-dom'
// import { getUserWorkspaces } from '@/features/workspaceSlice'
import { toast } from 'sonner'

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = async (data) => {
        const result = await dispatch(signIn(data))

        if (signIn.fulfilled.match(result)) {
            if (result.payload.length === 0) {
                toast.success('Welcome! Create your first workspace')
                navigate('/dashboard')
            } else {
                toast.success('Welcome back!')
                navigate('/dashboard')
            }
        }

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm shadow-xl">
                <CardHeader className="flex flex-col justify-center items-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">Sign in to your account to continue</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="email@example.com" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className='relative'>
                                            <FormControl>
                                                <Input {...field} type={!showPassword ? "password" : "text"} placeholder="••••••••" />
                                            </FormControl>
                                            <div onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ?

                                                    <EyeIcon className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                                                    : <EyeOffIcon className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />}
                                            </div>

                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">Sign In</Button>
                        </form>
                    </Form>

                    <CardFooter className="flex justify-center items-center">
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link to="/sign-up" className="text-sm text-muted-foreground hover:underline">Sign Up</Link>
                            </p>
                        </div>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn
