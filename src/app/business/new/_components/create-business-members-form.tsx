import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Flag, PlusIcon, Trash2, UserPlusIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

const businessMembersFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.email('Invalid email address'),
    role: z.string().min(1, 'Please select a role')
});

type ControlledBusinessMember = z.infer<typeof businessMembersFormSchema> & { id: string };

export function CreateBusinessMembersForm() {
    const [members, setMembers] = useState<Array<ControlledBusinessMember>>([]);

    const form = useForm({
        resolver: zodResolver(businessMembersFormSchema),
        defaultValues: {
            name: '',
            email: '',
            role: ''
        }
    });

    const handleAddMember = (data: {
        name: string;
        email: string;
        role: string;
    }) => {
        setMembers([...members, { ...data, id: crypto.randomUUID() }]);
        form.reset();
    };

    const handleRemoveMember = ({ id }: Pick<ControlledBusinessMember, 'id'>) => {
        setMembers(members.filter(member => member.id !== id));
    };

    const handleSubmitBusinessMembers = () => {
        console.log({ members });
    };

    return (
        <div className="space-y-4">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Add all your members</CardTitle>
                    <CardDescription>
                        Add all the members that can handle your business.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="default">
                        <Flag className="text-primary stroke-primary" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            Don&#39;t worry if you don&#39;t have all the
                            details right now.
                            <br />
                            You can always update
                            them later.
                        </AlertDescription>
                    </Alert>

                    <Form {...form}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
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
                                                <Input placeholder="john@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                           <div className={'grid grid-cols-2 gap-4'}>
                               <FormField
                                   control={form.control}
                                   name="role"
                                   render={({ field }) => (
                                       <FormItem>
                                           <FormLabel>Role</FormLabel>
                                           <Select onValueChange={field.onChange} value={field.value}>
                                               <FormControl>
                                                   <SelectTrigger className={'w-full'}>
                                                       <SelectValue placeholder="Select a role" />
                                                   </SelectTrigger>
                                               </FormControl>
                                               <SelectContent>
                                                   <SelectItem value="admin">Admin</SelectItem>
                                                   <SelectItem value="manager">Manager</SelectItem>
                                                   <SelectItem value="employee">Employee</SelectItem>
                                                   <SelectItem value="viewer">Viewer</SelectItem>
                                                   <SelectItem value="member">Member</SelectItem>
                                                   <SelectItem value="staff">Staff</SelectItem>
                                               </SelectContent>
                                           </Select>
                                           <FormMessage />
                                       </FormItem>
                                   )}
                               />
                           </div>

                            <Button
                                type="button"
                                className="w-full"
                                onClick={form.handleSubmit(handleAddMember)}
                                variant="outline"
                            >
                                <UserPlusIcon />
                                Add Member
                            </Button>
                        </div>
                    </Form>

                    {members.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm mb-2">Members List ({members.length})</h3>
                            <ScrollArea className="space-y-2 h-[200px] w-full">
                                {members.map((member) => (
                                    <div key={member.id}
                                         className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                                        <div className="space-y-1">
                                            <p className="font-medium text-sm">{member.name}</p>
                                            <p className="text-xs text-muted-foreground">{member.email}</p>
                                            <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveMember({ id: member.id })}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    )}

                    {members.length > 0 && (
                        <Button onClick={handleSubmitBusinessMembers} className="w-full" variant="secondary">
                            Submit All Members
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
