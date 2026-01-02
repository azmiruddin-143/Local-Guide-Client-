"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteUser, verifyUser } from "@/services/admin/userManagement";
import { IUser } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { usersColumns } from "./usersColumns";
import UserViewDetailDialog from "./UserViewDetailDialog";
import UserEditDialog from "./UserEditDialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface UsersTableProps {
  users: IUser[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [verifyingUserId, setVerifyingUserId] = useState<string | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: IUser) => {
    setViewingUser(user);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
  };

  const handleDelete = (user: IUser) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser?._id) return;

    setIsDeleting(true);
    const result = await deleteUser(deletingUser._id.toString());
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  const handleVerify = async (user: IUser) => {
    if (!user._id || user.isVerified) return;

    setVerifyingUserId(user._id.toString());
    const result = await verifyUser(user._id.toString());
    setVerifyingUserId(null);

    if (result.success) {
      toast.success(result.message || "User verified successfully");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to verify user");
    }
  };

  // Enhanced columns with verify action
  const enhancedColumns = [
    ...usersColumns,
    {
      header:  "Verify Action",
      accessor: (user: IUser) => {
        if (!user.isVerified) {
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleVerify(user)}
              disabled={verifyingUserId === user._id?.toString()}
            >
              <CheckCircle className="mr-1 h-3 w-3" />
              Verify
            </Button>
          );
        } else {
          return (
            <span>Verified</span>
          );
         
        }
        return null;
      },
    },
  ];

  return (
    <>
      <ManagementTable
        data={users}
        columns={enhancedColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(user) => user._id?.toString() || ""}
        emptyMessage="No users found"
      />

      {/* Edit User Dialog */}
      <UserEditDialog
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        user={editingUser}
        onSuccess={() => {
          setEditingUser(null);
          handleRefresh();
        }}
      />

      {/* View User Detail Dialog */}
      <UserViewDetailDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UsersTable;
