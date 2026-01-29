import { projectSchema } from '@/lib/schema'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from '../ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Checkbox } from '../ui/checkbox';

const CreateProjectDialog = ({ isOpen, onOpenChange, workspaceMembers = [] }) => {

    const form = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'Planning',
            startDate: '',
            dueDate: '',
            members: [],
            tags: undefined
        }
    });

    const onSubmit = async () => {

    
    };
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[540px]">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to get started.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter project title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={3} placeholder="Enter project description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Project status" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {
                                                Object.values(['Planning', 'In Progress', 'Completed']).map((status) => (
                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="startDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Popover modal={true}>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={"w-full justify-start text-left font-normal" +
                                                    (field.value ? "text-muted-foreground" : "")
                                                }>
                                                    <CalendarIcon className="size-4 mr-2" />
                                                    {
                                                        field.value ? (
                                                            format(field.value, 'PPPP')
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )
                                                    }
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="dueDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <FormControl>
                                        <Popover modal={true}>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={"w-full justify-start text-left font-normal" +
                                                    (field.value ? "text-muted-foreground" : "")
                                                }>
                                                    <CalendarIcon className="size-4 mr-2" />
                                                    {
                                                        field.value ? (
                                                            format(field.value, 'PPPP')
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )
                                                    }
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="tags" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tags separated by comma" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="members" render={({ field }) => {
                            const selectedMembers = field.value || [];

                            return (
                                <FormItem>
                                    <FormLabel>Members</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className="w-full justify-start text-left font-normal min-h-11">
                                                    {!workspaceMembers || workspaceMembers.length === 0 ?
                                                        <span>No members available</span> : 
                                                        (selectedMembers.length === 0 ?
                                                            <span>Select Members</span> : (
                                                                selectedMembers.length <= 2 ? (
                                                                    selectedMembers.map(m => {
                                                                        const member = workspaceMembers.find(wm => wm.user._id === m.user);
                                                                        return `${member?.user?.name || 'Unknown'} ${member?.role || ''}`;
                                                                    })
                                                                ) : (
                                                                    <span>{selectedMembers.length} members selected</span>
                                                                )
                                                            ))}
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className={"w-full max-w-60 overflow-y-auto"}
                                                align="start">
                                                <div className="flex flex-col gap-2">
                                                    {
                                                        workspaceMembers && workspaceMembers.length > 0 ? workspaceMembers.map((member) => {
                                                            const selectedMember = selectedMembers.find(
                                                                m => m.user === member.user._id
                                                            );
                                                            return (
                                                                <div key={member.user._id} className="flex items-center gap-2 p-2 border rounded">
                                                                    <Checkbox
                                                                        checked={!!selectedMember}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                field.onChange([...selectedMembers, { user: member.user._id, role: "contributor" }]);
                                                                            } else {
                                                                                field.onChange(selectedMembers.filter(m => m.user !== member.user._id));
                                                                            }
                                                                        }}
                                                                        id={`member-${member.user._id}`}
                                                                    />
                                                                    <span className="truncate flex-1">{member.user.name}</span>

                                                                    {
                                                                        selectedMember && (
                                                                            <Select value={selectedMember.role}
                                                                                onValueChange={(role) => {
                                                                                    field.onChange(
                                                                                        selectedMembers.map(m => {
                                                                                            if (m.user === member.user._id) {
                                                                                                return { user: m.user, role };
                                                                                            }
                                                                                            return m;
                                                                                        })
                                                                                    );
                                                                                }}>

                                                                                    <SelectTrigger className="w-full">
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>

                                                                                    <SelectContent className="w-full">
                                                                                        <SelectItem value="manager">Manager</SelectItem>
                                                                                        <SelectItem value="contributor">Contributor</SelectItem>
                                                                                        <SelectItem value="viewer">Viewer</SelectItem>
                                                                                    </SelectContent>

                                                                            </Select>
                                                                        )
                                                                    }
                                                                </div>
                                                            );
                                                        }) : <div className="text-sm text-gray-500">No members found</div>
                                                    }
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }} />
                    </form>

                    <DialogFooter>
                        <Button type="submit">Create Project</Button>
                    </DialogFooter>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default CreateProjectDialog