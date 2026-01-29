import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '../../lib/schema'
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '@/features/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async(data) => {

    console.log('Sign up data:', data);

    const result = await dispatch(signUp(data));

    if (signUp.fulfilled.match(result)) {
      toast.success('Account created successfully')
      navigate('/sign-in');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input {...field} type={!showConfirmPassword ? "password" : "text"} placeholder="••••••••" />
                      </FormControl>

                      <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ?
                          <EyeIcon className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                          : <EyeOffIcon className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />}
                      </div>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </Form>

          <CardFooter className="flex justify-center items-center">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-sm text-muted-foreground hover:underline">Sign In</Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
