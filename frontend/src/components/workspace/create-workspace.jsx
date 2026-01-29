import colors from '@/lib/workspace-colors'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { workspaceSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'
import { useCreateWorkspace } from '@/hooks/use-workspace'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CreateWorkspace = ({ isCreatingWorkspace, setIsCreatingWorkspace }) => {
  // const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: '',
      description: '',
      color: colors[0],
    },
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (isCreatingWorkspace) {
      form.reset({
        name: '',
        description: '',
        color: colors[0],
      });
    }
  }, [isCreatingWorkspace, form, colors]);

  const { createWorkspace } = useCreateWorkspace();
  const { loading, error } = useSelector((state) => state.workspace);
  
  const onSubmit = async (data) => {
    try {
      console.log('Creating workspace with data:', data);
      
      const result = await createWorkspace(data);
      
      // Check if the action was fulfilled
      if (result && result.meta && result.meta.requestStatus === 'fulfilled') {
        toast.success('Workspace created successfully!');
        form.reset();
        setIsCreatingWorkspace(false);
      } else if (result && result.meta && result.meta.requestStatus === 'rejected') {
        // Handle specific error cases
        const errorMessage = result.payload || 'Failed to create workspace';
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Workspace creation error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <Dialog open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace} modal={true}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Workspace Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Workspace Description" {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 flex-wrap">
                      {colors.map((color) => (
                        <div
                          key={color}
                          onClick={() => field.onChange(color)}
                          className={cn('h-6 w-6 rounded-full cursor-pointer', field.value === color && 'border-2 border-blue-500')}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Workspace'}
            </Button>

          </form>
        </Form>
      </DialogContent>

    </Dialog>
  )
}

export default CreateWorkspace