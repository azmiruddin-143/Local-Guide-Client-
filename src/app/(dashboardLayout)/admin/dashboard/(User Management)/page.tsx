import UsersManagementHeader from "@/components/modules/Admin/AllUserManagement/UsersManagementHeader";
import UserFilters from "@/components/modules/Admin/AllUserManagement/UserFilters";
import UsersTable from "@/components/modules/Admin/AllUserManagement/UsersTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/admin/userManagement";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
const AdminUsersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const usersResult = await getAllUsers(queryString);
  
  const totalPages = Math.ceil(
    (usersResult?.meta?.total || 1) / (usersResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <UsersManagementHeader />
      <UserFilters />
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <UsersTable users={usersResult.data || []} />
        <TablePagination
          currentPage={usersResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminUsersManagementPage;