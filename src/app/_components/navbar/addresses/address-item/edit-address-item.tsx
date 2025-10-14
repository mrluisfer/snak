import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { EditIcon } from 'lucide-react';

export const EditAddressItem = ({
    setIsEditing,
}: {
    setIsEditing: (isEditing: boolean) => void;
}) => {
    return (
        <DropdownMenuItem variant="default" onClick={() => setIsEditing(true)}>
            <EditIcon className="mr-2 size-4" />
            Edit Address
        </DropdownMenuItem>
    );
};
